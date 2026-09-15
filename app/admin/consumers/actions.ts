'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const consumerSchema = z.object({
  accountNumber: z.string().min(3),
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')),
  mobile: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  initialReading: z.number().min(0).optional(),
  initialReadingDate: z.string().optional()
})

export async function addConsumer(data: z.infer<typeof consumerSchema>) {
  const result = consumerSchema.safeParse(data)
  if (!result.success) return { error: 'Invalid data' }

  const supabase = await createClient()

  // Start a transaction-like sequence
  const { data: consumer, error: consumerError } = await supabase.from('consumers').insert({
    account_number: data.accountNumber,
    account_holder_name: data.name,
    email: data.email || null,
    mobile: data.mobile || null,
    address: data.address || null,
    status: 'ACTIVE'
  }).select().single()

  if (consumerError) {
    if (consumerError.code === '23505') {
      return { error: 'Account number already exists' }
    }
    return { error: consumerError.message }
  }

  if (data.initialReading !== undefined && data.initialReadingDate) {
    const { error: readingError } = await supabase.from('meter_readings').insert({
      consumer_id: consumer.id,
      reading_date: data.initialReadingDate,
      previous_reading: 0,
      current_reading: data.initialReading,
      units_consumed: data.initialReading,
      status: 'VALID'
    })
    
    if (readingError) {
      // In a real app we'd rollback the consumer creation or handle it better
      console.error('Failed to insert initial reading:', readingError)
    }
  }

  revalidatePath('/admin/consumers')
  return { success: true }
}
