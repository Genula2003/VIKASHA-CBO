'use client'

import { useState, useTransition, useEffect } from 'react'
import {
  type ArrearsDashboardData,
  type ArrearsAccountSummary,
  type ActionStatus,
  type AgingTier
} from '@/lib/services/arrears-service'
import {
  updateAccountActionStatus,
  dispatchRedNoticeSms,
  batchDispatchRedNotices
} from './actions'
import { formatDate } from '@/lib/format'
import {
  AlertTriangle,
  ShieldAlert,
  FileWarning,
  Printer,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  X,
  ExternalLink,
  Send,
  SlidersHorizontal,
  Droplet,
  Users,
  AlertOctagon,
  ArrowUpDown,
  CheckSquare,
  Square,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export function ArrearsClientPage({ initialData }: { initialData: ArrearsDashboardData }) {
  const [data, setData] = useState<ArrearsDashboardData>(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('ALL')
  const [selectedArea, setSelectedArea] = useState<string>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'arrears' | 'days' | 'account'>('arrears')

  // Selection for bulk actions
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

  // Modals
  const [activeRedNoticeAccount, setActiveRedNoticeAccount] = useState<ArrearsAccountSummary | null>(null)
  const [showDisconnectionWarrantModal, setShowDisconnectionWarrantModal] = useState(false)
  const [editingNotesAccount, setEditingNotesAccount] = useState<ArrearsAccountSummary | null>(null)
  const [tempNotes, setTempNotes] = useState('')

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveRedNoticeAccount(null)
        setShowDisconnectionWarrantModal(false)
        setEditingNotesAccount(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Feedback
  const [isPending, startTransition] = useTransition()
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Handle single status update
  const handleStatusChange = (accountNumber: string, newStatus: ActionStatus) => {
    startTransition(async () => {
      const res = await updateAccountActionStatus(accountNumber, newStatus)
      if (res.success) {
        setData(prev => ({
          ...prev,
          accounts: prev.accounts.map(acc =>
            acc.account_number === accountNumber
              ? { ...acc, action_status: newStatus }
              : acc
          )
        }))
        showToast(`Account #${accountNumber} status updated to ${newStatus}`)
      } else {
        showToast('Failed to update status', 'error')
      }
    })
  }

  // Handle saving committee notes
  const handleSaveNotes = () => {
    if (!editingNotesAccount) return
    const accNum = editingNotesAccount.account_number
    startTransition(async () => {
      const res = await updateAccountActionStatus(accNum, editingNotesAccount.action_status, tempNotes)
      if (res.success) {
        setData(prev => ({
          ...prev,
          accounts: prev.accounts.map(acc =>
            acc.account_number === accNum
              ? { ...acc, committee_notes: tempNotes }
              : acc
          )
        }))
        showToast(`Committee notes recorded for Account #${accNum}`)
        setEditingNotesAccount(null)
      }
    })
  }

  // Handle single SMS dispatch
  const handleSendSms = (account: ArrearsAccountSummary) => {
    startTransition(async () => {
      const res = await dispatchRedNoticeSms(account.account_number, account.total_arrears)
      if (res.success) {
        setData(prev => ({
          ...prev,
          accounts: prev.accounts.map(acc =>
            acc.account_number === account.account_number
              ? { ...acc, action_status: 'RED_NOTICE_ISSUED', notice_sent_at: new Date().toISOString() }
              : acc
          )
        }))
        showToast(res.message || `Red Notice SMS dispatched to Account #${account.account_number}`)
      }
    })
  }

  // Handle bulk SMS dispatch
  const handleBulkSms = () => {
    const targets = data.accounts.filter(acc => selectedAccounts.includes(acc.account_number))
    if (targets.length === 0) {
      showToast('Please select at least one account for bulk SMS', 'error')
      return
    }

    startTransition(async () => {
      const payload = targets.map(t => ({ accountNumber: t.account_number, amount: t.total_arrears }))
      const res = await batchDispatchRedNotices(payload)
      showToast(`Bulk SMS sent successfully to ${res.count} consumers!`)
      setSelectedAccounts([])
    })
  }

  // Toggle selection
  const toggleSelectAll = () => {
    if (selectedAccounts.length === filteredAccounts.length) {
      setSelectedAccounts([])
    } else {
      setSelectedAccounts(filteredAccounts.map(a => a.account_number))
    }
  }

  const toggleSelectOne = (accNum: string) => {
    setSelectedAccounts(prev =>
      prev.includes(accNum) ? prev.filter(a => a !== accNum) : [...prev, accNum]
    )
  }

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Account Number',
      'Consumer Name',
      'Service Address',
      'Road Zone',
      'Contact Mobile',
      'Total Arrears (LKR)',
      'Days Overdue',
      'Aging Tier',
      'Unpaid Bills Count',
      'Oldest Due Date',
      'Committee Action Status',
      'Committee Notes'
    ]

    const rows = filteredAccounts.map(a => [
      `"${a.account_number}"`,
      `"${a.account_holder_name.replace(/"/g, '""')}"`,
      `"${a.address.replace(/"/g, '""')}"`,
      `"${a.area.replace(/"/g, '""')}"`,
      `"${a.mobile || ''}"`,
      a.total_arrears.toFixed(2),
      a.days_overdue,
      `"${a.aging_tier}"`,
      a.unpaid_bills_count,
      `"${a.oldest_due_date}"`,
      `"${a.action_status}"`,
      `"${(a.committee_notes || '').replace(/"/g, '""')}"`
    ])

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `vikasha_cbo_arrears_warrant_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filtering & Sorting
  const filteredAccounts = data.accounts.filter(acc => {
    const matchesSearch =
      acc.account_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.account_holder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (acc.mobile && acc.mobile.includes(searchQuery)) ||
      acc.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTier = selectedTier === 'ALL' || acc.aging_tier === selectedTier
    const matchesArea = selectedArea === 'ALL' || acc.area === selectedArea
    const matchesStatus = selectedStatus === 'ALL' || acc.action_status === selectedStatus

    return matchesSearch && matchesTier && matchesArea && matchesStatus
  }).sort((a, b) => {
    if (sortBy === 'arrears') return b.total_arrears - a.total_arrears
    if (sortBy === 'days') return b.days_overdue - a.days_overdue
    return Number(a.account_number) - Number(b.account_number)
  })

  // Calculate filtered arrears sum
  const filteredArrearsTotal = filteredAccounts.reduce((sum, a) => sum + a.total_arrears, 0)

  return (
    <div className="space-y-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] p-4 md:p-8 -m-4 md:-m-8 font-sans selection:bg-[#0066FF] selection:text-white">

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-bottom-5 transition-all ${toastMessage.type === 'success' ? 'bg-[#0B132B] text-white border border-emerald-500/30' : 'bg-red-600 text-white'
          }`}>
          {toastMessage.type === 'success' ? (
            <CheckCircle2 size={18} className="text-emerald-400" />
          ) : (
            <AlertTriangle size={18} className="text-white" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Architectural Executive Header Card: Pure Ceramic with Terracotta Accent */}
      <div className="rounded-2xl bg-[#FFFFFF] p-6 sm:p-8 border border-[#E2E0D8] border-l-4 border-l-[#EA580C] shadow-[0_2px_8px_rgba(10,17,32,0.03)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FFF7ED] text-[#9A3412] text-xs font-semibold border border-[#FED7AA]">
              <AlertOctagon size={13} className="text-[#EA580C]" />
              <span>CBO Executive Committee &bull; Statutory Arrears Recovery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-[#0A1120]">
              Overdue Arrears &amp; Red Notice Manager
            </h1>
            <p className="text-[#475467] font-normal max-w-2xl text-xs sm:text-sm leading-relaxed">
              විකාශා ප්‍රජා මූල සංවිධානය &bull; Monitor unpaid water utility aging cohorts, generate official bilingual 7-day Red Notices, and compile the authorized Field Disconnection Warrant Worksheet.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowDisconnectionWarrantModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <Printer size={14} />
              Disconnection Warrant Sheet
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F0EFEA] text-[#0A1120] font-medium text-xs transition-colors border border-[#D0D5DD] cursor-pointer"
            >
              <Download size={14} />
              Export Minutes CSV
            </button>

            {selectedAccounts.length > 0 && (
              <button
                type="button"
                onClick={handleBulkSms}
                disabled={isPending}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send size={13} />
                Send SMS to {selectedAccounts.length}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {/* Total Overdue */}
        <div className="col-span-2 md:col-span-1 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-black uppercase tracking-wider">Total Arrears</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0B132B] font-mono">
            LKR {data.metrics.totalArrearsAmount.toLocaleString()}
          </div>
          <span className="text-[11px] text-gray-500 font-medium block">
            Across {data.metrics.totalDelinquentAccounts} accounts
          </span>
        </div>

        {/* 90+ Day Disconnection Ready */}
        <div
          onClick={() => setSelectedTier('DISCONNECTION_90')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer ${selectedTier === 'DISCONNECTION_90'
              ? 'bg-red-50 border-red-300 ring-2 ring-red-500'
              : 'bg-white border-gray-100 hover:border-red-200 shadow-sm'
            }`}
        >
          <div className="flex items-center justify-between text-red-600">
            <span className="text-[11px] font-black uppercase tracking-wider">90+ Days &bull; Disconnect</span>
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <ShieldAlert size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-red-700 font-mono mt-2">
            {data.metrics.disconnection90Count}
          </div>
          <span className="text-[11px] text-red-600 font-bold block">
            Warrant Eligible
          </span>
        </div>

        {/* 60+ Day Red Notice */}
        <div
          onClick={() => setSelectedTier('RED_NOTICE_60')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer ${selectedTier === 'RED_NOTICE_60'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500'
              : 'bg-white border-gray-100 hover:border-amber-200 shadow-sm'
            }`}
        >
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] font-black uppercase tracking-wider">60+ Days &bull; Red Notice</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <FileWarning size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700 font-mono mt-2">
            {data.metrics.redNotice60Count}
          </div>
          <span className="text-[11px] text-amber-700 font-bold block">
            7-Day Notice Active
          </span>
        </div>

        {/* 30+ Day 1st Notice */}
        <div
          onClick={() => setSelectedTier('NOTICE_30')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer ${selectedTier === 'NOTICE_30'
              ? 'bg-yellow-50 border-yellow-300 ring-2 ring-yellow-500'
              : 'bg-white border-gray-100 hover:border-yellow-200 shadow-sm'
            }`}
        >
          <div className="flex items-center justify-between text-yellow-700">
            <span className="text-[11px] font-black uppercase tracking-wider">30+ Days &bull; 1st Notice</span>
            <div className="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-yellow-800 font-mono mt-2">
            {data.metrics.notice30Count}
          </div>
          <span className="text-[11px] text-yellow-700 font-bold block">
            SMS Reminder Sent
          </span>
        </div>

        {/* Recovery Rate */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[11px] font-black uppercase tracking-wider">Payment Compliance</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            {data.metrics.collectionRecoveryRate}%
          </div>
          <span className="text-[11px] text-emerald-600 font-medium block">
            243 / 341 Registered Paid
          </span>
        </div>

      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">

        {/* Top Controls: Search + Dropdowns */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by account #, resident name, address, or phone..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#0B132B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Area Filter */}
          <div className="flex items-center gap-3">
            <select
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
              className="px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            >
              <option value="ALL">All Road Zones (9 Areas)</option>
              {data.areaBreakdown.map(a => (
                <option key={a.area} value={a.area}>
                  {a.area} ({a.accountsCount} acc &bull; LKR {a.totalArrears.toLocaleString()})
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            >
              <option value="arrears">Highest Arrears First</option>
              <option value="days">Days Overdue (Oldest First)</option>
              <option value="account">Account # (Ascending)</option>
            </select>
          </div>

        </div>

        {/* Aging Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          {[
            { id: 'ALL', label: 'All Delinquent', count: data.accounts.length },
            { id: 'DISCONNECTION_90', label: '90+ Days &bull; Disconnect', count: data.metrics.disconnection90Count, color: 'text-red-600' },
            { id: 'RED_NOTICE_60', label: '60+ Days &bull; Red Notice', count: data.metrics.redNotice60Count, color: 'text-amber-600' },
            { id: 'NOTICE_30', label: '30+ Days &bull; 1st Notice', count: data.metrics.notice30Count, color: 'text-yellow-600' },
            { id: 'CURRENT', label: 'Current Grace', count: data.metrics.currentGraceCount, color: 'text-blue-600' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTier(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${selectedTier === tab.id
                  ? 'bg-[#0B132B] text-white shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-2 px-1.5 py-0.2 rounded-md bg-white/20 text-[11px]`}>
                {tab.count}
              </span>
            </button>
          ))}

          <div className="ml-auto text-xs font-bold text-gray-500">
            Showing <span className="text-[#0B132B] font-black">{filteredAccounts.length}</span> accounts &bull; Total Filtered Arrears: <span className="text-red-600 font-mono font-black">LKR {filteredArrearsTotal.toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Main Arrears Data Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-black uppercase tracking-wider text-gray-400">
                <th className="py-4 pl-6 pr-3 w-10">
                  <button
                    onClick={toggleSelectAll}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {selectedAccounts.length > 0 && selectedAccounts.length === filteredAccounts.length ? (
                      <CheckSquare size={16} className="text-[#0066FF]" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th className="py-4 px-4">Account &amp; Resident</th>
                <th className="py-4 px-4">Road Zone / Address</th>
                <th className="py-4 px-4 text-center">Days Overdue</th>
                <th className="py-4 px-4 text-center">Unpaid Cycles</th>
                <th className="py-4 px-4 text-right">Total Arrears (LKR)</th>
                <th className="py-4 px-4 text-center">Committee Action</th>
                <th className="py-4 pr-6 pl-4 text-right">Warrant Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 font-bold">
                    No delinquent accounts found matching the specified filters.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map(account => {
                  const isSelected = selectedAccounts.includes(account.account_number)

                  return (
                    <tr
                      key={account.account_number}
                      className={`hover:bg-blue-50/30 transition-colors ${account.aging_tier === 'DISCONNECTION_90' ? 'bg-red-50/20' :
                          account.aging_tier === 'RED_NOTICE_60' ? 'bg-amber-50/20' : ''
                        }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 pl-6 pr-3">
                        <button
                          onClick={() => toggleSelectOne(account.account_number)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {isSelected ? (
                            <CheckSquare size={16} className="text-[#0066FF]" />
                          ) : (
                            <Square size={16} />
                          )}
                        </button>
                      </td>

                      {/* Account & Resident */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-[#0066FF]">
                            #{account.account_number}
                          </span>
                          <span className="text-gray-400">&bull;</span>
                          <span className="font-bold text-[#0B132B]">
                            {account.account_holder_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                          {account.mobile && <span>{account.mobile}</span>}
                          {account.bills[0] && (
                            <Link
                              href={`/bill/${account.bills[0].access_token}`}
                              target="_blank"
                              className="text-blue-500 hover:underline flex items-center gap-0.5"
                            >
                              View E-Bill <ExternalLink size={10} />
                            </Link>
                          )}
                        </div>
                      </td>

                      {/* Road Zone */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#0B132B]">{account.area}</div>
                        <div className="text-[11px] text-gray-400 truncate max-w-[200px]">
                          {account.address}
                        </div>
                      </td>

                      {/* Days Overdue */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${account.aging_tier === 'DISCONNECTION_90'
                              ? 'bg-red-100 text-red-800'
                              : account.aging_tier === 'RED_NOTICE_60'
                                ? 'bg-amber-100 text-amber-900'
                                : account.aging_tier === 'NOTICE_30'
                                  ? 'bg-yellow-100 text-yellow-900'
                                  : 'bg-blue-50 text-blue-800'
                            }`}>
                            {account.days_overdue} Days
                          </span>
                          <span className="text-[10px] text-gray-400 mt-0.5 font-medium">
                            Due {account.oldest_due_date}
                          </span>
                        </div>
                      </td>

                      {/* Unpaid Cycles */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-[#0B132B]">
                          {account.unpaid_bills_count} {account.unpaid_bills_count > 1 ? 'Bills' : 'Bill'}
                        </span>
                      </td>

                      {/* Total Arrears Amount */}
                      <td className="py-4 px-4 text-right">
                        <div className="font-mono font-black text-sm text-[#0B132B]">
                          LKR {account.total_arrears.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </td>

                      {/* Committee Action Status Selector */}
                      <td className="py-4 px-4 text-center">
                        <select
                          value={account.action_status}
                          onChange={e => handleStatusChange(account.account_number, e.target.value as ActionStatus)}
                          className={`text-[11px] font-black px-2.5 py-1.5 rounded-xl border focus:outline-none transition-colors cursor-pointer ${account.action_status === 'DISCONNECTED'
                              ? 'bg-red-600 text-white border-red-700'
                              : account.action_status === 'DISCONNECTION_SCHEDULED'
                                ? 'bg-red-100 text-red-900 border-red-300'
                                : account.action_status === 'RED_NOTICE_ISSUED'
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : account.action_status === 'PAYMENT_AGREEMENT'
                                    ? 'bg-purple-100 text-purple-900 border-purple-300'
                                    : 'bg-gray-100 text-gray-700 border-gray-200'
                            }`}
                        >
                          <option value="PENDING_REVIEW">Pending Review</option>
                          <option value="FIRST_NOTICE_SENT">1st Notice Sent</option>
                          <option value="RED_NOTICE_ISSUED">Red Notice Active</option>
                          <option value="DISCONNECTION_SCHEDULED">Disconnection Scheduled</option>
                          <option value="DISCONNECTED">Valve Disconnected</option>
                          <option value="PAYMENT_AGREEMENT">Installment Plan</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 pr-6 pl-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Official Red Notice Generator Button */}
                          <button
                            onClick={() => setActiveRedNoticeAccount(account)}
                            title="Generate Official Red Notice (රතු නිවේදනය)"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-black text-[11px] border border-red-200 transition-colors cursor-pointer"
                          >
                            <FileWarning size={12} />
                            Red Notice
                          </button>

                          {/* Send SMS Button */}
                          <button
                            onClick={() => handleSendSms(account)}
                            title="Send Red Notice SMS"
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 transition-colors cursor-pointer"
                          >
                            <Send size={12} />
                          </button>

                          {/* Committee Notes Button */}
                          <button
                            onClick={() => {
                              setEditingNotesAccount(account)
                              setTempNotes(account.committee_notes || '')
                            }}
                            title="Add Committee Resolution Notes"
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
                          >
                            <FileText size={12} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: OFFICIAL RED NOTICE GENERATOR (රතු නිවේදනය) */}
      {/* ========================================================================= */}
      {activeRedNoticeAccount && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A1120]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden print:p-0 print:bg-white print:static"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveRedNoticeAccount(null)
          }}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#E2E0D8] overflow-hidden my-auto print:max-h-none print:shadow-none print:border-none print:overflow-visible">

            {/* Modal Controls: ALWAYS PINNED & VISIBLE AT TOP */}
            <div className="bg-[#0A1120] text-white px-5 py-3.5 flex items-center justify-between shrink-0 border-b border-[#1E293B] print:hidden">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#EA580C]/20 border border-[#EA580C]/30 flex items-center justify-center text-[#EA580C]">
                  <FileWarning size={15} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Official Red Notice Generator</span>
                    <span className="text-[#667085]">&bull;</span>
                    <span className="text-[#D0D5DD] font-normal">රතු නිවේදනය</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#98A2B3]">
                    Ref: RN/2026/OCT/{activeRedNoticeAccount.account_number} &bull; Acc #{activeRedNoticeAccount.account_number}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <Printer size={13} /> Print Notice (A4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRedNoticeAccount(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors cursor-pointer"
                  title="Close notice (Esc)"
                >
                  <X size={15} /> Close
                </button>
              </div>
            </div>

            {/* PRINTABLE RED NOTICE DOCUMENT: SCROLLABLE BODY */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 text-[#0A1120] font-sans print:p-0 print:overflow-visible">

              {/* Document Header */}
              <div className="text-center pb-6 border-b-2 border-red-600 space-y-1 relative">
                <div className="inline-block px-3 py-0.5 rounded-full bg-red-100 text-red-900 text-[10px] font-black uppercase tracking-wider mb-1">
                  Department of Community Water Supply &bull; Reg No: CBO/WP/HOM/2014/12
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#0B132B] tracking-tight">
                  විකාශා ප්‍රජා මූල සංවිධානය &bull; මාගම්මන
                </h2>
                <h3 className="text-sm font-black text-gray-700 uppercase tracking-wide">
                  VIKASHA COMMUNITY BASED ORGANISATION &bull; MAGAMMANA WATER SCHEME
                </h3>
                <p className="text-[11px] text-gray-500 font-medium">
                  Magammana, Homagama &bull; Hotline: 011 289 4567 &bull; support@vikashacbo.com
                </p>

                <div className="flex justify-between items-center text-xs font-bold pt-4 text-gray-600 border-t border-gray-100 mt-4">
                  <span>Notice Ref: <strong className="text-[#0B132B]">RN/2026/OCT/{activeRedNoticeAccount.account_number}</strong></span>
                  <span>Date: <strong className="text-[#0B132B]">{new Date().toLocaleDateString('en-GB')}</strong></span>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Consumer Account Number:</span>
                  <span className="font-mono font-black text-sm text-[#0066FF]">#{activeRedNoticeAccount.account_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Account Holder:</span>
                  <span className="font-black text-[#0B132B]">{activeRedNoticeAccount.account_holder_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Service Address:</span>
                  <span className="font-medium text-gray-800 text-right">{activeRedNoticeAccount.address}</span>
                </div>
              </div>

              {/* Red Notice Banner Title */}
              <div className="bg-red-600 text-white p-3.5 rounded-2xl text-center space-y-0.5 shadow-md">
                <h4 className="text-base font-black tracking-wide">
                  අවසන් රතු නිවේදනය සහ ජල සැපයුම විසන්ධි කිරීමේ පූර්ව දැනුම්දීම
                </h4>
                <p className="text-[11px] font-bold text-red-100 uppercase tracking-wider">
                  FINAL RED NOTICE &bull; IMMINENT SERVICE DISCONNECTION WARNING
                </p>
              </div>

              {/* Legal Warning Notice Text */}
              <div className="text-xs text-gray-700 leading-relaxed space-y-3">
                <p>
                  ඔබගේ ඉහත අංකය දරන ජල සබඳතාව සඳහා මාසික ජල බිල්පත් ගෙවීම පැහැර හැර ඇති අතර, ඔබ විසින් විකාශා ප්‍රජා මූල සංවිධානය වෙත ගෙවිය යුතු සම්පූර්ණ හිඟ මුදල පහත පරිදි වේ:
                </p>
                <p className="text-gray-500 text-[11px]">
                  Please be informed that your water utility account has fallen into serious overdue arrears. The total outstanding balance due to Vikasha CBO is outlined below:
                </p>
              </div>

              {/* Outstanding Breakdown Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-600 font-bold">
                    <tr>
                      <th className="p-2.5">Invoice #</th>
                      <th className="p-2.5">Billing Period</th>
                      <th className="p-2.5">Due Date</th>
                      <th className="p-2.5 text-right">Amount (LKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activeRedNoticeAccount.bills.map(b => (
                      <tr key={b.id}>
                        <td className="p-2.5 font-mono font-bold text-[#0B132B]">{b.bill_number}</td>
                        <td className="p-2.5 text-gray-600">{b.billing_period}</td>
                        <td className="p-2.5 text-red-600 font-bold">{b.due_date}</td>
                        <td className="p-2.5 text-right font-mono font-bold">
                          {b.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-red-50/80 font-black text-red-900">
                      <td colSpan={3} className="p-3 text-right text-xs uppercase tracking-wider">
                        මුළු හිඟ මුදල / Total Outstanding Arrears:
                      </td>
                      <td className="p-3 text-right font-mono text-base text-red-600">
                        LKR {activeRedNoticeAccount.total_arrears.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Terms of Disconnection */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="font-black text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle size={15} className="text-amber-600" />
                  වැදගත් නියෝගය &bull; Mandatory Compliance Notice:
                </div>
                <ul className="list-disc pl-5 space-y-1 font-medium leading-relaxed">
                  <li>
                    මෙම නිවේදනය ලැබී <strong>දින 7 ක් ඇතුළත</strong> සම්පූර්ණ හිඟ මුදල නොගෙවුවහොත්, කිසිදු පූර්ව දැනුම්දීමකින් තොරව ඔබගේ ජල සබඳතාව ක්ෂේත්‍ර නල කාර්මික නිලධාරීන් විසින් <strong>භෞතිකව විසන්ධි කරනු ලැබේ</strong>.
                  </li>
                  <li>
                    යළි සම්බන්ධතාවය ලබාගැනීම සඳහා හිඟ මුදලට අමතරව <strong>රු. 1,500/= ක යළි සම්බන්ධතා ගාස්තුවක් (Reconnection Fee)</strong> ගෙවිය යුතුය.
                  </li>
                  <li>
                    විසන්ධි කල මුද්‍රාව කැඩීම හෝ අනවසරයෙන් ජලය ලබාගැනීම ජාතික ජල සම්පාදන හා ජලාපවහන මණ්ඩල පනත යටතේ දඬුවම් ලැබිය හැකි වරදකි.
                  </li>
                </ul>
              </div>

              {/* Payment Methods */}
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>ගෙවීම් ක්‍රම / How to Settle:</strong></p>
                <p>1. Instant Online Pay: <strong className="text-[#0066FF]">vikashacbo.com/pay</strong> (Type Account #{activeRedNoticeAccount.account_number})</p>
                <p>2. CBO Office Counter: මාගම්මන ප්‍රජා මූල සංවිධාන කාර්යාලය (පෙ.ව. 8.00 - ප.ව. 4.30)</p>
              </div>

              {/* Signatures */}
              <div className="pt-8 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="h-10 border-b border-gray-300 mx-4" />
                  <p className="font-bold text-[#0B132B] mt-2">භාණ්ඩාගාරික</p>
                  <p className="text-[10px] text-gray-400">Treasurer</p>
                </div>
                <div>
                  <div className="h-10 border-b border-gray-300 mx-4" />
                  <p className="font-bold text-[#0B132B] mt-2">ලේකම්</p>
                  <p className="text-[10px] text-gray-400">Secretary</p>
                </div>
                <div>
                  <div className="h-10 border-b border-gray-300 mx-4" />
                  <p className="font-bold text-[#0B132B] mt-2">සභාපති</p>
                  <p className="text-[10px] text-gray-400">President</p>
                </div>
              </div>

            </div>

            {/* Modal Sticky Footer Bar (Hidden in Print) */}
            <div className="bg-[#F7F7F4] px-6 py-3 border-t border-[#E2E0D8] flex items-center justify-between shrink-0 print:hidden">
              <span className="text-[11px] text-[#667085] font-mono">
                Press [ESC] or click outside to close
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <Printer size={13} /> Print Notice (A4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRedNoticeAccount(null)}
                  className="px-3 py-1.5 rounded-lg border border-[#D0D5DD] bg-white hover:bg-[#F0EFEA] text-[#0A1120] text-xs font-medium transition-colors cursor-pointer"
                >
                  Close Notice
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: FIELD DISCONNECTION EXECUTION WORKSHEET */}
      {/* ========================================================================= */}
      {showDisconnectionWarrantModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A1120]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden print:p-0 print:bg-white print:static"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDisconnectionWarrantModal(false)
          }}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#E2E0D8] overflow-hidden my-auto print:max-h-none print:shadow-none print:border-none print:overflow-visible">

            {/* Header: PINNED AT TOP & ALWAYS VISIBLE */}
            <div className="bg-[#0A1120] text-white px-5 py-3.5 flex items-center justify-between shrink-0 border-b border-[#1E293B] print:hidden">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#EA580C]/20 border border-[#EA580C]/30 flex items-center justify-center text-[#EA580C]">
                  <Printer size={15} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    Field Disconnection Execution Worksheet &bull; විසන්ධි කිරීමේ නාමාවලිය
                  </div>
                  <span className="text-[10px] font-mono text-[#98A2B3]">
                    Authorized by CBO Executive Committee &bull; Target Disconnection Worksheet
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <Printer size={13} /> Print Field Worksheet
                </button>
                <button
                  type="button"
                  onClick={() => setShowDisconnectionWarrantModal(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors cursor-pointer"
                  title="Close worksheet (Esc)"
                >
                  <X size={15} /> Close
                </button>
              </div>
            </div>

            {/* PRINTABLE WORKSHEET: SCROLLABLE BODY */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 text-[#0A1120] font-sans print:p-0 print:overflow-visible">

              <div className="text-center pb-4 border-b-2 border-red-600 space-y-1">
                <h2 className="text-xl font-black text-[#0B132B]">
                  විකාශා ප්‍රජා මූල සංවිධානය &bull; මාගම්මන පානීය ජල යෝජනා ක්‍රමය
                </h2>
                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest">
                  FIELD DISCONNECTION WARRANT &bull; MAINTENANCE CREW EXECUTION LOG
                </h3>
                <p className="text-[11px] text-gray-500 font-medium">
                  Authorized by CBO Executive Committee Resolution &bull; Date: {new Date().toLocaleDateString('en-GB')}
                </p>
              </div>

              <div className="text-xs text-gray-600 flex justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <span>Authorized Officer: <strong>Maintenance &amp; Technical Unit</strong></span>
                <span>Target Execution Date: <strong>{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</strong></span>
                <span>Eligible Accounts: <strong>{data.metrics.disconnection90Count + data.metrics.redNotice60Count} Accounts</strong></span>
              </div>

              {/* Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden text-[11px]">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-700 font-black">
                    <tr>
                      <th className="p-2.5">Acc #</th>
                      <th className="p-2.5">Resident &amp; Zone</th>
                      <th className="p-2.5">Arrears (LKR)</th>
                      <th className="p-2.5">Days</th>
                      <th className="p-2.5 text-center">Field Action Check</th>
                      <th className="p-2.5">Meter Dial</th>
                      <th className="p-2.5">Officer Sign</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.accounts
                      .filter(a => a.aging_tier === 'DISCONNECTION_90' || a.aging_tier === 'RED_NOTICE_60')
                      .map((acc, i) => (
                        <tr key={acc.account_number} className="hover:bg-gray-50">
                          <td className="p-2.5 font-mono font-black text-[#0066FF]">
                            #{acc.account_number}
                          </td>
                          <td className="p-2.5">
                            <div className="font-bold text-[#0B132B]">{acc.account_holder_name}</div>
                            <div className="text-[10px] text-gray-500">{acc.area}</div>
                          </td>
                          <td className="p-2.5 font-mono font-bold text-red-600">
                            {acc.total_arrears.toLocaleString()}
                          </td>
                          <td className="p-2.5 font-bold">{acc.days_overdue}d</td>
                          <td className="p-2.5 text-center text-[10px] space-y-0.5">
                            <span className="inline-block border border-gray-400 w-3 h-3 rounded-sm mr-1 align-middle" /> Locked
                            <span className="inline-block border border-gray-400 w-3 h-3 rounded-sm ml-2 mr-1 align-middle" /> Paid
                          </td>
                          <td className="p-2.5 border-b border-gray-200">
                            <span className="text-gray-300">__________</span>
                          </td>
                          <td className="p-2.5 border-b border-gray-200">
                            <span className="text-gray-300">__________</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Instructions */}
              <div className="p-3 rounded-xl bg-gray-50 text-[11px] text-gray-500 border border-gray-200 leading-relaxed">
                <p><strong>Field Officer Instructions:</strong> Affix official numbered plastic seal to curb-stop stopcock valve. If resident presents bank deposit slip or settles immediately online, verify transaction ID before suspending physical disconnection.</p>
              </div>

              {/* Officer Signatures */}
              <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="h-8 border-b border-gray-300 mx-8" />
                  <p className="font-bold text-[#0B132B] mt-1">Field Officer in Charge</p>
                </div>
                <div>
                  <div className="h-8 border-b border-gray-300 mx-8" />
                  <p className="font-bold text-[#0B132B] mt-1">Maintenance Committee Chairman</p>
                </div>
              </div>

            </div>

            {/* Sticky Action Footer: ALWAYS VISIBLE */}
            <div className="bg-[#F7F7F4] border-t border-[#E2E0D8] px-6 py-3.5 flex items-center justify-between shrink-0 print:hidden">
              <span className="text-xs text-[#667085]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D0D5DD] text-[10px] font-mono text-[#0A1120]">Esc</kbd> or click outside to dismiss
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer size={13} /> Print Field Worksheet
                </button>
                <button
                  type="button"
                  onClick={() => setShowDisconnectionWarrantModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#D0D5DD] bg-white hover:bg-[#F0EFEA] text-[#0A1120] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Close Worksheet
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: COMMITTEE NOTES RECORDER */}
      {/* ========================================================================= */}
      {editingNotesAccount && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A1120]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingNotesAccount(null)
          }}
        >
          <div className="bg-[#FFFFFF] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E0D8] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E0D8]">
              <div>
                <h3 className="text-sm font-semibold text-[#0A1120]">Committee Resolution Notes</h3>
                <p className="text-xs text-[#667085]">Account #{editingNotesAccount.account_number} &bull; {editingNotesAccount.account_holder_name}</p>
              </div>
              <button 
                type="button"
                onClick={() => setEditingNotesAccount(null)}
                className="p-1 rounded-lg text-[#667085] hover:text-[#0A1120]"
              >
                <X size={16} />
              </button>
            </div>

            <textarea
              value={tempNotes}
              onChange={e => setTempNotes(e.target.value)}
              rows={4}
              placeholder="e.g. Resident visited CBO office on Oct 10, agreed to settle in 2 installments before Oct 25..."
              className="w-full p-3 bg-white border border-[#D0D5DD] rounded-xl text-xs font-medium text-[#0A1120] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:ring-2 focus:ring-[#004EEB]/15"
            />

            <div className="flex justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setEditingNotesAccount(null)}
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#475467] hover:bg-[#F0EFEA] border border-[#D0D5DD]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white text-xs font-medium transition-colors"
              >
                {isPending ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
