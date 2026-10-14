'use server'

import { processPaymentSettlement, revalidateAllSystemPaths } from '@/lib/services/system-store'
import { getBillByAccessToken } from '@/lib/services/consumer-lookup'
import { sendPaymentReceipt } from '@/lib/email/resend'
import { sendDemoSms } from '@/lib/sms/demo'

export async function processDemoPayment(token: string, method: string) {
  // Settle in unified system store
  const res = await processPaymentSettlement(token, method || 'Online Card')

  if (!res.success || !res.payment) {
    return { error: res.error || 'Payment could not be processed.' }
  }

  const transactionId = res.payment.transaction_id
  const bill = res.bill

  // Universal real-time cache revalidation across entire platform
  revalidateAllSystemPaths([
    `/bill/${token}`,
    `/pay/${token}`
  ])

  // Notifications
  const consumerEmail = (bill as any)?.email
  const consumerMobile = (bill as any)?.mobile
  const consumerName = bill?.account_holder_name || 'Valued Resident'
  const accountNumber = bill?.account_number || ''
  const billNumber = bill?.bill_number || ''
  const amount = bill?.amount || 0

  if (consumerEmail) {
    try {
      await sendPaymentReceipt({
        email: consumerEmail,
        consumerName,
        accountNumber,
        billNumber,
        amount,
        transactionId
      })
    } catch {}
  }

  if (consumerMobile) {
    try {
      await sendDemoSms({
        mobile: consumerMobile,
        message: `Vikasha CBO: LKR ${amount.toLocaleString()} received for Acc #${accountNumber}. Txn: ${transactionId}. Thank you.`
      })
    } catch {}
  }

  return { success: true, transactionId }
}
