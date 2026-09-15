'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  // Send email using Resend
  try {
    const { error: emailError } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: 'You have been invited as a Meter Reader',
      html: `
        <h2>You're invited to the Meter Reader System</h2>
        <p>Your administrator has invited you to access the system as a Meter Reader.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Assigned Area:</strong> ${assignedArea || 'Not specified'}</p>
        <br/>
        <a href="${inviteLink}" style="padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
        <br/><br/>
        <p>This invitation expires in 7 days.</p>
      `,
    })

    if (emailError) {
      console.error('Failed to send email:', emailError)
      return { error: 'Failed to send invitation email' }
    }
  } catch (err) {
    console.error('Error sending email:', err)
    return { error: 'Error sending email. Check Resend configuration.' }
  }

  revalidatePath('/admin/meter-readers')
  return { success: true }
}
