'use server'

import { createClient } from '@/lib/supabase/server'
import { upsertConsumerRecord, recordReadingAndBill, revalidateAllSystemPaths } from '@/lib/services/system-store'
import { z } from 'zod'

const consumerSchema = z.object({
  accountNumber: z.string().min(1, 'Account number is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email().optional().or(z.literal('')),
  mobile: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  initialReading: z.number().min(0).optional(),
  initialReadingDate: z.string().optional()
})

export async function addConsumer(data: z.infer<typeof consumerSchema>) {
  const result = consumerSchema.safeParse(data)
  if (!result.success) return { error: 'Invalid consumer details provided' }

  const acc = data.accountNumber.trim()
  const todayDate = new Date().toISOString().split('T')[0]
  const readingDate = data.initialReadingDate || todayDate
  const readingVal = data.initialReading || 0

  // 1. Immediately persist in unified system store
  const consumer = upsertConsumerRecord({
    account_number: acc,
    account_holder_name: data.name,
    address: data.address || 'Magammana, Homagama',
    mobile: data.mobile || null,
    email: data.email || null,
    last_reading_value: readingVal,
    last_reading_date: readingDate
  })

  // 2. If initial reading is recorded, generate official baseline reading & invoice
  if (readingVal > 0) {
    try {
      await recordReadingAndBill({
        accountNumber: acc,
        consumerName: data.name,
        consumerAddress: data.address || 'Magammana, Homagama',
        previousReading: 0,
        currentReading: readingVal,
        lastReadingDate: readingDate,
        readerId: 'admin-console',
        readerName: 'Municipal Admin Terminal'
      })
    } catch (e) {
      console.warn('Initial reading setup note:', e)
    }
  }

  // 3. Background sync to Supabase if connected
  try {
    const supabase = await createClient()
    supabase.from('consumers').insert({
      id: consumer.id,
      account_number: acc,
      account_holder_name: data.name,
      email: data.email || null,
      mobile: data.mobile || null,
      address: data.address || null,
      status: 'ACTIVE'
    }).then(() => {})
  } catch {}

  // 4. Update everywhere automatically
  revalidateAllSystemPaths(['/admin/consumers', `/pay`])

  return { success: true }
}
