'use server'

import { createClient } from '@/lib/supabase/server'
import { sendBillEmail } from '@/lib/email/resend'
import { sendDemoSms } from '@/lib/sms/demo'
import { revalidatePath } from 'next/cache'

export async function resendBillEmail(billId: string) {
  const supabase = await createClient()

  const { data: bill, error } = await supabase
    .from('bills')
    .select('*, consumers(*)')
    .eq('id', billId)
    .single()

  if (error || !bill || !bill.consumers.email) {
    return { error: 'Failed to retrieve bill or email is missing.' }
  }

  // We should ideally pass the PDF buffer again, or a link to it. Since we already uploaded it to Supabase storage,
  // we could download it to a buffer, but for this demo, since Resend accepts content, we will download it.
  let pdfBuffer: Buffer
  try {
    const fileName = `${bill.bill_number}.pdf`
    const { data: fileData, error: downloadError } = await supabase.storage.from('bills').download(fileName)
    if (downloadError || !fileData) {
      return { error: 'Failed to retrieve PDF from storage' }
    }
    pdfBuffer = Buffer.from(await fileData.arrayBuffer())
  } catch (err) {
    return { error: 'Failed to read PDF' }
  }

  const secureBillLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/bill/${bill.access_token}`

  const emailResult = await sendBillEmail({
    email: bill.consumers.email,
    consumerName: bill.consumers.account_holder_name,
    accountNumber: bill.consumers.account_number,
    billingPeriod: `${new Date(bill.billing_period_start).toLocaleDateString()} to ${new Date(bill.billing_period_end).toLocaleDateString()}`,
    unitsConsumed: bill.rule_snapshot ? bill.amount : 0, // Simplified
    totalPayable: bill.amount,
    dueDate: new Date(bill.due_date).toLocaleDateString(),
    secureBillLink: secureBillLink,
    pdfBuffer: pdfBuffer,
    billNumber: bill.bill_number
  })

  await supabase.from('notifications').insert({
    consumer_id: bill.consumers.id,
    bill_id: bill.id,
    channel: 'EMAIL',
    type: 'BILL',
    recipient: bill.consumers.email,
    status: emailResult.success ? 'SENT' : 'FAILED',
    provider_message_id: emailResult.messageId,
    error_message: emailResult.error
  })

  revalidatePath('/admin/bills')
  return { success: true }
}

export async function resendBillSms(billId: string) {
  const supabase = await createClient()

  const { data: bill, error } = await supabase
    .from('bills')
    .select('*, consumers(*)')
    .eq('id', billId)
    .single()

  if (error || !bill || !bill.consumers.mobile) {
    return { error: 'Failed to retrieve bill or mobile is missing.' }
  }

  const secureBillLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/bill/${bill.access_token}`

  const smsResult = await sendDemoSms({
    mobile: bill.consumers.mobile,
    message: `REMINDER: Your bill for ${bill.consumers.account_number} is LKR ${bill.amount}. View: ${secureBillLink}`
  })

  await supabase.from('notifications').insert({
    consumer_id: bill.consumers.id,
    bill_id: bill.id,
    channel: 'SMS',
    type: 'BILL',
    recipient: bill.consumers.mobile,
    status: 'DEMO_SENT',
    provider_message_id: smsResult.messageId
  })

  revalidatePath('/admin/bills')
  return { success: true }
}
