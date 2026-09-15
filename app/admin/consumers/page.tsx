import { createClient } from '@/lib/supabase/server'
import { ConsumersClientPage } from './ClientPage'

export default async function ConsumersPage() {
  const supabase = await createClient()

  const { data: consumers } = await supabase
    .from('consumers')
    .select('*')
    .order('created_at', { ascending: false })

  return <ConsumersClientPage consumers={consumers || []} />
}
