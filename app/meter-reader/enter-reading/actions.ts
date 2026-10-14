'use server'

import { createClient } from '@/lib/supabase/server'
import { 
  getConsumerRecord, 
  recordReadingAndBill, 
  getDeterministicUuid,
  revalidateAllSystemPaths
} from '@/lib/services/system-store'
import { generateBillPdf } from '@/lib/pdf/generate'
import { sendBillEmail } from '@/lib/email/resend'
import { sendDemoSms } from '@/lib/sms/demo'

export async function searchConsumer(accountNumber: string) {
  if (!accountNumber || !accountNumber.trim()) {
    return { error: 'Please enter a valid account number.' }
  }

  const cleanAcc = accountNumber.trim()
  const consumer = getConsumerRecord(cleanAcc)

  if (!consumer) {
    return { error: `Account #${cleanAcc} not found in community records. Please check the account number.` }
  }

  if (consumer.status !== 'ACTIVE') {
    return { error: 'Water account is suspended or inactive. Please contact administration.' }
  }

  return {
    success: true,
    consumer: {
      id: consumer.id,
      name: consumer.account_holder_name,
      accountNumber: consumer.account_number,
      address: consumer.address,
      email: consumer.email,
      mobile: consumer.mobile
    },
    lastReading: {
      date: consumer.last_reading_date || '2026-04-30',
      value: consumer.last_reading_value || 0
    }
  }
}

export async function submitReading(formData: FormData) {
  const currentReading = parseInt(formData.get('currentReading') as string, 10)
  const previousReading = parseInt(formData.get('previousReading') as string, 10)
  const lastReadingDate = (formData.get('lastReadingDate') as string) || '2026-04-30'
  const accountNumRaw = (formData.get('accountNumber') as string) || ''
  const consumerNameRaw = (formData.get('consumerName') as string) || ''

  if (isNaN(currentReading)) {
    return { error: 'Please enter a valid numeric meter reading.' }
  }

  if (currentReading < previousReading) {
    return { error: `Current reading (${currentReading}) cannot be lower than previous reading (${previousReading}).` }
  }

  // Authentication check
  const userClient = await createClient()
  const { data: { user } } = await userClient.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized. Please sign in to record meter readings.' }
  }

  // Get consumer details from system store
  const consumer = getConsumerRecord(accountNumRaw)
  const cleanAcc = consumer?.account_number || accountNumRaw || '135'
  const consumerName = consumer?.account_holder_name || consumerNameRaw || 'Community Resident'
  const consumerAddress = consumer?.address || 'Magammana, Homagama'

  // Record reading and calculate official NWSDB bill in unified system store
  const { bill, reading } = await recordReadingAndBill({
    accountNumber: cleanAcc,
    consumerName,
    consumerAddress,
    previousReading,
    currentReading,
    lastReadingDate,
    readerId: user.id,
    readerName: user.user_metadata?.name || 'Field Officer'
  })

  // Universal real-time revalidation across all portals and views
  revalidateAllSystemPaths([
    `/bill/${bill.access_token}`,
    `/pay/${bill.access_token}`
  ])

  // Background notifications if contacts available
  if (consumer?.email) {
    try {
      const secureBillLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/bill/${bill.access_token}`
      await sendBillEmail({
        email: consumer.email,
        consumerName: consumer.account_holder_name,
        accountNumber: consumer.account_number,
        billingPeriod: `${lastReadingDate} to ${new Date().toISOString().split('T')[0]}`,
        unitsConsumed: bill.units_consumed,
        totalPayable: bill.amount,
        dueDate: bill.due_date.split('T')[0],
        secureBillLink,
        billNumber: bill.bill_number
      })
    } catch {}
  }

  if (consumer?.mobile) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      const secureBillLink = `${baseUrl}/bill/${bill.access_token}`
      await sendDemoSms({
        mobile: consumer.mobile,
        message: `Vikasha CBO: Bill for Acc #${consumer.account_number}. Units: ${bill.units_consumed}. Total: LKR ${bill.amount.toLocaleString()}. Pay: ${secureBillLink}`
      })
    } catch {}
  }

  return {
    success: true,
    bill: {
      number: bill.bill_number,
      units: bill.units_consumed,
      amount: bill.amount,
      token: bill.access_token,
      consumerName,
      accountNumber: cleanAcc
    }
  }
}
