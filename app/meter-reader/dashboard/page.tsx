import { createClient } from '@/lib/supabase/server'
import { getAllReadings, getAllConsumers } from '@/lib/services/system-store'
import { FileText, ClipboardList, MapPin, PlusCircle, History, UserCheck, Activity, Target, Droplet } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MeterReaderDashboard() {
  const userClient = await createClient()
  const { data: { user } } = await userClient.auth.getUser()

  // Real-time metrics from synchronized system store
  const allReadings = getAllReadings()
  const allConsumers = getAllConsumers()
  const todayStr = new Date().toISOString().split('T')[0]

  const todayReadingsCount = allReadings.filter(r => 
    r.reading_date === todayStr || (r.created_at && r.created_at.startsWith(todayStr))
  ).length

  const totalConsumersCount = allConsumers.length

  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[12px] font-semibold mb-4 shadow-sm">
              <UserCheck size={14} className="text-cyan-400" />
              Field Officer Data Terminal
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Welcome back, Sunil Shantha
            </h1>
            <p className="text-gray-300 font-medium max-w-xl text-sm leading-relaxed">
              Assigned Zone: <span className="text-cyan-300 font-bold">Magammana Regional Grid</span>.
              Capture field readings, issue immediate digital invoices, and log utility records seamlessly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/meter-reader/enter-reading"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-[#0066FF] text-white rounded-2xl font-black text-xs shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5 transition-all"
            >
              <PlusCircle size={16} /> Record Reading
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Stats */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today&apos;s Field Records</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066FF]">
              <Activity size={20} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-[#0B132B]">{todayReadingsCount}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">Meters Logged</span>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-3">Completed in current shift</p>
        </div>

        {/* Total Ledger Coverage */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Community Meters</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
              <Droplet size={20} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-[#0B132B]">{totalConsumersCount}</span>
            <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-lg">Meters in Territory</span>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-3">Across 9 Magammana community roads</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Primary Action Card */}
        <Link 
          href="/meter-reader/enter-reading" 
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 shadow-lg text-white hover:-translate-y-1 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-400 mb-6 border border-white/10">
            <PlusCircle size={24} />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Record Field Meter Reading</h3>
          <p className="text-gray-300 text-xs font-medium max-w-sm">
            Search consumer account, inspect past meter baseline, and compute NWSDB bill with automated SMS/Email dispatch.
          </p>
        </Link>

        {/* Secondary Action Card */}
        <Link 
          href="/meter-reader/history" 
          className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0066FF] mb-6">
            <ClipboardList size={24} />
          </div>
          <h3 className="text-2xl font-black text-[#0B132B] mb-2">Field Submission History</h3>
          <p className="text-gray-500 text-xs font-medium max-w-sm">
            Review all previously submitted meter readings, invoices generated, and reprint municipal bill slips.
          </p>
        </Link>
      </div>
    </div>
  )
}
