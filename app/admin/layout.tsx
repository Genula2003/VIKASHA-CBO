import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminShell } from './AdminShell'
import { getNotifyLkStatus } from '@/lib/sms/notify-lk'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, email, role')
    .eq('id', user.id)
    .single()

  const smsStatus = await getNotifyLkStatus().catch(() => ({ success: false, balance: undefined }))

  return (
    <AdminShell profile={profile} smsStatus={smsStatus}>
      {children}
    </AdminShell>
  )
}
