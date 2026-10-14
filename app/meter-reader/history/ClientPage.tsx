'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/format'
import { 
  ClipboardList, 
  Search, 
  FileText, 
  Activity, 
  TrendingUp, 
  Droplet, 
  ArrowRight, 
  Receipt, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react'

interface ReadingItem {
  id: string
  reading_date: string
  previous_reading: number
  current_reading: number
  units_consumed: number
  status: string
  created_at: string
  consumers?: {
    account_number: string
    account_holder_name: string
    address?: string
  }
  bills?: Array<{
    bill_number: string
    amount: number
    status: string
    access_token: string
  }>
}

export function MeterReaderHistoryClient({ 
  initialReadings, 
  readerId 
}: { 
  initialReadings: ReadingItem[]
  readerId: string 
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VALID' | 'PENDING'>('ALL')

  const todayStr = new Date().toISOString().split('T')[0]

  // Filtered readings
  const filtered = initialReadings.filter(r => {
    const acc = r.consumers?.account_number?.toLowerCase() || ''
    const name = r.consumers?.account_holder_name?.toLowerCase() || ''
    const addr = r.consumers?.address?.toLowerCase() || ''
    const q = search.toLowerCase().trim()

    const matchesSearch = !q || acc.includes(q) || name.includes(q) || addr.includes(q)
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Summary stats
  const totalReadings = initialReadings.length
  const todayReadings = initialReadings.filter(r => r.reading_date === todayStr || (r.created_at && r.created_at.startsWith(todayStr))).length
  const totalUnits = initialReadings.reduce((sum, r) => sum + (r.units_consumed || 0), 0)
  const totalRevenue = initialReadings.reduce((sum, r) => {
    const bill = r.bills && r.bills[0]
    return sum + (bill ? Number(bill.amount) : 0)
  }, 0)

  return (
    <div className="space-y-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] p-4 md:p-8 -m-4 md:-m-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[13px] font-semibold mb-4 shadow-sm">
              <ClipboardList size={14} className="text-cyan-400" />
              Field Activity Audit Log
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
              My Reading History
            </h1>
            <p className="text-gray-300 font-medium max-w-xl text-sm">
              Review all water meter readings recorded in the field, verified units, and corresponding invoices generated.
            </p>
          </div>

          <Link
            href="/meter-reader/enter-reading"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#0066FF] to-[#0088FF] text-white rounded-2xl font-bold text-sm shadow-md hover:from-blue-600 hover:to-blue-500 transition-all hover:-translate-y-0.5 shrink-0"
          >
            <Plus size={18} />
            Record New Reading
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Readings</span>
            <Activity size={18} className="text-[#0066FF]" />
          </div>
          <div className="text-3xl font-black text-[#0B132B]">{totalReadings}</div>
          <p className="text-xs text-gray-500 font-medium">Logged in current ledger</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today&apos;s Records</span>
            <Clock size={18} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{todayReadings}</div>
          <p className="text-xs text-gray-500 font-medium">Recorded today</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Units</span>
            <Droplet size={18} className="text-cyan-500" />
          </div>
          <div className="text-3xl font-black text-[#0B132B]">{totalUnits.toLocaleString()}</div>
          <p className="text-xs text-gray-500 font-medium">Cubic meters consumed</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Invoiced Total</span>
            <TrendingUp size={18} className="text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-[#0B132B]">
            LKR {totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-xs text-gray-500 font-medium">Generated billing value</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Account No, Resident Name, or Road..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold">
            <span className="text-gray-400 mr-1">Status:</span>
            {(['ALL', 'VALID', 'PENDING'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === status
                    ? 'bg-[#0B132B] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Readings Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-left text-xs">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="py-3.5 pl-6 pr-3 font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Account / Resident</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Previous</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Current Reading</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Units Consumed</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Invoice Generated</th>
                <th className="px-3 py-3.5 pr-6 text-right font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const bill = item.bills && item.bills[0]
                  return (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 pl-6 pr-3 font-medium text-gray-500 whitespace-nowrap">
                        {formatDate(item.reading_date || item.created_at)}
                      </td>
                      <td className="px-3 py-4">
                        <div className="font-bold text-[#0B132B]">
                          {item.consumers?.account_holder_name || 'Community Resident'}
                        </div>
                        <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                          <span className="text-[#0066FF] font-bold">Acc #{item.consumers?.account_number}</span>
                          {item.consumers?.address && (
                            <span className="truncate max-w-[200px] text-gray-500">&bull; {item.consumers?.address}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-4 font-mono font-medium text-gray-500">
                        {item.previous_reading}
                      </td>
                      <td className="px-3 py-4 font-mono font-bold text-[#0B132B]">
                        {item.current_reading}
                      </td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-[#0066FF] font-black font-mono">
                          <Droplet size={12} />
                          {item.units_consumed} Units
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        {bill ? (
                          <div>
                            <div className="font-mono font-bold text-xs text-gray-800">
                              #{bill.bill_number}
                            </div>
                            <div className="text-[11px] font-black text-emerald-600 mt-0.5">
                              LKR {Number(bill.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-medium">Pending Batch</span>
                        )}
                      </td>
                      <td className="px-3 py-4 pr-6 text-right whitespace-nowrap">
                        {bill?.access_token ? (
                          <Link
                            href={`/bill/${bill.access_token}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#0066FF] text-gray-700 hover:text-white font-bold transition-all text-xs"
                          >
                            <Receipt size={13} />
                            View Bill
                          </Link>
                        ) : (
                          <span className="text-gray-400 text-xs">Logged</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto text-gray-400">
                        <FileText size={24} />
                      </div>
                      <p className="font-bold text-gray-700 text-sm">No readings found</p>
                      <p className="text-xs text-gray-400">
                        {search 
                          ? 'No reading records match your search criteria. Try a different query.' 
                          : 'You have not recorded any field readings yet.'}
                      </p>
                      <Link
                        href="/meter-reader/enter-reading"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-600 transition-colors"
                      >
                        <Plus size={14} /> Enter Reading Now
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
