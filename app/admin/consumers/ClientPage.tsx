'use client'

import { useState, useTransition, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { addConsumer } from './actions'
import Link from 'next/link'
import { 
  Users, 
  UserPlus, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Hash, 
  Droplet, 
  Loader2, 
  Search, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react'

const consumerSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email().optional().or(z.literal('')),
  mobile: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  initialReading: z.coerce.number().min(0).optional(),
  initialReadingDate: z.string().optional()
})

type ConsumerFormValues = z.infer<typeof consumerSchema>

export function ConsumersClientPage({ consumers }: { consumers: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  
  const [search, setSearch] = useState('')
  const [areaFilter, setAreaFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const pageSize = 12
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ConsumerFormValues>({
    resolver: zodResolver(consumerSchema) as any
  })

  const onSubmit = (data: ConsumerFormValues) => {
    setError(null)
    setSuccess(false)
    startTransition(async () => {
      const result = await addConsumer(data)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  // Extract distinct areas
  const areas = useMemo(() => {
    const set = new Set<string>()
    consumers.forEach(c => {
      if (c.area) set.add(c.area)
      else if (c.address && c.address.includes('(')) {
        const match = c.address.match(/\((.*?)\)/)
        if (match) set.add(match[1])
      }
    })
    return Array.from(set)
  }, [consumers])

  // Filtered consumers
  const filtered = useMemo(() => {
    return consumers.filter(c => {
      const q = search.toLowerCase().trim()
      const matchesSearch = !q || 
        c.account_number?.toLowerCase().includes(q) || 
        c.account_holder_name?.toLowerCase().includes(q) ||
        c.address?.toLowerCase().includes(q)
      
      const matchesArea = areaFilter === 'ALL' || 
        c.area === areaFilter || 
        (c.address && c.address.includes(areaFilter))

      return matchesSearch && matchesArea
    })
  }, [consumers, search, areaFilter])

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paginatedConsumers = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[12px] font-semibold mb-4 shadow-sm">
              <Users size={14} className="text-cyan-400" />
              Community Consumer Registry
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Water Connection Directory
            </h1>
            <p className="text-gray-300 font-medium max-w-xl text-sm leading-relaxed">
              Register new municipal connections, manage existing accounts, and monitor meter installations across Magammana.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-6">
            <div>
              <div className="text-[11px] font-bold text-gray-300 uppercase">Total Connections</div>
              <div className="text-2xl font-black text-white">{consumers.length}</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-[11px] font-bold text-gray-300 uppercase">Zones Mapped</div>
              <div className="text-2xl font-black text-cyan-300">{areas.length || 9}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
        
        {/* Left Column: Register Connection Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 h-fit space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066FF]">
              <UserPlus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#0B132B]">New Consumer Connection</h2>
              <p className="text-xs text-gray-400 font-medium">Issue water account &amp; baseline meter</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Account Number *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Hash size={15} />
                </div>
                <input 
                  {...register('accountNumber')} 
                  className="block w-full pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all" 
                  placeholder="e.g. 521 or ACC-0521" 
                />
              </div>
              {errors.accountNumber && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.accountNumber.message}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Resident / Entity Name *</label>
              <input 
                {...register('name')} 
                className="block w-full px-3.5 rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all" 
                placeholder="MR / MRS Full Name" 
              />
              {errors.name && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Mobile</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone size={13} />
                  </div>
                  <input 
                    {...register('mobile')} 
                    className="block w-full pl-8 pr-2 rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all" 
                    placeholder="077xxxxxxx" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={13} />
                  </div>
                  <input 
                    {...register('email')} 
                    type="email" 
                    className="block w-full pl-8 pr-2 rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all" 
                    placeholder="Optional" 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Service Address</label>
              <div className="relative">
                <div className="absolute top-2.5 left-0 pl-3 flex pointer-events-none text-gray-400">
                  <MapPin size={15} />
                </div>
                <textarea 
                  {...register('address')} 
                  rows={2} 
                  className="block w-full pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50/60 py-2 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all resize-none" 
                  placeholder="Street address, zone, Magammana" 
                />
              </div>
            </div>

            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-3">
              <span className="text-[11px] font-black text-[#0066FF] uppercase tracking-wider flex items-center gap-1.5">
                <Droplet size={13} /> Baseline Meter Setup
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Initial Reading</label>
                  <input 
                    {...register('initialReading')} 
                    type="number" 
                    defaultValue={0}
                    className="block w-full px-3 rounded-lg border border-gray-200 bg-white py-1.5 text-xs font-mono font-bold text-[#0B132B]" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Date</label>
                  <input 
                    {...register('initialReadingDate')} 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="block w-full px-2 rounded-lg border border-gray-200 bg-white py-1.5 text-[11px] font-bold text-[#0B132B]" 
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-3 border border-red-100 text-red-600 text-xs font-bold text-center">
                {error}
              </div>
            )}
            
            {success && (
              <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100 text-emerald-700 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 size={15} /> Connection added successfully!
              </div>
            )}

            <button 
              type="submit" 
              disabled={isPending} 
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0088FF] py-3 text-xs font-black text-white shadow-md hover:from-blue-600 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              {isPending ? (
                <><Loader2 size={16} className="animate-spin" /> Saving Connection...</>
              ) : (
                'Register Municipal Consumer'
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Searchable Consumer Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-black text-[#0B132B]">Registered Consumers</h2>
              <p className="text-xs text-gray-400 font-medium">Showing {filtered.length} matching connections</p>
            </div>

            {/* Filter by Zone */}
            {areas.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-bold">
                <Filter size={13} className="text-gray-400" />
                <select
                  value={areaFilter}
                  onChange={(e) => {
                    setAreaFilter(e.target.value)
                    setPage(1)
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-700 focus:outline-none"
                >
                  <option value="ALL">All Zones ({consumers.length})</option>
                  {areas.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search by Account No (e.g. 135, 129), Name, or Road..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF] transition-all"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-100 text-left text-xs">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="py-3.5 pl-5 pr-3 font-bold text-gray-400 uppercase tracking-wider">Account No</th>
                  <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Holder Name</th>
                  <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Address / Zone</th>
                  <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-3 py-3.5 pr-5 text-right font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {paginatedConsumers.length > 0 ? (
                  paginatedConsumers.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3.5 pl-5 pr-3 font-mono font-bold text-[#0066FF] whitespace-nowrap">
                        #{c.account_number}
                      </td>
                      <td className="px-3 py-3.5 font-bold text-[#0B132B]">
                        {c.account_holder_name}
                      </td>
                      <td className="px-3 py-3.5 text-gray-600 font-medium max-w-xs truncate">
                        {c.address || c.area || 'Magammana'}
                      </td>
                      <td className="px-3 py-3.5 font-mono text-gray-500 whitespace-nowrap">
                        {c.mobile || '-'}
                      </td>
                      <td className="px-3 py-3.5 pr-5 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          ACTIVE
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      No consumers match your search query &quot;{search}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs font-semibold text-gray-500">
              <div>
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
