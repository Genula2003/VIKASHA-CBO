import { 
  getAllConsumers, 
  getAllBills, 
  getDisconnectionRecords, 
  updateDisconnectionRecord,
  revalidateAllSystemPaths,
  type DisconnectionMetadata
} from './system-store'
import { sendDemoSms } from '@/lib/sms/demo'

export type AgingTier = 'CURRENT' | 'NOTICE_30' | 'RED_NOTICE_60' | 'DISCONNECTION_90'

export type ActionStatus = 
  | 'PENDING_REVIEW' 
  | 'FIRST_NOTICE_SENT' 
  | 'RED_NOTICE_ISSUED' 
  | 'DISCONNECTION_SCHEDULED' 
  | 'DISCONNECTED' 
  | 'PAYMENT_AGREEMENT'

export interface ArrearsBillItem {
  id: string
  bill_number: string
  billing_period: string
  amount: number
  due_date: string
  days_overdue: number
  access_token: string
}

export interface ArrearsAccountSummary {
  account_number: string
  consumer_id: string
  account_holder_name: string
  address: string
  area: string
  mobile: string | null
  email: string | null
  unpaid_bills_count: number
  total_arrears: number
  oldest_bill_date: string
  oldest_due_date: string
  days_overdue: number
  aging_tier: AgingTier
  aging_label: string
  action_status: ActionStatus
  committee_notes?: string
  notice_sent_at?: string
  scheduled_disconnection_date?: string
  bills: ArrearsBillItem[]
}

export interface ArrearsDashboardData {
  metrics: {
    totalArrearsAmount: number
    totalDelinquentAccounts: number
    notice30Count: number
    redNotice60Count: number
    disconnection90Count: number
    currentGraceCount: number
    totalRegisteredMeters: number
    collectionRecoveryRate: number
  }
  areaBreakdown: Array<{
    area: string
    accountsCount: number
    totalArrears: number
  }>
  accounts: ArrearsAccountSummary[]
}

export function computeArrearsData(): ArrearsDashboardData {
  const consumers = getAllConsumers()
  const bills = getAllBills()
  const disconnectionRecords = getDisconnectionRecords()
  
  // Use simulated current date for consistency
  const now = new Date()
  
  // Map of account -> unpaid bills
  const unpaidBillsByAcc: Record<string, typeof bills> = {}
  
  bills.forEach(bill => {
    if (bill.status === 'UNPAID') {
      const acc = bill.account_number.trim()
      if (!unpaidBillsByAcc[acc]) {
        unpaidBillsByAcc[acc] = []
      }
      unpaidBillsByAcc[acc].push(bill)
    }
  })

  const accounts: ArrearsAccountSummary[] = []
  let totalArrearsAmount = 0
  let notice30Count = 0
  let redNotice60Count = 0
  let disconnection90Count = 0
  let currentGraceCount = 0

  const areaMap: Record<string, { count: number; arrears: number }> = {}

  Object.entries(unpaidBillsByAcc).forEach(([acc, accBills]) => {
    const consumer = consumers.find(c => c.account_number === acc)
    const holderName = consumer?.account_holder_name || accBills[0]?.account_holder_name || 'Registered Resident'
    const address = consumer?.address || accBills[0]?.address || 'Magammana, Homagama'
    const area = consumer?.area || 'Magammana'
    const mobile = consumer?.mobile || null
    const email = consumer?.email || null
    const consumerId = consumer?.id || accBills[0]?.consumer_id || acc

    // Calculate total arrears
    const accTotal = accBills.reduce((sum, b) => sum + b.amount, 0)
    totalArrearsAmount += accTotal

    // Find oldest due date
    let oldestDueDate = accBills[0]?.due_date || now.toISOString().split('T')[0]
    let oldestBillDate = accBills[0]?.created_at || now.toISOString()

    accBills.forEach(b => {
      if (new Date(b.due_date).getTime() < new Date(oldestDueDate).getTime()) {
        oldestDueDate = b.due_date
      }
      if (new Date(b.created_at).getTime() < new Date(oldestBillDate).getTime()) {
        oldestBillDate = b.created_at
      }
    })

    const oldestDueTime = new Date(oldestDueDate).getTime()
    const daysOverdue = Math.max(0, Math.floor((now.getTime() - oldestDueTime) / (1000 * 60 * 60 * 24)))

    // Determine Aging Tier
    let agingTier: AgingTier = 'CURRENT'
    let agingLabel = 'Current / Grace Period'

    if (daysOverdue >= 90) {
      agingTier = 'DISCONNECTION_90'
      agingLabel = '90+ Days &bull; Disconnection Warrant'
      disconnection90Count++
    } else if (daysOverdue >= 60) {
      agingTier = 'RED_NOTICE_60'
      agingLabel = '60+ Days &bull; Official Red Notice'
      redNotice60Count++
    } else if (daysOverdue >= 30) {
      agingTier = 'NOTICE_30'
      agingLabel = '30+ Days &bull; 1st Overdue Notice'
      notice30Count++
    } else {
      agingTier = 'CURRENT'
      agingLabel = '0-29 Days &bull; Normal Grace'
      currentGraceCount++
    }

    // Committee Action Status
    const dRecord = disconnectionRecords[acc]
    const actionStatus: ActionStatus = dRecord?.action_status || (
      agingTier === 'DISCONNECTION_90' ? 'DISCONNECTION_SCHEDULED' :
      agingTier === 'RED_NOTICE_60' ? 'RED_NOTICE_ISSUED' :
      agingTier === 'NOTICE_30' ? 'FIRST_NOTICE_SENT' : 'PENDING_REVIEW'
    )

    // Form bill items list
    const billItems: ArrearsBillItem[] = accBills.map(b => ({
      id: b.id,
      bill_number: b.bill_number,
      billing_period: `${b.billing_period_start || ''} to ${b.billing_period_end || ''}`,
      amount: b.amount,
      due_date: b.due_date,
      days_overdue: Math.max(0, Math.floor((now.getTime() - new Date(b.due_date).getTime()) / (1000 * 60 * 60 * 24))),
      access_token: b.access_token
    })).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())

    // Accumulate area statistics
    if (!areaMap[area]) {
      areaMap[area] = { count: 0, arrears: 0 }
    }
    areaMap[area].count++
    areaMap[area].arrears += accTotal

    accounts.push({
      account_number: acc,
      consumer_id: consumerId,
      account_holder_name: holderName,
      address,
      area,
      mobile,
      email,
      unpaid_bills_count: accBills.length,
      total_arrears: accTotal,
      oldest_bill_date: oldestBillDate,
      oldest_due_date: oldestDueDate,
      days_overdue: daysOverdue,
      aging_tier: agingTier,
      aging_label: agingLabel,
      action_status: actionStatus,
      committee_notes: dRecord?.committee_notes,
      notice_sent_at: dRecord?.notice_sent_at,
      scheduled_disconnection_date: dRecord?.scheduled_disconnection_date,
      bills: billItems
    })
  })

  // Sort accounts by highest total arrears descending
  accounts.sort((a, b) => b.total_arrears - a.total_arrears)

  const totalRegisteredMeters = consumers.length || 341
  const collectionRecoveryRate = totalRegisteredMeters > 0 
    ? Math.round(((totalRegisteredMeters - accounts.length) / totalRegisteredMeters) * 100)
    : 72

  const areaBreakdown = Object.entries(areaMap).map(([area, data]) => ({
    area,
    accountsCount: data.count,
    totalArrears: data.arrears
  })).sort((a, b) => b.totalArrears - a.totalArrears)

  return {
    metrics: {
      totalArrearsAmount,
      totalDelinquentAccounts: accounts.length,
      notice30Count,
      redNotice60Count,
      disconnection90Count,
      currentGraceCount,
      totalRegisteredMeters,
      collectionRecoveryRate
    },
    areaBreakdown,
    accounts
  }
}

// Server Action: Update Disconnection / Action Status
export async function updateArrearsStatusAction(
  accountNumber: string, 
  status: ActionStatus, 
  notes?: string,
  scheduledDate?: string
) {
  const result = updateDisconnectionRecord({
    account_number: accountNumber,
    action_status: status,
    committee_notes: notes,
    scheduled_disconnection_date: scheduledDate
  })

  revalidateAllSystemPaths(['/admin/arrears', '/admin/bills', '/admin/dashboard'])
  return { success: true, record: result }
}

// Server Action: Send Single Red Notice SMS
export async function sendRedNoticeSmsAction(accountNumber: string, amount: number) {
  const consumers = getAllConsumers()
  const consumer = consumers.find(c => c.account_number === accountNumber)
  const mobile = consumer?.mobile || '077 123 4567'

  const message = `Vikasha CBO RED NOTICE: Acc #${accountNumber} has arrears LKR ${amount.toLocaleString()}. Settle in 7 days to avoid disconnection. Hot: 0112894567`

  const smsResult = await sendDemoSms({
    mobile,
    message
  })

  updateDisconnectionRecord({
    account_number: accountNumber,
    action_status: 'RED_NOTICE_ISSUED',
    notice_sent_at: new Date().toISOString(),
    committee_notes: `Formal Red Notice SMS sent to ${mobile} on ${new Date().toLocaleDateString()}.`
  })

  revalidateAllSystemPaths(['/admin/arrears'])
  return { success: true, message: `Red Notice SMS dispatched to ${mobile}` }
}

// Server Action: Batch Dispatch SMS to all selected accounts
export async function batchSendRedNoticeSmsAction(accounts: Array<{ accountNumber: string; amount: number }>) {
  let count = 0
  for (const item of accounts) {
    try {
      await sendRedNoticeSmsAction(item.accountNumber, item.amount)
      count++
    } catch {}
  }

  revalidateAllSystemPaths(['/admin/arrears'])
  return { success: true, count }
}
