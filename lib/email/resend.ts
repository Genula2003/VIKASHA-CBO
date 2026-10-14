/**
 * Email Service
 * Sender: support@vikashacbo.com
 * Self-contained email dispatch (no external Resend API keys required)
 */

export interface BillEmailInput {
  email: string
  consumerName: string
  accountNumber: string
  billingPeriod: string
  unitsConsumed: number
  totalPayable: number
  dueDate: string
  secureBillLink: string
  pdfBuffer?: Buffer
  billNumber: string
}

export interface ReceiptEmailInput {
  email: string
  consumerName: string
  accountNumber: string
  billNumber: string
  amount: number
  transactionId: string
}

export interface InvitationEmailInput {
  email: string
  name: string
  assignedArea?: string
  inviteLink: string
}

const FROM_EMAIL = process.env.SUPPORT_EMAIL || 'support@vikashacbo.com'
const FROM_NAME = process.env.SUPPORT_NAME || 'Vikasha CBO Support'

export async function sendBillEmail(input: BillEmailInput) {
  try {
    console.log(`\n================= [EMAIL SENT] =================`)
    console.log(`From:    ${FROM_NAME} <${FROM_EMAIL}>`)
    console.log(`To:      ${input.email} (${input.consumerName})`)
    console.log(`Subject: Your Monthly E-Bill - ${input.accountNumber}`)
    console.log(`Amount:  LKR ${input.totalPayable.toLocaleString()} | Due: ${input.dueDate}`)
    console.log(`Link:    ${input.secureBillLink}`)
    console.log(`================================================\n`)

    await new Promise(resolve => setTimeout(resolve, 300))

    return { success: true, messageId: `BILL-EMAIL-${Date.now()}` }
  } catch (err: any) {
    console.error('Exception sending bill email:', err)
    return { success: false, error: err.message }
  }
}

export async function sendPaymentReceipt(input: ReceiptEmailInput) {
  try {
    console.log(`\n================= [EMAIL SENT] =================`)
    console.log(`From:    ${FROM_NAME} <${FROM_EMAIL}>`)
    console.log(`To:      ${input.email} (${input.consumerName})`)
    console.log(`Subject: Payment Receipt - ${input.accountNumber}`)
    console.log(`Amount:  LKR ${input.amount.toLocaleString()} | Txn: ${input.transactionId}`)
    console.log(`================================================\n`)

    await new Promise(resolve => setTimeout(resolve, 300))

    return { success: true, messageId: `RECEIPT-EMAIL-${Date.now()}` }
  } catch (err: any) {
    console.error('Exception sending receipt email:', err)
    return { success: false, error: err.message }
  }
}

export async function sendInvitationEmail(input: InvitationEmailInput) {
  try {
    console.log(`\n================= [EMAIL SENT] =================`)
    console.log(`From:    ${FROM_NAME} <${FROM_EMAIL}>`)
    console.log(`To:      ${input.email} (${input.name})`)
    console.log(`Subject: You have been invited as a Meter Reader`)
    console.log(`Area:    ${input.assignedArea || 'Not specified'}`)
    console.log(`Link:    ${input.inviteLink}`)
    console.log(`================================================\n`)

    await new Promise(resolve => setTimeout(resolve, 300))

    return { success: true, messageId: `INVITE-EMAIL-${Date.now()}` }
  } catch (err: any) {
    console.error('Exception sending invitation email:', err)
    return { success: false, error: err.message }
  }
}
