import { createAdminClient } from '@/lib/supabase/admin'
import { BillingRulesClientPage } from './ClientPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Billing Rules Engine | Vikasha CBO Portal',
  description: 'Manage dynamic tariff calculations and billing rules for Vikasha CBO.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BillingRulesPage() {
  const adminClient = createAdminClient()

  // Fetch all billing rules sorted by creation date
  const { data: dbRules } = await adminClient
    .from('billing_rules')
    .select('*, billing_rule_slabs(*)')
    .order('created_at', { ascending: false })

  let rules = dbRules || []

  // If table is empty, display the authoritative NWSDB statutory rule
  if (rules.length === 0) {
    rules = [
      {
        id: 'rule-nwsdb-statutory-2026',
        name: 'Official Sri Lanka NWSDB Domestic Tariff Schedule (2026 Gazette)',
        effective_from: '2026-01-01',
        effective_to: null,
        status: 'ACTIVE',
        billing_period: 'Monthly Automatic',
        created_at: '2026-01-01T00:00:00Z'
      }
    ]
  }

  return <BillingRulesClientPage existingRules={rules} />
}
