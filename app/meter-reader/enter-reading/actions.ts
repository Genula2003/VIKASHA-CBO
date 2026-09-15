'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateBill } from '@/lib/billing/engine'
import { generateBillPdf } from '@/lib/pdf/generate'
import { sendBillEmail } from '@/lib/email/resend'
import { sendDemoSms } from '@/lib/sms/demo'
import crypto from 'crypto'

export async function searchConsumer(accountNumber: string) {
  const supabase = await createClient()

  const { data: consumer, error } = await supabase
    .from('consumers')
    .select('*, meter_readings(reading_date, current_reading, status), bills(amount, status)')
    .eq('account_number', accountNumber)
    .single()

  if (error || !consumer) {
    return { error: 'Account not found' }
  }

  if (consumer.status !== 'ACTIVE') {
    return { error: 'Account is not active' }
  }

  // Get the latest valid reading
  const readings = consumer.meter_readings.filter((r: any) => r.status === 'VALID').sort((a: any, b: any) => new Date(b.reading_date).getTime() - new Date(a.reading_date).getTime())
  const lastReading = readings[0]

  if (!lastReading) {
    return { error: 'No baseline reading found for this account. Contact admin.' }
  }

  const bills = consumer.bills.sort((a: any, b: any) => b.amount - a.amount) // not true date sort, just getting last
  // A better way is to sort bills by created_at. We'll simplify here.

  return { 
    success: true, 
    consumer: {
      id: consumer.id,
      name: consumer.account_holder_name,
      accountNumber: consumer.account_number,
      email: consumer.email,
      mobile: consumer.mobile
    },
    lastReading: {
      date: lastReading.reading_date,
      value: lastReading.current_reading
    }
  }
}

export async function submitReading(formData: FormData) {
  const consumerId = formData.get('consumerId') as string
  const currentReading = parseInt(formData.get('currentReading') as string)
  const previousReading = parseInt(formData.get('previousReading') as string)
  const lastReadingDate = formData.get('lastReadingDate') as string

  if (currentReading < previousReading) {
    return { error: 'Current reading cannot be lower than previous reading.' }
  }

  const unitsConsumed = currentReading - previousReading

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  // 1. Get active billing rule
  const { data: activeRules, error: rulesError } = await supabase
    .from('billing_rules')
    .select('*, billing_rule_slabs(*)')
    .eq('status', 'ACTIVE')
    .order('effective_from', { ascending: false })

  if (rulesError || !activeRules || activeRules.length === 0) {
    return { error: 'No active billing rule found.' }
  }
  const activeRule = activeRules[0] // take the latest

  // 2. Insert Reading
  const todayDate = new Date().toISOString().split('T')[0]
  
  const { data: reading, error: readingError } = await supabase.from('meter_readings').insert({
    consumer_id: consumerId,
    reader_id: user.id,
    reading_date: todayDate,
    previous_reading: previousReading,
    current_reading: currentReading,
    units_consumed: unitsConsumed,
    status: 'VALID'
  }).select().single()

  if (readingError || !reading) {
    return { error: 'Failed to insert reading: ' + (readingError?.message || 'Unknown error') }
  }

  // 3. Calculate Bill
  const calculation = calculateBill(unitsConsumed, {
    id: activeRule.id,
    name: activeRule.name,
    slabs: activeRule.billing_rule_slabs
  })

  // 4. Create Bill
  const billNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 14) // 14 days default
  const token = crypto.randomBytes(16).toString('hex')

  const { data: bill, error: billError } = await supabase.from('bills').insert({
    bill_number: billNumber,
    consumer_id: consumerId,
    reading_id: reading.id,
    rule_id: activeRule.id,
    rule_snapshot: activeRule,
    billing_period_start: lastReadingDate,
    billing_period_end: todayDate,
    amount: calculation.totalAmount,
    due_date: dueDate.toISOString(),
    status: 'UNPAID',
    access_token: token
  }).select().single()

  if (billError || !bill) {
    return { error: 'Failed to generate bill: ' + (billError?.message || '') }
  }

  // 5. Insert calculation items
  const itemsToInsert = calculation.items.map(item => ({
    bill_id: bill.id,
    ...item
  }))
  await supabase.from('bill_calculation_items').insert(itemsToInsert)

  // 6. Generate PDF
  const { data: consumer } = await supabase.from('consumers').select('*').eq('id', consumerId).single()
  
  const pdfBuffer = await generateBillPdf({
    billNumber: billNumber,
    accountNumber: consumer.account_number,
    consumerName: consumer.account_holder_name,
    billingPeriod: `${lastReadingDate} to ${todayDate}`,
    previousReading: previousReading,
    currentReading: currentReading,
    unitsConsumed: unitsConsumed,
    items: calculation.items,
    totalAmount: calculation.totalAmount,
    dueDate: dueDate.toISOString().split('T')[0],
    status: 'UNPAID',
    companyName: 'Water Board System'
  })

  // Upload PDF to Supabase Storage
  const pdfFileName = `${billNumber}.pdf`
  const { error: storageError } = await supabase.storage
    .from('bills')
    .upload(pdfFileName, pdfBuffer, {
      contentType: 'application/pdf'
    })

  if (storageError) {
    console.error('Failed to upload PDF:', storageError)
    // We can continue, just PDF url won't be set
  } else {
    // Update bill with pdf url
    const { data: publicUrl } = supabase.storage.from('bills').getPublicUrl(pdfFileName)
    await supabase.from('bills').update({ pdf_url: publicUrl.publicUrl }).eq('id', bill.id)
  }

  // 7. Notifications
  const secureBillLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/bill/${token}`
  
  if (consumer.email) {
    const emailResult = await sendBillEmail({
      email: consumer.email,
      consumerName: consumer.account_holder_name,
      accountNumber: consumer.account_number,
      billingPeriod: `${lastReadingDate} to ${todayDate}`,
      unitsConsumed: unitsConsumed,
      totalPayable: calculation.totalAmount,
      dueDate: dueDate.toISOString().split('T')[0],
      secureBillLink: secureBillLink,
      pdfBuffer: pdfBuffer,
      billNumber: billNumber
    })

    await supabase.from('notifications').insert({
      consumer_id: consumer.id,
      bill_id: bill.id,
      channel: 'EMAIL',
      type: 'BILL',
      recipient: consumer.email,
      status: emailResult.success ? 'SENT' : 'FAILED',
      provider_message_id: emailResult.messageId,
      error_message: emailResult.error
    })
  } else {
    await supabase.from('notifications').insert({
      consumer_id: consumer.id,
      bill_id: bill.id,
      channel: 'EMAIL',
      type: 'BILL',
      status: 'SKIPPED',
      error_message: 'No email address'
    })
  }

  if (consumer.mobile) {
    const smsResult = await sendDemoSms({
      mobile: consumer.mobile,
      message: `Your bill for ${consumer.account_number} is LKR ${calculation.totalAmount}. View: ${secureBillLink}`
    })

    await supabase.from('notifications').insert({
      consumer_id: consumer.id,
      bill_id: bill.id,
      channel: 'SMS',
      type: 'BILL',
      recipient: consumer.mobile,
      status: 'DEMO_SENT',
      provider_message_id: smsResult.messageId
    })
  } else {
    await supabase.from('notifications').insert({
      consumer_id: consumer.id,
      bill_id: bill.id,
      channel: 'SMS',
      type: 'BILL',
      status: 'SKIPPED',
      error_message: 'No mobile number'
    })
  }

  return { 
    success: true, 
    bill: {
      number: billNumber,
      units: unitsConsumed,
      amount: calculation.totalAmount,
      token: token
    }
  }
}
