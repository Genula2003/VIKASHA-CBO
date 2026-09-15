import { jsPDF } from 'jspdf'

export interface BillPdfData {
  billNumber: string
  accountNumber: string
  consumerName: string
  billingPeriod: string
  previousReading: number
  currentReading: number
  unitsConsumed: number
  items: { description: string; amount: number }[]
  totalAmount: number
  dueDate: string
  status: string
  companyName: string
}

export async function generateBillPdf(data: BillPdfData): Promise<Buffer> {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(20)
  doc.text(data.companyName, 105, 20, { align: 'center' })
  
  doc.setFontSize(14)
  doc.text('MONTHLY E-BILL', 105, 30, { align: 'center' })

  // Line
  doc.setLineWidth(0.5)
  doc.line(20, 35, 190, 35)

  // Bill Details
  doc.setFontSize(12)
  doc.text(`Bill Number: ${data.billNumber}`, 20, 45)
  doc.text(`Account Number: ${data.accountNumber}`, 20, 52)
  doc.text(`Account Holder: ${data.consumerName}`, 20, 59)
  doc.text(`Billing Period: ${data.billingPeriod}`, 20, 66)
  
  doc.text(`Previous Reading: ${data.previousReading}`, 130, 45)
  doc.text(`Current Reading: ${data.currentReading}`, 130, 52)
  doc.setFont(undefined, 'bold')
  doc.text(`Units Consumed: ${data.unitsConsumed}`, 130, 61)
  doc.setFont(undefined, 'normal')

  doc.line(20, 75, 190, 75)

  // Calculation Breakdown
  doc.text('BILL CALCULATION', 20, 85)
  
  let y = 95
  for (const item of data.items) {
    doc.text(item.description, 20, y)
    doc.text(`LKR ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 190, y, { align: 'right' })
    y += 10
  }

  doc.line(20, y + 5, 190, y + 5)
  
  // Total
  y += 15
  doc.setFontSize(14)
  doc.setFont(undefined, 'bold')
  doc.text('TOTAL', 20, y)
  doc.text(`LKR ${data.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 190, y, { align: 'right' })

  doc.setFontSize(12)
  doc.setFont(undefined, 'normal')
  y += 15
  doc.text(`Due Date: ${data.dueDate}`, 20, y)
  doc.text(`Status: ${data.status}`, 20, y + 7)

  doc.line(20, y + 15, 190, y + 15)
  
  doc.text('Thank you for using our service.', 105, y + 25, { align: 'center' })

  // Return buffer
  const arrayBuffer = doc.output('arraybuffer')
  return Buffer.from(arrayBuffer)
}
