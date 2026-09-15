import { createClient } from '@/lib/supabase/server'
import { BillingRulesClientPage } from './ClientPage'

export default async function BillingRulesPage() {
  const supabase = await createClient()

  const { data: rules } = await supabase
    .from('billing_rules')
    .select('*')
    .order('created_at', { ascending: false })

  return <BillingRulesClientPage existingRules={rules || []} />
}
