import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'
import { ShieldCheck, Activity, Clock, MessageSquare } from 'lucide-react'
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
    <div className="flex h-screen bg-[#F8FAFC] text-[#0B132B] overflow-hidden">
      {/* Dynamic Sidebar */}
      <AdminSidebar profile={profile} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-gray-200/80 px-6 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              NWSDB Municipal Gateway &bull; Live
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-gray-400">
              Kaduwela &amp; Magammana Regional Authority
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
            {smsStatus?.success && typeof smsStatus.balance === 'number' && (
              <div 
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#004EEB] text-[11px] font-semibold border border-blue-200/60"
                title="Notify.lk SMS Gateway Balance"
              >
                <MessageSquare size={12} className="text-[#004EEB]" />
                <span>SMS: {smsStatus.balance} Credits</span>
              </div>
            )}
            <div className="hidden md:flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#0066FF]" />
              <span>TLS 1.3 &bull; Encrypted</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="text-gray-700 font-bold">
              {profile?.name || 'Admin'}
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
