import { createClient } from '@/lib/supabase/server'
import { BillsClientPage } from './ClientPage'

export default async function BillsPage() {
  const supabase = await createClient()

  const { data: bills } = await supabase
    .from('bills')
    .select('*, consumers(account_number, account_holder_name)')
    .order('created_at', { ascending: false })

  return <BillsClientPage bills={bills || []} />
}
