import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface BillEmailInput {
  email: string
  consumerName: string
  accountNumber: string
  billingPeriod: string
  unitsConsumed: number
  totalPayable: number
  dueDate: string
  secureBillLink: string
  pdfBuffer: Buffer
  billNumber: string
}

export async function sendBillEmail(input: BillEmailInput) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: input.email,
      subject: `Your Monthly E-Bill - ${input.accountNumber}`,
      html: `
        <h2>Monthly E-Bill from ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'Utility Provider'}</h2>
        <p>Dear ${input.consumerName},</p>
        <p>Your e-bill for the period ${input.billingPeriod} is ready.</p>
        <ul>
          <li><strong>Account Number:</strong> ${input.accountNumber}</li>
          <li><strong>Units Consumed:</strong> ${input.unitsConsumed}</li>
          <li><strong>Total Payable:</strong> LKR ${input.totalPayable.toLocaleString()}</li>
          <li><strong>Due Date:</strong> ${input.dueDate}</li>
        </ul>
        <br/>
        <a href="${input.secureBillLink}" style="padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">View Online & Pay</a>
        <br/><br/>
        <p>Please find your detailed PDF bill attached to this email.</p>
      `,
      attachments: [
        {
          filename: `Bill-${input.billNumber}.pdf`,
          content: input.pdfBuffer,
        }
      ]
    })

    if (error) {
      console.error('Failed to send bill email:', error)
      return { success: false, error: error.message }
    }
    return { success: true, messageId: data?.id }
  } catch (err: any) {
    console.error('Exception sending bill email:', err)
    return { success: false, error: err.message }
  }
}

export interface ReceiptEmailInput {
  email: string
  consumerName: string
  accountNumber: string
  billNumber: string
  amount: number
  transactionId: string
}

export async function sendPaymentReceipt(input: ReceiptEmailInput) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: input.email,
      subject: `Payment Receipt - ${input.accountNumber}`,
      html: `
        <h2>Payment Receipt</h2>
        <p>Dear ${input.consumerName},</p>
        <p>We have successfully received your payment.</p>
        <ul>
          <li><strong>Account Number:</strong> ${input.accountNumber}</li>
          <li><strong>Bill Number:</strong> ${input.billNumber}</li>
          <li><strong>Amount Paid:</strong> LKR ${input.amount.toLocaleString()}</li>
          <li><strong>Transaction ID:</strong> ${input.transactionId}</li>
        </ul>
        <br/>
        <p>Thank you for your payment.</p>
      `
    })

    if (error) {
      console.error('Failed to send receipt email:', error)
      return { success: false, error: error.message }
    }
    return { success: true, messageId: data?.id }
  } catch (err: any) {
    console.error('Exception sending receipt email:', err)
    return { success: false, error: err.message }
  }
}
