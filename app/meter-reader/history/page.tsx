import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MeterReaderHistoryClient } from './ClientPage'
import { getAllReadings, getAllBills } from '@/lib/services/system-store'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MeterReaderHistoryPage() {
  const userClient = await createClient()
  const { data: { user } } = await userClient.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get readings and bills directly from synchronized system store
  const readings = getAllReadings()
  const bills = getAllBills()

  // Map bills to their readings
  const mapped = readings.map(r => {
    const matchingBill = bills.find(b => b.reading_id === r.id || b.account_number === r.account_number)
    return {
      id: r.id,
      reading_date: r.reading_date,
      previous_reading: r.previous_reading,
      current_reading: r.current_reading,
      units_consumed: r.units_consumed,
      status: r.status,
      created_at: r.created_at,
      consumers: {
        account_number: r.account_number,
        account_holder_name: matchingBill?.account_holder_name || 'Community Consumer',
        address: matchingBill?.address || 'Magammana, Homagama'
      },
      bills: matchingBill ? [{
        bill_number: matchingBill.bill_number,
        amount: matchingBill.amount,
        status: matchingBill.status,
        access_token: matchingBill.access_token
      }] : []
    }
  })

  return (
    <MeterReaderHistoryClient 
      initialReadings={mapped} 
      readerId={user.id} 
    />
  )
}
