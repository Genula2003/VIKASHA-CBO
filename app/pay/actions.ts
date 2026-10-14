'use server'

import { headers } from 'next/headers'
import { lookupAccountSecure, getBillByAccessToken } from '@/lib/services/consumer-lookup'
import { processPaymentSettlement, revalidateAllSystemPaths } from '@/lib/services/system-store'
import { sendPaymentReceipt } from '@/lib/email/resend'

/**
 * High-speed, rate-limited, and sanitized consumer account lookup.
 * Returns account name, address, and current bill information.
 */
export async function lookupConsumerBill(query: string) {
  let clientIp = '127.0.0.1'
  try {
    const headerList = await headers()
    clientIp = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               headerList.get('x-real-ip') || 
               '127.0.0.1'
  } catch {}

  const result = await lookupAccountSecure(query, clientIp)

  if (!result.success) {
    return { error: result.error || 'Account not found.' }
  }

  return {
    success: true,
    consumer: result.consumer,
    bill: result.bill,
    lastReading: result.lastReading
  }
}

/**
 * Quick inline payment processing for the verified consumer.
 * Immediately settles the bill, logs the payment, and triggers system-wide revalidation.
 */
export async function payConsumerBillDirect(token: string, paymentMethod: string = 'Online Card') {
  if (!token || typeof token !== 'string') {
    return { error: 'Invalid payment token.' }
  }

  // Settle in synchronized system store
  const res = await processPaymentSettlement(token, paymentMethod)

  if (!res.success || !res.payment) {
    return { error: res.error || 'Payment processing could not be completed.' }
  }

  // Universal system-wide automatic revalidation
  revalidateAllSystemPaths([
    `/bill/${token}`,
    `/pay/${token}`
  ])

  return {
    success: true,
    receipt: {
      transactionId: res.payment.transaction_id,
      billNumber: res.payment.bill_number,
      accountNumber: res.payment.account_number,
      accountHolderName: res.payment.account_holder_name,
      amount: res.payment.amount,
      paymentMethod: res.payment.method,
      paidAt: res.payment.paid_at,
      status: 'PAID'
    }
  }
}
