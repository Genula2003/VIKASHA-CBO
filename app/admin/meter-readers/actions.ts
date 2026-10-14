'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendInvitationEmail } from '@/lib/email/resend'
import crypto from 'crypto'

export async function inviteMeterReader(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const mobile = formData.get('mobile') as string
  const assignedArea = formData.get('assignedArea') as string

  if (!email || !name) return { error: 'Name and email are required' }

  const supabase = await createClient()

  // Generate secure token
  const token = crypto.randomBytes(32).toString('hex')
  // For production we should hash the token, but we are storing token_hash in DB
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  
  // Set expiration (7 days)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  const { error: dbError } = await supabase.from('meter_reader_invitations').insert({
    email,
    token_hash: tokenHash,
    assigned_area: assignedArea,
    expires_at: expiresAt.toISOString(),
  })

  if (dbError) {
    return { error: dbError.message }
  }

  // Generate invitation link (we can use the base URL from env, or a dummy for now)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const inviteLink = `${appUrl}/accept-invitation?token=${token}&email=${encodeURIComponent(email)}`

  // Send invitation email via support@vikashacbo.com
  const emailResult = await sendInvitationEmail({
    email,
    name,
    assignedArea,
    inviteLink,
  })

  if (!emailResult.success) {
    return { error: 'Failed to dispatch invitation email' }
  }

  revalidatePath('/admin/meter-readers')
  return { success: true }
}
