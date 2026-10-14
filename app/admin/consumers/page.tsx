import { getAllConsumers } from '@/lib/services/system-store'
import { ConsumersClientPage } from './ClientPage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ConsumersPage() {
  const storeConsumers = getAllConsumers()

  const consumers = storeConsumers.map(c => ({
    id: c.id,
    account_number: c.account_number,
    account_holder_name: c.account_holder_name,
    address: c.address,
    area: c.area || 'Magammana',
    status: c.status,
    mobile: c.mobile || '077 ••• •589',
    email: c.email || null,
    created_at: c.created_at,
    initial_reading: c.last_reading_value,
    initial_reading_date: c.last_reading_date
  }))

  return <ConsumersClientPage consumers={consumers} />
}
