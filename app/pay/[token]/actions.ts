'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { sendPaymentReceipt } from '@/lib/email/resend'
import { sendDemoSms } from '@/lib/sms/demo'

export async function processDemoPayment(token: string, method: string) {
  const supabase = createAdminClient()

  // Find bill
  const { data: bill, error: billError } = await supabase
    .from('bills')
    .select('*, consumers(*)')
    .eq('access_token', token)
    .single()

  if (billError || !bill) {
    return { error: 'Bill not found' }
  }

  if (bill.status === 'PAID') {
    return { error: 'Bill is already paid' }
  }

  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const transactionId = `DEMO-TXN-${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

  // Insert payment
  const { error: paymentError } = await supabase.from('payments').insert({
    bill_id: bill.id,
    transaction_id: transactionId,
    amount: bill.amount,
    method: `Demo ${method}`,
    status: 'SUCCESS'
  })

  if (paymentError) {
    return { error: 'Payment processing failed: ' + paymentError.message }
  }

  // Mark bill as PAID
  await supabase.from('bills').update({ status: 'PAID' }).eq('id', bill.id)

  const consumer = bill.consumers

  // Log audit
  await supabase.from('audit_logs').insert({
    action: 'Payment completed',
    entity_type: 'bill',
    entity_id: bill.id,
    metadata: { transactionId, method, amount: bill.amount }
  })

  // Notifications
  if (consumer.email) {
    const emailResult = await sendPaymentReceipt({
      email: consumer.email,
      consumerName: consumer.account_holder_name,
      accountNumber: consumer.account_number,
      billNumber: bill.bill_number,
      amount: bill.amount,
      transactionId: transactionId
    })

    await supabase.from('notifications').insert({
      consumer_id: consumer.id,
      bill_id: bill.id,
      channel: 'EMAIL',
      type: 'RECEIPT',
      recipient: consumer.email,
      status: emailResult.success ? 'SENT' : 'FAILED',
      provider_message_id: emailResult.messageId,
      error_message: emailResult.error
    })
  }

  if (consumer.mobile) {
    const smsResult = await sendDemoSms({
      mobile: consumer.mobile,
      message: `Payment of LKR ${bill.amount} received for Bill ${bill.bill_number}. Txn: ${transactionId}`
    })

    await supabase.from('notifications').insert({
      consumer_id: consumer.id,
      bill_id: bill.id,
      channel: 'SMS',
      type: 'RECEIPT',
      recipient: consumer.mobile,
      status: 'DEMO_SENT',
      provider_message_id: smsResult.messageId
    })
  }

  return { success: true }
}
