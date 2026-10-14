'use client'

import { useState, useTransition, useEffect, useRef, useCallback } from 'react'
import { lookupConsumerBill, payConsumerBillDirect } from './actions'
import { formatDate } from '@/lib/format'
import Link from 'next/link'
import { 
  Droplet, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  ShieldCheck, 
  Receipt,
  User,
  ArrowRight,
  Check,
  X,
  Lock,
  RefreshCw,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ConsumerPayPortalPage() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isPaying, startPayTransition] = useTransition()
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)
  
  // Step 2 state: Has the user verified "Yes, this is my account"?
  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  
  // Payment state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Online Card (Visa/Mastercard)')
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<any>(null)

  // Fast in-memory cache for 0ms repeated searches
  const memoryCache = useRef<Map<string, any>>(new Map())
  const inputRef = useRef<HTMLInputElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Core search function
  const executeSearch = useCallback((rawQuery: string) => {
    const q = rawQuery.trim()
    if (!q) {
      setResult(null)
      setError(null)
      setIsAccountConfirmed(false)
      setPaymentSuccessReceipt(null)
      return
    }

    // Security check: Reject invalid character sequences early on client
    if (/[<>'";`\\={}]/.test(q)) {
      setError('Invalid characters in account number. Please use alphanumeric characters.')
      return
    }

    setError(null)
    setIsAccountConfirmed(false)
    setPaymentSuccessReceipt(null)

    startTransition(async () => {
      const res = await lookupConsumerBill(q)
      if (res.error) {
        setError(res.error)
        setResult(null)
      } else {
        setResult(res)
        setError(null)
      }
    })
  }, [])

  // Debounced auto-search when user types account number
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setInfoMessage(null)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    const trimmed = val.trim()
    if (trimmed.length >= 1) {
      // 300ms debounce for lightning fast typing experience
      searchTimeoutRef.current = setTimeout(() => {
        executeSearch(trimmed)
      }, 300)
    } else if (trimmed.length === 0) {
      setResult(null)
      setError(null)
      setIsAccountConfirmed(false)
    }
  }

  // Quick fill handler
  const handleQuickFill = (acc: string) => {
    setQuery(acc)
    setInfoMessage(null)
    executeSearch(acc)
  }

  // "No, this is not my account" handler
  const handleRejectAccount = () => {
    setIsAccountConfirmed(false)
    setResult(null)
    setQuery('')
    setError(null)
    setPaymentSuccessReceipt(null)
    setInfoMessage('Account selection cleared. Please enter your water account number.')
    
    // Auto-focus input
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  // "Yes, this is my account" handler
  const handleConfirmAccount = () => {
    setIsAccountConfirmed(true)
    setInfoMessage(null)
  }

  // Direct Pay button action
  const handleDirectPayment = () => {
    if (!result?.bill?.access_token) return

    startPayTransition(async () => {
      const res = await payConsumerBillDirect(result.bill.access_token, selectedPaymentMethod)
      if (res.error) {
        setError(res.error)
      } else if (res.receipt) {
        setPaymentSuccessReceipt(res.receipt)
        if (result?.bill) {
          result.bill.status = 'PAID'
        }
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0A1120] flex flex-col justify-between selection:bg-[#004EEB] selection:text-white font-sans">
      {/* Top Official Masthead */}
      <div className="h-9 bg-[#0A1120] text-white text-[11px] font-medium border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg 
              className="w-3.5 h-3.5 text-stone-300 shrink-0" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-[#E2E0D8] font-normal tracking-wide">
              Department of Community Water Supply &bull; Official Consumer Settlement Portal
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#D0D5DD]">
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Phone size={11} className="text-[#98A2B3]" /> 011 289 4567
            </span>
            <span className="text-[#344054]">&bull;</span>
            <a href="mailto:support@vikashacbo.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Mail size={11} className="text-[#98A2B3]" /> support@vikashacbo.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="h-20 bg-[#F7F7F4]/90 backdrop-blur-md border-b border-[#E2E0D8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#0A1120] text-white flex items-center justify-center shrink-0 border border-[#0A1120] group-hover:bg-[#004EEB] transition-colors">
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                <path d="M12 11a3 3 0 0 0-3 3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-bold text-[#0A1120] tracking-tight leading-none">Vikasha CBO</span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F0EFEA] text-[#475467] border border-[#E2E0D8] uppercase">
                  QUICK PAY
                </span>
              </div>
              <p className="text-[12px] font-medium text-[#475467] mt-1 leading-none">
                මාගම්මන ප්‍රජා ජල සම්පාදන ව්‍යාපෘතිය
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-xs font-semibold px-4 py-2 rounded-lg border border-[#D0D5DD] text-[#0A1120] hover:bg-[#F0EFEA] transition-colors bg-white"
            >
              Staff Portal
            </Link>
            <Link 
              href="/" 
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#0A1120] text-white hover:bg-[#1E293B] transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 md:py-14">
        
        {/* Banner Section */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-md bg-[#EFECE6] border border-[#E2E0D8] px-3 py-1 text-xs font-medium text-[#0A1120] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            <span>Instant &bull; 256-Bit SSL Municipal Payment Gateway</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-[#0A1120]">
            Search &amp; Confirm Your Water Account
          </h1>
          <p className="text-[#475467] max-w-xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Type your water account number to instantly verify registered ownership, review itemized charges, and settle your bill in seconds.
          </p>
        </div>

        {/* Search Card: Pure Ceramic White with 1px border */}
        <div className="p-1.5 bg-[#EFECE6]/70 rounded-2xl border border-[#E2E0D8] mb-8">
          <div className="bg-[#FFFFFF] rounded-xl border border-[#D0D5DD] p-6 sm:p-7 shadow-[0_2px_8px_rgba(10,17,32,0.04)] space-y-4">
            
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                executeSearch(query)
              }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#98A2B3]">
                  {isPending ? (
                    <RefreshCw size={16} className="animate-spin text-[#004EEB]" />
                  ) : (
                    <Search size={16} />
                  )}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Type Account Number (e.g. 135, 129, 363, 207)"
                  className="w-full h-12 pl-11 pr-10 bg-white border border-[#D0D5DD] rounded-lg text-sm font-semibold text-[#0A1120] placeholder-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:ring-2 focus:ring-[#004EEB]/15 transition-all font-mono"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setResult(null)
                      setError(null)
                      setIsAccountConfirmed(false)
                      inputRef.current?.focus()
                    }}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#98A2B3] hover:text-[#475467]"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className="h-12 px-6 bg-[#004EEB] hover:bg-[#003CC7] text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {isPending ? 'Verifying...' : 'Verify Account'}
                {!isPending && <ArrowRight size={15} />}
              </button>
            </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-4 pt-4 border-t border-[#E2E0D8] flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-[#667085] uppercase tracking-wider mr-1">
              Sample Ledger Accounts:
            </span>
            {[
              { id: '135', label: 'Acc 135 (Prasanna Kothalawela)' },
              { id: '129', label: 'Acc 129 (Yapa Rathnadheera)' },
              { id: '363', label: 'Acc 363 (Jayathunga)' },
              { id: '372', label: 'Acc 372 (Piyal Medagedara)' },
              { id: '207', label: 'Acc 207 (Araliya Uyana)' }
            ].map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleQuickFill(sample.id)}
                className="text-xs px-2.5 py-1 rounded bg-[#F7F7F4] hover:bg-[#F0EFEA] text-[#0A1120] font-medium transition-colors border border-[#E2E0D8]"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

        {/* Informational Message */}
        {infoMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[#F0EFEA] border border-[#E2E0D8] p-4 mb-6 flex items-center justify-between gap-3 text-[#0A1120]"
          >
            <div className="flex items-center gap-2.5 text-xs font-medium">
              <Sparkles size={15} className="text-[#004EEB] shrink-0" />
              <span>{infoMessage}</span>
            </div>
            <button onClick={() => setInfoMessage(null)} className="text-[#667085] hover:text-[#0A1120]">
              <X size={14} />
            </button>
          </motion.div>
        )}

        {/* Error Notification - Terracotta Ochre Alert Token */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[#FFF7ED] border border-[#FED7AA] border-l-4 border-l-[#EA580C] p-4 mb-8 flex items-start gap-3 text-[#9A3412]"
          >
            <AlertCircle size={18} className="shrink-0 text-[#EA580C] mt-0.5" />
            <div className="text-sm font-medium">{error}</div>
          </motion.div>
        )}

        {/* STEP 1 & 2: VERIFICATION & BILL PAYMENT FLOW */}
        <AnimatePresence mode="wait">
          {result && result.consumer && (
            <motion.div
              key="account-found-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              {/* Account Identity Card: Pure Ceramic White */}
              <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E2E0D8] shadow-[0_2px_8px_rgba(10,17,32,0.03)] relative">
                
                {/* Top Badge Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-[#E2E0D8]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F0EFEA] text-[#0A1120] text-xs font-semibold border border-[#E2E0D8]">
                    <User size={13} className="text-[#004EEB]" />
                    <span>Account Identified &bull; Confirm Ownership</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#667085]">
                    <Lock size={12} className="text-[#065F46]" />
                    <span>256-Bit Encrypted Public Ledger</span>
                  </div>
                </div>

                {/* Account Details */}
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block mb-1">
                      Account Holder Name
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A1120] tracking-tight">
                      {result.consumer.account_holder_name}
                    </h2>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-medium text-[#667085]">Water Account:</span>
                      <span className="text-sm font-mono font-bold text-[#0A1120] bg-[#F7F7F4] px-2.5 py-0.5 rounded border border-[#E2E0D8]">
                        #{result.consumer.account_number}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#F7F7F4] rounded-xl p-5 border border-[#E2E0D8] space-y-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block mb-1">
                        Registered Service Address
                      </span>
                      <div className="flex items-start gap-2 text-sm text-[#0A1120] font-medium">
                        <MapPin size={16} className="text-[#004EEB] shrink-0 mt-0.5" />
                        <span>{result.consumer.address}</span>
                      </div>
                    </div>

                    {result.consumer.masked_mobile && (
                      <div className="pt-2 border-t border-[#E2E0D8] flex items-center gap-2 text-xs text-[#667085]">
                        <Phone size={13} className="text-[#98A2B3]" />
                        <span>Contact (Masked): {result.consumer.masked_mobile}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* THE CONFIRMATION STEP: "Is this your account?" */}
                {!isAccountConfirmed && (
                  <div className="mt-8 pt-6 border-t border-[#E2E0D8]">
                    <div className="bg-[#F7F7F4] rounded-xl p-5 sm:p-6 border border-[#E2E0D8] flex flex-col md:flex-row items-center justify-between gap-5">
                      <div className="space-y-1 text-center md:text-left">
                        <div className="text-sm sm:text-base font-semibold text-[#0A1120] flex items-center justify-center md:justify-start gap-2">
                          <CheckCircle2 size={18} className="text-[#004EEB]" />
                          Is this your municipal water account?
                        </div>
                        <p className="text-xs text-[#475467] max-w-md">
                          Confirming ensures your transaction is securely posted to this specific property meter.
                        </p>
                      </div>

                      {/* Yes & No Buttons */}
                      <div className="flex items-center gap-2.5 w-full md:w-auto justify-center">
                        <button
                          type="button"
                          onClick={handleRejectAccount}
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#D0D5DD] bg-white text-[#475467] hover:text-[#9A3412] hover:bg-[#FFF7ED] text-xs font-medium transition-colors"
                        >
                          <X size={14} />
                          No, not my account
                        </button>

                        <button
                          type="button"
                          onClick={handleConfirmAccount}
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white text-xs font-semibold transition-colors"
                        >
                          <Check size={14} strokeWidth={2.5} />
                          Yes, this is my account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmed Indicator Header */}
                {isAccountConfirmed && (
                  <div className="mt-6 pt-5 border-t border-[#E2E0D8] flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ECFDF5] text-[#065F46] text-xs font-semibold border border-[#A7F3D0]">
                      <CheckCircle2 size={14} className="text-[#065F46]" />
                      <span>Account Confirmed &bull; Ready for Settlement</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleRejectAccount}
                      className="text-xs text-[#667085] hover:text-[#0A1120] font-medium underline underline-offset-4"
                    >
                      Search Different Account
                    </button>
                  </div>
                )}
              </div>

              {/* PAYMENT SECTION - UNLOCKED AFTER "YES" */}
              {isAccountConfirmed && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Digital Receipt Card (if paid) */}
                  {paymentSuccessReceipt ? (
                    <div className="bg-[#FFFFFF] rounded-2xl p-8 border border-[#E2E0D8] shadow-[0_2px_8px_rgba(10,17,32,0.03)] text-center space-y-6">
                      <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] flex items-center justify-center mx-auto">
                        <CheckCircle2 size={30} />
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold text-[#0A1120]">
                          Payment Successfully Processed
                        </h2>
                        <p className="text-xs text-[#475467]">
                          Your water bill has been settled instantly. Official electronic receipt generated.
                        </p>
                      </div>

                      {/* Receipt Summary Table */}
                      <div className="max-w-md mx-auto bg-[#F7F7F4] rounded-xl p-5 border border-[#E2E0D8] text-left space-y-2.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-[#E2E0D8]">
                          <span className="text-[#667085]">Transaction ID:</span>
                          <span className="font-mono font-bold text-[#0A1120]">{paymentSuccessReceipt.transactionId}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#E2E0D8]">
                          <span className="text-[#667085]">Invoice Number:</span>
                          <span className="font-mono font-bold text-[#0A1120]">{paymentSuccessReceipt.billNumber}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#E2E0D8]">
                          <span className="text-[#667085]">Account Number:</span>
                          <span className="font-mono font-bold text-[#0A1120]">{paymentSuccessReceipt.accountNumber}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#E2E0D8]">
                          <span className="text-[#667085]">Account Holder:</span>
                          <span className="font-semibold text-[#0A1120]">{paymentSuccessReceipt.accountHolderName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#E2E0D8]">
                          <span className="text-[#667085]">Payment Method:</span>
                          <span className="font-medium text-[#0A1120]">{paymentSuccessReceipt.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm border-t border-[#E2E0D8]">
                          <span className="font-semibold text-[#0A1120]">Total Settled:</span>
                          <span className="font-bold text-[#065F46] font-mono tabular-nums">
                            LKR {Number(paymentSuccessReceipt.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D0D5DD] bg-white font-medium text-xs text-[#0A1120] hover:bg-[#F0EFEA] transition-colors"
                        >
                          <Printer size={15} /> Print Official Receipt
                        </button>
                        <button
                          type="button"
                          onClick={handleRejectAccount}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A1120] hover:bg-[#1E293B] text-white font-medium text-xs transition-colors"
                        >
                          Search Another Account
                        </button>
                      </div>
                    </div>
                  ) : result.bill ? (
                    /* Active Bill Card: Ceramic & Hairline Precision (No dark mode gradient) */
                    <div className="bg-[#FFFFFF] rounded-2xl p-6 md:p-8 border border-[#E2E0D8] shadow-[0_2px_8px_rgba(10,17,32,0.03)] space-y-6">
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E2E0D8]">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-medium text-[#667085]">
                              Invoice #{result.bill.bill_number}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase ${
                              result.bill.status === 'PAID'
                                ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                                : 'bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA]'
                            }`}>
                              {result.bill.status}
                            </span>
                          </div>

                          <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0A1120] tabular-nums font-mono">
                            LKR {Number(result.bill.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>

                          <p className="text-xs text-[#667085]">
                            Statutory Due Date: <span className="text-[#0A1120] font-medium">{formatDate(result.bill.due_date)}</span>
                          </p>
                        </div>

                        {/* Top quick links */}
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/bill/${result.bill.access_token}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#D0D5DD] bg-[#FFFFFF] hover:bg-[#F0EFEA] text-[#0A1120] text-xs font-medium transition-colors"
                          >
                            <Receipt size={14} />
                            View E-Bill
                          </Link>
                          <Link
                            href={`/pay/${result.bill.access_token}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white text-xs font-medium transition-colors"
                          >
                            <CreditCard size={14} />
                            Direct Settle
                          </Link>
                        </div>
                      </div>

                      {/* Tariff calculation breakdown toggle */}
                      {result.bill.items && result.bill.items.length > 0 && (
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#004EEB] hover:underline font-medium transition-colors"
                          >
                            {showBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {showBreakdown ? 'Hide NWSDB Tariff Breakdown' : 'Show Itemized Tariff Breakdown'}
                          </button>

                          {showBreakdown && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 bg-[#F7F7F4] rounded-xl p-4 border border-[#E2E0D8] space-y-2 text-xs"
                            >
                              {result.bill.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between text-[#475467] py-0.5 border-b border-[#E2E0D8]/60 last:border-b-0">
                                  <span>{item.description}</span>
                                  <span className="font-mono font-medium text-[#0A1120]">
                                    LKR {Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* FAST DIRECT PAYMENT DRAWER */}
                      {result.bill.status === 'UNPAID' && (
                        <div className="pt-4 border-t border-[#E2E0D8] space-y-4">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-[#667085]">
                            Select Payment Channel:
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {[
                              'Online Card (Visa/Mastercard)',
                              'Sampath Vishwa / Commercial Bank',
                              'LANKAQR / Genie / FriMi'
                            ].map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setSelectedPaymentMethod(method)}
                                className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                                  selectedPaymentMethod === method
                                    ? 'bg-[#0A1120] border-[#0A1120] text-white'
                                    : 'bg-[#FFFFFF] border-[#D0D5DD] text-[#475467] hover:bg-[#F0EFEA]'
                                }`}
                              >
                                {method}
                              </button>
                            ))}
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                            <button
                              type="button"
                              onClick={handleDirectPayment}
                              disabled={isPaying}
                              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#004EEB] hover:bg-[#003CC7] text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              {isPaying ? (
                                <>
                                  <RefreshCw size={15} className="animate-spin" />
                                  Processing Instant Payment...
                                </>
                              ) : (
                                <>
                                  <CreditCard size={16} />
                                  Pay LKR {Number(result.bill.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Now &rarr;
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Zero Balance Card */
                    <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E2E0D8] shadow-[0_2px_8px_rgba(10,17,32,0.03)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-[#0A1120] flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-[#065F46]" />
                          <span>Zero Balance Due &bull; All Bills Settled</span>
                        </div>
                        <p className="text-xs text-[#667085]">
                          {result.lastReading 
                            ? `Last recorded meter reading: ${result.lastReading.current_reading} units on ${formatDate(result.lastReading.reading_date)}.`
                            : 'This water account has no pending charges at this time.'}
                        </p>
                      </div>

                      <div className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                        Status: Active &amp; Clear
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2E0D8] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#F0EFEA] text-[#0A1120] flex items-center justify-center">
              <ShieldCheck size={18} strokeWidth={1.5} />
            </div>
            <h3 className="text-xs font-semibold text-[#0A1120]">Civic Identity Verification</h3>
            <p className="text-[11px] text-[#667085] leading-relaxed">
              Cryptographically ensures payments apply strictly to the verified property meter and registered resident.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2E0D8] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#F0EFEA] text-[#0A1120] flex items-center justify-center">
              <CreditCard size={18} strokeWidth={1.5} />
            </div>
            <h3 className="text-xs font-semibold text-[#0A1120]">Real-Time Ledger Clearance</h3>
            <p className="text-[11px] text-[#667085] leading-relaxed">
              Debounced in-memory lookups deliver sub-second account confirmation and instant e-receipt issuance.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2E0D8] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#F0EFEA] text-[#0A1120] flex items-center justify-center">
              <Receipt size={18} strokeWidth={1.5} />
            </div>
            <h3 className="text-xs font-semibold text-[#0A1120]">Official NWSDB Slabs</h3>
            <p className="text-[11px] text-[#667085] leading-relaxed">
              Statutory progressive volumetric tariffs audited under the Department of Community Water Supply.
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E0D8] bg-[#FFFFFF] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085]">
          <div>
            Vikasha CBO &bull; Magammana Community Water Scheme &copy; {new Date().getFullYear()} &bull; support@vikashacbo.com
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[#475467]">
            <Link href="/privacy-policy" className="hover:text-[#0A1120] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0A1120] transition-colors">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="hover:text-[#0A1120] transition-colors">Refund Policy</Link>
            <Link href="/delivery-policy" className="hover:text-[#0A1120] transition-colors">Delivery Policy</Link>
            <span className="inline-flex items-center gap-1.5 text-[#065F46] font-semibold text-[11px]">
              <Lock size={12} className="text-[#059669]" />
              PayHere &bull; 256-Bit SSL Official
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
