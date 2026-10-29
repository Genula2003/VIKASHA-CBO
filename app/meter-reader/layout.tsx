import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MeterReaderShell } from './MeterReaderShell'

export default async function MeterReaderLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, email, role, assigned_area')
    .eq('id', user.id)
    .single()

  return (
    <MeterReaderShell profile={profile}>
      {children}
    </MeterReaderShell>
  )
}
