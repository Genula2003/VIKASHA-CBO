'use server'

import { 
  updateArrearsStatusAction, 
  sendRedNoticeSmsAction, 
  batchSendRedNoticeSmsAction,
  type ActionStatus 
} from '@/lib/services/arrears-service'

export async function updateAccountActionStatus(
  accountNumber: string, 
  status: ActionStatus, 
  notes?: string,
  scheduledDate?: string
) {
  return updateArrearsStatusAction(accountNumber, status, notes, scheduledDate)
}

export async function dispatchRedNoticeSms(accountNumber: string, amount: number) {
  return sendRedNoticeSmsAction(accountNumber, amount)
}

export async function batchDispatchRedNotices(accounts: Array<{ accountNumber: string; amount: number }>) {
  return batchSendRedNoticeSmsAction(accounts)
}
