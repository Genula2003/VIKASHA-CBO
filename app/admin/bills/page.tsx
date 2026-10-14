import { getAllBills } from '@/lib/services/system-store'
import { BillsClientPage } from './ClientPage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BillsPage() {
  const allBills = getAllBills()

  const bills = allBills.map(b => ({
    id: b.id,
    bill_number: b.bill_number,
    amount: b.amount,
    status: b.status,
    created_at: b.created_at,
    due_date: b.due_date,
    access_token: b.access_token,
    pdf_url: b.pdf_url || null,
    consumers: {
      account_number: b.account_number,
      account_holder_name: b.account_holder_name,
      address: b.address
    }
  }))

  return <BillsClientPage bills={bills} />
}
