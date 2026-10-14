import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MeterReaderSidebar } from './MeterReaderSidebar'
import { ShieldCheck } from 'lucide-react'

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
    <div className="flex h-screen bg-[#F8FAFC] text-[#0B132B] overflow-hidden">
      {/* Sidebar */}
      <MeterReaderSidebar profile={profile} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-gray-200/80 px-6 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold border border-cyan-200/60">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Field Data Terminal &bull; Active
            </div>
            {profile?.assigned_area && (
              <span className="hidden sm:inline-block text-xs font-semibold text-gray-400">
                Route: {profile.assigned_area}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
            <div className="hidden md:flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#0066FF]" />
              <span>Offline Cache Sync Enabled</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="text-gray-700 font-bold">
              {profile?.name || 'Reader'}
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
