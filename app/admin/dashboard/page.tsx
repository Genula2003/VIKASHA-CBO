import { getLiveSystemMetrics, getAllConsumers } from '@/lib/services/system-store'
import { computeArrearsData } from '@/lib/services/arrears-service'
import { formatDate } from '@/lib/format'
import Link from 'next/link'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Droplet, 
  ArrowRight, 
  BarChart3, 
  Activity, 
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  FileWarning
} from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminDashboard() {
  const metrics = getLiveSystemMetrics()
  const allConsumers = getAllConsumers()
  const arrears = computeArrearsData()

  // Area distribution
  const areaCounts = allConsumers.reduce((acc: Record<string, number>, c) => {
    const area = c.area || (c.address && c.address.includes('(') ? c.address.match(/\((.*?)\)/)?.[1] : 'Magammana') || 'Magammana'
    acc[area] = (acc[area] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Executive Command Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[12px] font-semibold mb-4 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Vikasha CBO &bull; Magammana Community Water Command Center
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Executive Overview
            </h1>
            <p className="text-gray-300 font-medium max-w-xl text-sm leading-relaxed">
              Real-time monitoring of community water connections, field meter reading operations, tariff billing, and municipal revenue collection.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link 
              href="/admin/bills" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-xl font-bold transition-all text-xs"
            >
              <FileText size={15} /> All Invoices
            </Link>
            <Link 
              href="/admin/consumers" 
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#0088FF] text-white px-6 py-3 rounded-xl font-black shadow-lg shadow-blue-500/30 transition-all text-xs hover:-translate-y-0.5"
            >
              Consumer Directory
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
              <Users size={22} />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Registered</span>
          </div>
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Total Connections</h3>
          <div className="text-3xl font-black text-[#0B132B]">{metrics.consumersCount.toLocaleString()}</div>
          <p className="text-xs text-gray-400 font-medium mt-1">Across 9 Community Zones</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <FileText size={22} />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Invoices</span>
          </div>
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Generated Bills</h3>
          <div className="text-3xl font-black text-[#0B132B]">{metrics.billsCount.toLocaleString()}</div>
          <p className="text-xs text-gray-400 font-medium mt-1">NWSDB Tariff Verified</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <BarChart3 size={22} />
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Total Billed</h3>
          <div className="text-3xl font-black text-[#0B132B]">
            LKR {metrics.totalBilled.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-xs text-gray-400 font-medium mt-1">Total Metered Invoices</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp size={22} />
            </div>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {metrics.collectionRate}% Rate
            </span>
          </div>
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Total Collected</h3>
          <div className="text-3xl font-black text-[#0B132B]">
            LKR {metrics.totalCollected.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-xs text-gray-400 font-medium mt-1">Reconciled Collections</p>
        </div>
      </div>

      {/* CBO Committee Statutory Arrears & Red Notice Alert */}
      <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-[#0B132B] rounded-3xl p-6 sm:p-7 text-white border border-red-500/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/40">
            <AlertOctagon size={24} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-300">
                CBO Committee Arrears Resolution &bull; හිඟ මුදල් පාලනය
              </span>
              <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-200 text-[10px] font-bold border border-red-400/20">
                Action Required
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white">
              {arrears.metrics.disconnection90Count} Disconnection Warrants Eligible &bull; {arrears.metrics.redNotice60Count} Active Red Notices
            </h3>
            <p className="text-xs text-gray-300 font-medium">
              Total uncollected community arrears: <span className="font-mono font-bold text-red-200">LKR {arrears.metrics.totalArrearsAmount.toLocaleString()}</span> across {arrears.metrics.totalDelinquentAccounts} delinquent accounts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/admin/arrears"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all shadow-md shadow-red-600/30"
          >
            <FileWarning size={15} />
            Open Red Notice &amp; Disconnection Manager &rarr;
          </Link>
        </div>
      </div>

      {/* Grid: Recent Field Activity & Zonal Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Field Readings */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
                <Activity size={18} />
              </div>
              <div>
                <h2 className="text-base font-black text-[#0B132B]">Recent Meter Reading Submissions</h2>
                <p className="text-xs text-gray-400 font-medium">Real-time meter records captured by field staff</p>
              </div>
            </div>

            <Link
              href="/admin/bills"
              className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
            >
              View Invoices <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Account</th>
                  <th className="pb-3">Reader / Officer</th>
                  <th className="pb-3">Meter Reading</th>
                  <th className="pb-3">Consumption</th>
                  <th className="pb-3 pr-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {metrics.recentReadings.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pl-2 font-mono font-bold text-[#0066FF]">
                      #{r.account_number}
                    </td>
                    <td className="py-3 font-semibold text-[#0B132B]">
                      {r.reader_name || 'Sunil Shantha'}
                    </td>
                    <td className="py-3 font-mono font-medium text-gray-600">
                      {r.current_reading} units
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-[#0066FF] font-bold">
                        <Droplet size={11} /> {r.units_consumed} units
                      </span>
                    </td>
                    <td className="py-3 pr-2 text-right text-gray-400 font-medium whitespace-nowrap">
                      {formatDate(r.reading_date || r.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Community Zones & Distribution */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <MapPin size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#0B132B]">Regional Zones</h2>
              <p className="text-xs text-gray-400 font-medium">Magammana utility distribution</p>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(areaCounts).slice(0, 6).map(([area, count]) => (
              <div key={area} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/70 border border-gray-100 text-xs">
                <div>
                  <span className="font-bold text-[#0B132B] block">{area}</span>
                  <span className="text-[11px] text-gray-400">Zone Distribution</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-[#0066FF] text-sm">{count}</span>
                  <span className="text-[10px] text-gray-400 block">meters</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/consumers"
            className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-[#0066FF] text-gray-700 hover:text-white font-bold text-xs transition-all"
          >
            Manage All {metrics.consumersCount} Consumers
          </Link>
        </div>

      </div>

      {/* Real-time Reconciled Payments Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CreditCard size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#0B132B]">Recent Revenue Settlements &amp; Consumer Payments</h2>
              <p className="text-xs text-gray-400 font-medium">Instantly reconciled upon online consumer payment or field collection</p>
            </div>
          </div>

          <Link
            href="/admin/payments"
            className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
          >
            All Transactions <ArrowRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Transaction ID</th>
                <th className="pb-3">Account</th>
                <th className="pb-3">Resident Name</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {metrics.recentPayments.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-emerald-50/20 transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-[#0B132B]">
                    {p.transaction_id}
                  </td>
                  <td className="py-3.5 font-mono font-bold text-[#0066FF]">
                    #{p.account_number}
                  </td>
                  <td className="py-3.5 font-semibold text-[#0B132B]">
                    {p.account_holder_name}
                  </td>
                  <td className="py-3.5 text-gray-600 font-medium">
                    {p.method}
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700">
                      <CheckCircle2 size={12} /> SETTLED
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-right font-mono font-black text-emerald-600">
                    LKR {Number(p.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
