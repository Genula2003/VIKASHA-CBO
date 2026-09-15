'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBillingRule(formData: any) {
  const supabase = await createClient()

  // Start by inserting the rule
  const { data: rule, error: ruleError } = await supabase.from('billing_rules').insert({
    name: formData.name,
    effective_from: formData.effectiveFrom,
    effective_to: formData.effectiveTo || null,
    billing_period: formData.billingPeriod || 'Automatic',
    status: 'ACTIVE'
  }).select().single()

  if (ruleError || !rule) {
    return { error: ruleError?.message || 'Failed to create rule' }
  }

  // Insert the slabs
  const slabsToInsert = formData.slabs.map((slab: any, index: number) => ({
    rule_id: rule.id,
    from_unit: slab.from_unit,
    to_unit: slab.to_unit || null,
    type: slab.type,
    rate: slab.rate,
    order_index: index + 1
  }))

  const { error: slabsError } = await supabase.from('billing_rule_slabs').insert(slabsToInsert)

  if (slabsError) {
    // Ideally rollback, but simpler here
    return { error: 'Failed to save slabs: ' + slabsError.message }
  }

  revalidatePath('/admin/billing-rules')
  return { success: true }
}
