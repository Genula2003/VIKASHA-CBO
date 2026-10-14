import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { calculateBill, calculateNWSDBBill } from '@/lib/billing/engine'
import { createAdminClient } from '@/lib/supabase/admin'
import ledgerConsumers from '@/lib/data/ledger_consumers.json'

const DATA_FILE_PATH = path.join(process.cwd(), 'lib/data/live_system_state.json')

export interface ConsumerRecord {
  id: string
  account_number: string
  account_holder_name: string
  address: string
  area?: string
  mobile?: string | null
  email?: string | null
  status: 'ACTIVE' | 'INACTIVE'
  created_at: string
  last_reading_value: number
  last_reading_date: string
}

export interface MeterReadingRecord {
  id: string
  consumer_id: string
  account_number: string
  reader_id: string
  reader_name?: string
  reading_date: string
  previous_reading: number
  current_reading: number
  units_consumed: number
  status: 'VALID' | 'DISPUTED'
  created_at: string
}

export interface BillRecord {
  id: string
  bill_number: string
  consumer_id: string
  account_number: string
  account_holder_name: string
  address: string
  reading_id?: string
  billing_period_start: string
  billing_period_end: string
  units_consumed: number
  previous_reading: number
  current_reading: number
  amount: number
  status: 'UNPAID' | 'PAID'
  due_date: string
  access_token: string
  pdf_url?: string | null
  created_at: string
  items: Array<{
    description: string
    units: number
    amount: number
    order_index: number
  }>
}

export interface PaymentRecord {
  id: string
  transaction_id: string
  bill_id: string
  bill_number: string
  account_number: string
  account_holder_name: string
  amount: number
  method: string
  status: 'SUCCESS'
  paid_at: string
}

export interface DisconnectionMetadata {
  account_number: string
  action_status: 'PENDING_REVIEW' | 'FIRST_NOTICE_SENT' | 'RED_NOTICE_ISSUED' | 'DISCONNECTION_SCHEDULED' | 'DISCONNECTED' | 'PAYMENT_AGREEMENT'
  committee_notes?: string
  notice_sent_at?: string
  scheduled_disconnection_date?: string
  disconnected_at?: string
  meter_index_at_disconnection?: number
  updated_at: string
  updated_by?: string
}

export interface SystemState {
  consumers: Record<string, ConsumerRecord> // keyed by account_number
  meter_readings: MeterReadingRecord[]
  bills: BillRecord[]
  payments: PaymentRecord[]
  audit_logs: any[]
  disconnection_records?: Record<string, DisconnectionMetadata>
}

export function getDeterministicUuid(accountNumber: string): string {
  const hex = crypto.createHash('md5').update(`consumer:${accountNumber.trim()}`).digest('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`
}

// In-memory singleton state and filesystem sync tracking
let globalState: SystemState | null = null
let lastDiskMtime = 0

function seedInitialHistoricalPayments(state: SystemState) {
  if (!state.payments || state.payments.length === 0) {
    state.payments = []
    const sampleAccounts = ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34', '37', '40', '43']
    const methods = [
      'Online Card (Visa/Mastercard)', 
      'Commercial Bank Online', 
      'Sampath Vishwa', 
      'Genie QR', 
      'Municipal Cash Counter'
    ]

    sampleAccounts.forEach((accNum, idx) => {
      const bill = state.bills.find(b => b.account_number === accNum)
      if (bill) {
        bill.status = 'PAID'
        state.payments.push({
          id: `payment-seed-${accNum}`,
          transaction_id: `TXN-2026-05-${10000 + idx * 47}-${accNum}`,
          bill_id: bill.id,
          bill_number: bill.bill_number,
          account_number: bill.account_number,
          account_holder_name: bill.account_holder_name,
          amount: bill.amount,
          method: methods[idx % methods.length],
          status: 'SUCCESS',
          paid_at: `2026-05-0${(idx % 8) + 1}T11:${String(10 + idx * 3).padStart(2, '0')}:00Z`
        })
      }
    })
  }
}

function initializeDefaultState(): SystemState {
  const consumers: Record<string, ConsumerRecord> = {}
  const readings: MeterReadingRecord[] = []
  const bills: BillRecord[] = []

  // Initialize from 341 community ledger accounts
  ;(ledgerConsumers as any[]).forEach((c, idx) => {
    const acc = String(c.accountNumber).trim()
    const uuid = getDeterministicUuid(acc)
    const prevUnits = Math.max(1, c.prevUnits || 12)
    const prevReading = c.prevReading || 100
    const calc = calculateNWSDBBill(prevUnits)
    const paddedAcc = acc.padStart(4, '0')
    const billNumber = `INV-2026-05-${paddedAcc}`
    const token = `tok-ledger-${acc.toLowerCase().replace(/[^a-z0-9]/g, '')}-2026`

    consumers[acc] = {
      id: uuid,
      account_number: acc,
      account_holder_name: c.name,
      address: c.address,
      area: c.area,
      mobile: '077 ••• •' + (100 + (idx % 900)),
      email: null,
      status: 'ACTIVE',
      created_at: '2026-04-30T00:00:00Z',
      last_reading_value: prevReading,
      last_reading_date: '2026-04-30'
    }

    readings.push({
      id: `reading-baseline-${acc}`,
      consumer_id: uuid,
      account_number: acc,
      reader_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      reader_name: 'Sunil Shantha',
      reading_date: '2026-04-30',
      previous_reading: Math.max(0, prevReading - prevUnits),
      current_reading: prevReading,
      units_consumed: prevUnits,
      status: 'VALID',
      created_at: '2026-04-30T00:00:00Z'
    })

    bills.push({
      id: `bill-baseline-${acc}`,
      bill_number: billNumber,
      consumer_id: uuid,
      account_number: acc,
      account_holder_name: c.name,
      address: c.address,
      reading_id: `reading-baseline-${acc}`,
      billing_period_start: '2026-04-01',
      billing_period_end: '2026-04-30',
      units_consumed: prevUnits,
      previous_reading: Math.max(0, prevReading - prevUnits),
      current_reading: prevReading,
      amount: calc.totalAmount,
      status: 'UNPAID',
      due_date: '2026-05-31',
      access_token: token,
      pdf_url: null,
      created_at: '2026-05-01T00:00:00Z',
      items: calc.items
    })
  })

  const initState: SystemState = {
    consumers,
    meter_readings: readings,
    bills,
    payments: [],
    audit_logs: []
  }

  seedInitialHistoricalPayments(initState)
  return initState
}

function loadState(): SystemState {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const stat = fs.statSync(DATA_FILE_PATH)
      if (globalState && stat.mtimeMs <= lastDiskMtime) {
        return globalState
      }
      const data = fs.readFileSync(DATA_FILE_PATH, 'utf8')
      globalState = JSON.parse(data)
      lastDiskMtime = stat.mtimeMs

      // Ensure historical payments exist
      if (!globalState!.payments || globalState!.payments.length === 0) {
        seedInitialHistoricalPayments(globalState!)
        saveState()
      }

      return globalState!
    }
  } catch (err) {
    console.warn('System state load note, reinitializing:', err)
  }

  globalState = initializeDefaultState()
  saveState()
  return globalState
}

function saveState() {
  if (!globalState) return
  try {
    const dir = path.dirname(DATA_FILE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(globalState, null, 2), 'utf8')
    try {
      lastDiskMtime = fs.statSync(DATA_FILE_PATH).mtimeMs
    } catch {}
  } catch (err) {
    console.error('Failed to persist system state to disk:', err)
  }
}

// 1. Get Consumer by account number
export function getConsumerRecord(accountNumber: string): ConsumerRecord | null {
  const state = loadState()
  const cleanAcc = accountNumber.trim()
  const normQuery = cleanAcc.replace(/^0+/, '')

  // Check direct match
  if (state.consumers[cleanAcc]) return state.consumers[cleanAcc]

  // Check case-insensitive / normalized match
  for (const [key, val] of Object.entries(state.consumers)) {
    if (
      key.toLowerCase() === cleanAcc.toLowerCase() ||
      key.replace(/^0+/, '') === normQuery ||
      val.account_number.toLowerCase() === cleanAcc.toLowerCase()
    ) {
      return val
    }
  }

  return null
}

// 2. Get All Consumers list
export function getAllConsumers(): ConsumerRecord[] {
  const state = loadState()
  return Object.values(state.consumers)
}

// 3. Upsert a consumer
export function upsertConsumerRecord(data: Partial<ConsumerRecord> & { account_number: string; account_holder_name: string }): ConsumerRecord {
  const state = loadState()
  const acc = data.account_number.trim()
  const existing = state.consumers[acc]
  const uuid = existing?.id || getDeterministicUuid(acc)

  const updated: ConsumerRecord = {
    id: uuid,
    account_number: acc,
    account_holder_name: data.account_holder_name,
    address: data.address || existing?.address || 'Magammana, Homagama',
    area: data.area || existing?.area || 'Magammana',
    mobile: data.mobile !== undefined ? data.mobile : existing?.mobile,
    email: data.email !== undefined ? data.email : existing?.email,
    status: 'ACTIVE',
    created_at: existing?.created_at || new Date().toISOString(),
    last_reading_value: data.last_reading_value !== undefined ? data.last_reading_value : (existing?.last_reading_value || 0),
    last_reading_date: data.last_reading_date || existing?.last_reading_date || '2026-04-30'
  }

  state.consumers[acc] = updated
  saveState()
  return updated
}

// 4. Get active bill for an account
export function getActiveBillForConsumer(accountNumber: string): BillRecord | null {
  const state = loadState()
  const cleanAcc = accountNumber.trim()
  const normQuery = cleanAcc.replace(/^0+/, '')

  const matchingBills = state.bills.filter(b => {
    return (
      b.account_number === cleanAcc ||
      b.account_number.toLowerCase() === cleanAcc.toLowerCase() ||
      b.account_number.replace(/^0+/, '') === normQuery
    )
  })

  // Prioritize latest UNPAID bill
  const unpaid = [...matchingBills].reverse().find(b => b.status === 'UNPAID')
  if (unpaid) return unpaid

  // If no unpaid bill, return newest bill
  return matchingBills[matchingBills.length - 1] || null
}

// 5. Get bill by token
export function getBillRecordByToken(token: string): BillRecord | null {
  const state = loadState()
  return state.bills.find(b => b.access_token === token) || null
}

// 6. Get all bills
export function getAllBills(): BillRecord[] {
  const state = loadState()
  return [...state.bills].reverse()
}

// 7. Get all readings
export function getAllReadings(): MeterReadingRecord[] {
  const state = loadState()
  return [...state.meter_readings].reverse()
}

// 8. Get readings by reader
export function getReadingsByReader(readerId?: string): MeterReadingRecord[] {
  const state = loadState()
  return [...state.meter_readings].reverse()
}

// 9. Get all payments
export function getAllPayments(): PaymentRecord[] {
  const state = loadState()
  return [...state.payments].reverse()
}

// 10. Record a new reading and generate bill
export async function recordReadingAndBill(params: {
  accountNumber: string
  consumerName: string
  consumerAddress: string
  previousReading: number
  currentReading: number
  lastReadingDate: string
  readerId: string
  readerName: string
}): Promise<{
  bill: BillRecord
  reading: MeterReadingRecord
}> {
  const state = loadState()
  const acc = params.accountNumber.trim()
  const uuid = getDeterministicUuid(acc)
  const todayDate = new Date().toISOString().split('T')[0]
  const unitsConsumed = Math.max(0, params.currentReading - params.previousReading)

  // 1. Calculate NWSDB bill
  const calc = calculateNWSDBBill(unitsConsumed)
  const billNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
  const baseToken = `tok-ledger-${acc.toLowerCase().replace(/[^a-z0-9]/g, '')}`
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 21)

  // 2. Update consumer's latest reading in state
  upsertConsumerRecord({
    account_number: acc,
    account_holder_name: params.consumerName,
    address: params.consumerAddress,
    last_reading_value: params.currentReading,
    last_reading_date: todayDate
  })

  // 3. Create meter reading record
  const readingRecord: MeterReadingRecord = {
    id: `reading-${Date.now()}-${acc}`,
    consumer_id: uuid,
    account_number: acc,
    reader_id: params.readerId,
    reader_name: params.readerName,
    reading_date: todayDate,
    previous_reading: params.previousReading,
    current_reading: params.currentReading,
    units_consumed: unitsConsumed,
    status: 'VALID',
    created_at: new Date().toISOString()
  }

  // 4. Create bill record
  const existingUnpaidIndex = state.bills.findIndex(b => b.account_number === acc && b.status === 'UNPAID')
  const assignedToken = existingUnpaidIndex >= 0 
    ? state.bills[existingUnpaidIndex].access_token 
    : `${baseToken}-${Date.now().toString(36)}`

  const billRecord: BillRecord = {
    id: `bill-${Date.now()}-${acc}`,
    bill_number: billNumber,
    consumer_id: uuid,
    account_number: acc,
    account_holder_name: params.consumerName,
    address: params.consumerAddress,
    reading_id: readingRecord.id,
    billing_period_start: params.lastReadingDate,
    billing_period_end: todayDate,
    units_consumed: unitsConsumed,
    previous_reading: params.previousReading,
    current_reading: params.currentReading,
    amount: calc.totalAmount,
    status: 'UNPAID',
    due_date: dueDate.toISOString(),
    access_token: assignedToken,
    created_at: new Date().toISOString(),
    items: calc.items
  }

  // Update in-memory / disk state
  state.meter_readings.push(readingRecord)
  
  if (existingUnpaidIndex >= 0) {
    state.bills[existingUnpaidIndex] = billRecord
  } else {
    state.bills.push(billRecord)
  }

  saveState()

  // Background sync to Supabase if connected
  try {
    const admin = createAdminClient()
    admin.from('consumers').upsert({
      id: uuid,
      account_number: acc,
      account_holder_name: params.consumerName,
      address: params.consumerAddress,
      status: 'ACTIVE'
    }, { onConflict: 'account_number' }).then(() => {
      admin.from('meter_readings').insert({
        consumer_id: uuid,
        reader_id: params.readerId,
        reading_date: todayDate,
        previous_reading: params.previousReading,
        current_reading: params.currentReading,
        units_consumed: unitsConsumed,
        status: 'VALID'
      }).then(() => {}, () => {})
    }, () => {})
  } catch {}

  return { bill: billRecord, reading: readingRecord }
}

// 11. Settle Bill & Record Payment
export async function processPaymentSettlement(tokenOrAccount: string, method: string = 'Online Card'): Promise<{
  success: boolean
  payment?: PaymentRecord
  bill?: BillRecord
  error?: string
}> {
  const state = loadState()
  let bill: BillRecord | undefined = state.bills.find(b => b.access_token === tokenOrAccount)
  if (!bill) {
    bill = getActiveBillForConsumer(tokenOrAccount) || undefined
  }

  if (!bill) {
    return { success: false, error: 'Bill not found' }
  }

  if (bill.status === 'PAID') {
    return { success: false, error: 'Bill is already paid in full' }
  }

  const txnId = `TXN-${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}-${bill.account_number}`
  const now = new Date().toISOString()

  // Mark bill as PAID
  bill.status = 'PAID'

  const paymentRecord: PaymentRecord = {
    id: `payment-${Date.now()}-${bill.account_number}`,
    transaction_id: txnId,
    bill_id: bill.id,
    bill_number: bill.bill_number,
    account_number: bill.account_number,
    account_holder_name: bill.account_holder_name,
    amount: bill.amount,
    method,
    status: 'SUCCESS',
    paid_at: now
  }

  state.payments.push(paymentRecord)
  saveState()

  // Sync to Supabase in background
  try {
    const admin = createAdminClient()
    admin.from('bills').update({ status: 'PAID' }).eq('bill_number', bill.bill_number).then(() => {}, () => {})
    admin.from('payments').insert({
      bill_id: bill.id,
      transaction_id: txnId,
      amount: bill.amount,
      method,
      status: 'SUCCESS'
    }).then(() => {}, () => {})
  } catch {}

  return {
    success: true,
    payment: paymentRecord,
    bill
  }
}

export async function processPaymentSettlementByAccount(accountNumber: string, method: string = 'Online Card') {
  return processPaymentSettlement(accountNumber, method)
}

// 12. Aggregated metrics for Admin & Reader Dashboards
export function getLiveSystemMetrics() {
  const state = loadState()
  const consumersCount = Object.keys(state.consumers).length
  const billsCount = state.bills.length
  const totalBilled = state.bills.reduce((sum, b) => sum + b.amount, 0)
  const totalCollected = state.payments.reduce((sum, p) => sum + p.amount, 0)
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0

  return {
    consumersCount,
    billsCount,
    totalBilled,
    totalCollected,
    collectionRate,
    recentReadings: [...state.meter_readings].reverse().slice(0, 8),
    recentBills: [...state.bills].reverse().slice(0, 10),
    recentPayments: [...state.payments].reverse().slice(0, 10)
  }
}

// 13. Disconnection & Committee Metadata Management
export function getDisconnectionRecords(): Record<string, DisconnectionMetadata> {
  const state = loadState()
  return state.disconnection_records || {}
}

export function updateDisconnectionRecord(data: Partial<DisconnectionMetadata> & { account_number: string }): DisconnectionMetadata {
  const state = loadState()
  state.disconnection_records = state.disconnection_records || {}
  const acc = data.account_number.trim()
  const existing = state.disconnection_records[acc] || {
    account_number: acc,
    action_status: 'PENDING_REVIEW',
    updated_at: new Date().toISOString()
  }

  const updated: DisconnectionMetadata = {
    ...existing,
    ...data,
    account_number: acc,
    updated_at: new Date().toISOString()
  }

  state.disconnection_records[acc] = updated
  saveState()
  return updated
}

export { revalidateAllSystemPaths } from './revalidate-all'
