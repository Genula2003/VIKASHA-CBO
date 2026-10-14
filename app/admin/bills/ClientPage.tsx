'use client'

import { useState, useTransition } from 'react'
import { resendBillEmail, resendBillSms } from './actions'
import { formatDate } from '@/lib/format'
import { FileText, Mail, MessageSquare, Eye, Download, CheckCircle2, AlertCircle, Loader2, Search, Receipt, CreditCard } from 'lucide-react'

export function BillsClientPage({ bills }: { bills: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNPAID' | 'PAID'>('ALL')

  const handleResendEmail = (id: string) => {
    setMessage(null)
    startTransition(async () => {
      const res = await resendBillEmail(id)
      if (res.error) setMessage({text: res.error, type: 'error'})
      else setMessage({text: 'Email notification sent successfully.', type: 'success'})
      setTimeout(() => setMessage(null), 3000)
    })
  }

  const handleResendSms = (id: string) => {
    setMessage(null)
    startTransition(async () => {
      const res = await resendBillSms(id)
      if (res.error) setMessage({text: res.error, type: 'error'})
      else setMessage({text: 'SMS notification sent successfully.', type: 'success'})
      setTimeout(() => setMessage(null), 3000)
    })
  }

  const handleExportCSV = () => {
    const headers = ['Bill Number', 'Account Number', 'Account Holder', 'Address', 'Amount (LKR)', 'Status', 'Date Issued', 'Due Date']
    const rows = (filteredBills || []).map(b => [
      `"${b.bill_number}"`,
      `"${b.consumers?.account_number || ''}"`,
      `"${(b.consumers?.account_holder_name || '').replace(/"/g, '""')}"`,
      `"${(b.consumers?.address || '').replace(/"/g, '""')}"`,
      Number(b.amount || 0).toFixed(2),
      `"${b.status}"`,
      `"${formatDate(b.created_at)}"`,
      `"${formatDate(b.due_date)}"`
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `vikasha_cbo_bills_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredBills = bills?.filter(b => {
    const matchesSearch = 
      b.bill_number?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.consumers?.account_holder_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.consumers?.account_number?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] p-4 md:p-8 -m-4 md:-m-8">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[13px] font-semibold mb-6 shadow-sm">
              <FileText size={14} className="text-cyan-400" />
              Invoice Management
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">All Generated Bills</h1>
            <p className="text-gray-300 font-medium max-w-xl text-[15px]">View billing history, track payment statuses, and manage consumer notifications.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search bills or consumers..." 
                className="block w-full pl-10 rounded-xl bg-white/10 border border-white/20 py-3 text-white placeholder-gray-400 shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm font-medium transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`rounded-xl p-4 border flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircle2 size={20} className="text-emerald-500" /> : <AlertCircle size={20} className="text-red-500" />}
          <p className="text-sm font-bold">{message.text}</p>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066FF]">
               <Receipt size={20} strokeWidth={2.5} />
             </div>
             <div>
               <h2 className="text-xl font-bold text-[#0B132B]">Billing Records</h2>
               <p className="text-xs text-gray-400 font-medium">NWSDB progressive tariff ledger</p>
             </div>
           </div>
           
           <div className="flex flex-wrap items-center gap-2.5">
             {/* Status Filter Buttons */}
             <div className="inline-flex rounded-xl bg-gray-100 p-1 text-xs font-bold text-gray-600">
               <button
                 type="button"
                 onClick={() => setStatusFilter('ALL')}
                 className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'ALL' ? 'bg-white text-[#0B132B] shadow-sm font-black' : 'hover:text-[#0B132B]'}`}
               >
                 All ({bills?.length || 0})
               </button>
               <button
                 type="button"
                 onClick={() => setStatusFilter('UNPAID')}
                 className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'UNPAID' ? 'bg-amber-400 text-gray-900 shadow-sm font-black' : 'hover:text-[#0B132B]'}`}
               >
                 Unpaid Only ({bills?.filter(b => b.status === 'UNPAID').length || 0})
               </button>
               <button
                 type="button"
                 onClick={() => setStatusFilter('PAID')}
                 className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'PAID' ? 'bg-emerald-500 text-white shadow-sm font-black' : 'hover:text-[#0B132B]'}`}
               >
                 Paid Only ({bills?.filter(b => b.status === 'PAID').length || 0})
               </button>
             </div>

             {/* Export CSV Button */}
             <button
               type="button"
               onClick={handleExportCSV}
               className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold text-xs transition-colors shadow-sm"
               title="Export records to CSV / Excel spreadsheet"
             >
               <Download size={14} /> Export CSV
             </button>
           </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="py-4 pl-6 pr-3 text-left text-[12px] font-black text-gray-500 uppercase tracking-wider">Bill Number</th>
                <th className="px-3 py-4 text-left text-[12px] font-black text-gray-500 uppercase tracking-wider">Consumer Details</th>
                <th className="px-3 py-4 text-left text-[12px] font-black text-gray-500 uppercase tracking-wider">Date Issued</th>
                <th className="px-3 py-4 text-left text-[12px] font-black text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-3 py-4 text-left text-[12px] font-black text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 py-4 pr-6 text-right text-[12px] font-black text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredBills && filteredBills.length > 0 ? (
                filteredBills.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="whitespace-nowrap py-4 pl-6 pr-3">
                      <div className="text-sm font-bold text-[#0B132B]">{b.bill_number}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="text-sm font-bold text-gray-700">{b.consumers?.account_holder_name}</div>
                      <div className="text-[13px] font-medium text-gray-500 mt-0.5">{b.consumers?.account_number}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500">
                      {formatDate(b.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="text-sm font-black text-[#0B132B]">Rs {b.amount.toLocaleString()}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${b.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${b.status === 'PAID' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        {b.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={b.pdf_url || '#'} target="_blank" className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:text-[#0066FF] hover:bg-blue-50 transition-colors tooltip-trigger" title="Download PDF">
                          <Download size={16} strokeWidth={2.5} />
                        </a>
                        <a href={`/bill/${b.access_token}`} target="_blank" className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:text-[#0066FF] hover:bg-blue-50 transition-colors tooltip-trigger" title="View Web Bill">
                          <Eye size={16} strokeWidth={2.5} />
                        </a>
                        <button onClick={() => handleResendEmail(b.id)} disabled={isPending} className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors disabled:opacity-50" title="Resend Email">
                          <Mail size={16} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => handleResendSms(b.id)} disabled={isPending} className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50" title="Resend SMS">
                          <MessageSquare size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Receipt size={32} className="mb-3 opacity-50" />
                      <p className="text-sm font-bold">No bills found.</p>
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
