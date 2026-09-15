'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import crypto from 'crypto'
import { redirect } from 'next/navigation'

export async function acceptInvitation(formData: FormData) {
  const token = formData.get('token') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!token || !email || !password) {
    return { error: 'Missing required fields' }
  }

  const adminClient = createAdminClient()
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

  // Find invitation
  const { data: invitation, error: invError } = await adminClient
    .from('meter_reader_invitations')
    .select('*')
    .eq('email', email)
    .eq('token_hash', tokenHash)
    .eq('accepted', false)
    .single()

  if (invError || !invitation) {
    return { error: 'Invalid or expired invitation link' }
  }

  if (new Date(invitation.expires_at) < new Date()) {
    return { error: 'Invitation has expired' }
  }

  // Create user in Auth
  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || 'Failed to create user account' }
  }

  const user = authData.user

  // Create profile
  const { error: profileError } = await adminClient.from('profiles').insert({
    id: user.id,
    role: 'METER_READER',
    name: email.split('@')[0], // Give a default name, they can change it later
    email: email,
    assigned_area: invitation.assigned_area,
    status: 'ACTIVE'
  })

  if (profileError) {
    console.error('Profile creation error:', profileError)
    // Cleanup if profile creation fails? (Too complex for demo, but good practice)
    return { error: 'Failed to create user profile' }
  }

  // Mark invitation as accepted
  await adminClient
    .from('meter_reader_invitations')
    .update({ accepted: true })
    .eq('id', invitation.id)

  // Sign in the user
  const supabase = await createClient()
  await supabase.auth.signInWithPassword({
    email,
    password
  })

  redirect('/meter-reader/dashboard')
}
