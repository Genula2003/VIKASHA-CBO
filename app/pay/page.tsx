'use client'

import { useState, useTransition, useEffect, useRef, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { lookupConsumerBill, payConsumerBillDirect } from './actions'
import { formatDate } from '@/lib/format'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { 
  Search, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
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
  Droplet,
  Clock,
  Shield,
  Mail
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Silky smooth easing curve matching the home page
const smoothEase = [0.22, 1, 0.36, 1] as const

function ConsumerPayPortalContent() {
  const searchParams = useSearchParams()
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

  // Auto-search if redirected from Home page hero (?acc=135)
  useEffect(() => {
    const acc = searchParams.get('acc')
    if (acc) {
      setQuery(acc)
      executeSearch(acc)
    }
  }, [searchParams, executeSearch])

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-[#081B38] selection:text-white font-sans overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. UNIVERSAL FROSTED GLASS NAVBAR (MATCHING HOME PAGE) */}
      {/* ========================================================================= */}
      <Navbar activeTab="billing" />

      {/* ========================================================================= */}
      {/* 2. HERO BANNER WITH SERENE WATER LAKE & SMOOTH FADE + LANDING ANIMATIONS */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#081B38] text-white pt-28 sm:pt-36 pb-28 sm:pb-36 overflow-hidden">
        
        {/* Background Serene Water Reservoir with Scale Entrance & Bottom Fade */}
        <motion.div 
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.4, ease: smoothEase }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/pay-hero-serene.jpg"
            alt="Magammana Serene Water Reservoir"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          {/* Subtle Directional Navy Scrim on left for crystal clear typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#081B38]/90 via-[#081B38]/60 to-[#081B38]/25" />
          {/* Top subtle shadow for navbar contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#081B38]/50" />
          {/* Smooth Bottom Fade: Seamlessly dissolves into pure white page body */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </motion.div>

        {/* Hero Content Area with Staggered Landing Animations */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          
          {/* Eyebrow with Silver Lines */}
          <motion.div
            initial={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-10 h-[1.5px] bg-slate-300/80" />
            <span className="text-xs uppercase tracking-[0.22em] text-slate-200 font-semibold font-mono">
              DEPARTMENT OF COMMUNITY WATER SUPPLY &bull; DCWS
            </span>
            <span className="w-10 h-[1.5px] bg-slate-300/80" />
          </motion.div>

          {/* Master Headline in Playfair Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.22, ease: smoothEase }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] tracking-tight"
          >
            Search &amp; Settle Consumer Water Bills
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: smoothEase }}
            className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Instant online settlement portal for Magammana water consumers. Verify your registered meter ledger, check itemized charges, and settle with zero convenience fees.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: smoothEase }}
            className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-mono"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="text-slate-400">&bull;</span>
            <span>SLS 614 Audit Compliant</span>
            <span className="text-slate-400">&bull;</span>
            <span>Real-Time Ledger Settlement</span>
          </motion.div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. METER SEARCH CARD (FROSTED GLASS OVERLAPPING HERO WITH FADE) */}
      {/* ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 35, scale: 0.97, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.95, delay: 0.3, ease: smoothEase }}
        className="relative z-20 max-w-3xl mx-auto px-4 -mt-16 sm:-mt-20 mb-10 w-full"
      >
        <div className="rounded-2xl p-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent shadow-[0_20px_50px_rgba(8,27,56,0.14)]">
          <div className="backdrop-blur-xl bg-[#081B38]/90 border border-white/20 rounded-2xl p-5 sm:p-7 text-white">
            
            {/* Widget Header with Silver/White Accents */}
            <div className="flex items-center justify-between mb-3.5 text-xs">
              <span className="font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-200 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                ENTER METER ACCOUNT NUMBER
              </span>
              <span className="text-slate-300 font-mono text-[11px] hidden sm:inline">
                Instant 24/7 E-Bill Search
              </span>
            </div>

            {/* Account Input & Search Button (White Main, Navy Dark Blue & Silver) */}
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                executeSearch(query)
              }} 
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#081B38]">
                    <User size={16} />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="e.g. 135 (or Consumer Account #)"
                    className="w-full h-12 pl-13 pr-10 rounded-xl bg-white text-[#081B38] placeholder:text-slate-400 font-mono text-sm font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#081B38] border border-slate-200"
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="h-12 px-7 rounded-xl bg-white hover:bg-slate-100 text-[#081B38] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 border border-slate-200"
                >
                  {isPending ? (
                    <>
                      <RefreshCw size={16} className="animate-spin text-[#081B38]" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Search size={16} className="text-[#081B38]" />
                      <span>Verify Account</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>

              {/* Quick Sample Clickable Accounts */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
                <span className="text-[11px] text-slate-400 font-mono">Quick test accounts:</span>
                {[
                  { id: '135', label: '#135 (Prasanna K.)' },
                  { id: '129', label: '#129 (Yapa R.)' },
                  { id: '363', label: '#363 (Jayathunga)' },
                  { id: '372', label: '#372 (Piyal M.)' },
                  { id: '207', label: '#207 (Araliya Uyana)' }
                ].map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleQuickFill(sample.id)}
                    className="px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white hover:text-[#081B38] text-white font-mono text-[11px] font-semibold border border-white/20 transition-all cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </form>

          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 4. MAIN BODY (PURE WHITE MAIN WITH VERIFICATION & 3 IMAGE CARDS) */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pb-20 space-y-8">
        
        {/* Informational Message */}
        {infoMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between gap-3 text-[#081B38] shadow-sm"
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <Sparkles size={15} className="text-[#081B38] shrink-0" />
              <span>{infoMessage}</span>
            </div>
            <button onClick={() => setInfoMessage(null)} className="text-slate-500 hover:text-[#081B38] cursor-pointer">
              <X size={14} />
            </button>
          </motion.div>
        )}

        {/* Error Notification */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-red-50 border border-red-200 border-l-4 border-l-red-600 p-4 flex items-start gap-3 text-red-900 shadow-sm"
          >
            <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
            <div className="text-sm font-semibold">{error}</div>
          </motion.div>
        )}

        {/* Skeleton Loader State During Account Lookup */}
        {isPending && !result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_20px_50px_rgba(8,27,56,0.08)] space-y-6 animate-pulse"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100">
              <div className="h-6 w-44 bg-slate-200 rounded-md" />
              <div className="h-4 w-32 bg-slate-100 rounded-md" />
            </div>

            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-3 w-28 bg-slate-200 rounded" />
                <div className="h-8 w-56 bg-slate-200 rounded-lg" />
                <div className="h-5 w-32 bg-slate-100 rounded" />
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                <div className="h-3 w-32 bg-slate-200 rounded" />
                <div className="h-5 w-48 bg-slate-200 rounded" />
                <div className="h-4 w-36 bg-slate-100 rounded" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="h-4 w-48 bg-slate-200 rounded" />
              <div className="h-10 w-32 bg-slate-200 rounded-lg" />
            </div>
          </motion.div>
        )}

        {/* STEP 1 & 2: VERIFICATION & BILL PAYMENT FLOW */}
        <AnimatePresence mode="wait">
          {result && result.consumer && (
            <motion.div
              key="account-found-card"
              initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="space-y-6"
            >
              {/* Account Identity Card: Pure White with Navy & Silver Details */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_20px_50px_rgba(8,27,56,0.08)] relative">
                
                {/* Top Badge Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#081B38] text-xs font-mono font-bold border border-slate-200 uppercase">
                    <User size={13} className="text-[#081B38]" />
                    <span>Account Identified &bull; Confirm Ownership</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                    <Lock size={12} className="text-emerald-700" />
                    <span>256-Bit Encrypted Public Ledger</span>
                  </div>
                </div>

                {/* Account Details */}
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                      Registered Account Holder
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#081B38] font-serif tracking-tight">
                      {result.consumer.account_holder_name}
                    </h2>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Water Account:</span>
                      <span className="text-sm font-mono font-bold text-[#081B38] bg-slate-100 px-3 py-0.5 rounded-lg border border-slate-200">
                        #{result.consumer.account_number}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200 space-y-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                        Registered Service Address
                      </span>
                      <div className="flex items-start gap-2 text-sm text-[#081B38] font-semibold">
                        <MapPin size={16} className="text-[#081B38] shrink-0 mt-0.5" />
                        <span>{result.consumer.address}</span>
                      </div>
                    </div>

                    {result.consumer.masked_mobile && (
                      <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <Phone size={13} className="text-slate-400" />
                        <span>Contact (Masked): {result.consumer.masked_mobile}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* THE CONFIRMATION STEP: "Is this your account?" */}
                {!isAccountConfirmed && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-5">
                      <div className="space-y-1 text-center md:text-left">
                        <div className="text-sm sm:text-base font-bold text-[#081B38] flex items-center justify-center md:justify-start gap-2">
                          <CheckCircle2 size={18} className="text-emerald-600" />
                          <span>Is this your municipal water account?</span>
                        </div>
                        <p className="text-xs text-slate-500 max-w-md">
                          Confirming ensures your transaction is securely posted to this specific property meter.
                        </p>
                      </div>

                      {/* Yes & No Buttons */}
                      <div className="flex items-center gap-2.5 w-full md:w-auto justify-center">
                        <button
                          type="button"
                          onClick={handleRejectAccount}
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-red-700 hover:bg-red-50 hover:border-red-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <X size={14} />
                          No, not my account
                        </button>

                        <button
                          type="button"
                          onClick={handleConfirmAccount}
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#081B38] hover:bg-[#0c2b59] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer border border-slate-300/30"
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
                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 font-mono">
                      <CheckCircle2 size={14} className="text-emerald-700" />
                      <span>Account Confirmed &bull; Ready for Settlement</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleRejectAccount}
                      className="text-xs text-slate-500 hover:text-[#081B38] font-bold underline underline-offset-4 cursor-pointer"
                    >
                      Search Different Account
                    </button>
                  </div>
                )}
              </div>

              {/* PAYMENT SECTION - UNLOCKED AFTER "YES" */}
              {isAccountConfirmed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: smoothEase }}
                  className="space-y-6"
                >
                  {/* Digital Receipt Card (if paid) */}
                  {paymentSuccessReceipt ? (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_20px_50px_rgba(8,27,56,0.08)] text-center space-y-6">
                      <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 size={32} />
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-[#081B38] font-serif">
                          Payment Successfully Processed
                        </h2>
                        <p className="text-xs text-slate-500">
                          Your water bill has been settled instantly. Official electronic receipt generated.
                        </p>
                      </div>

                      {/* Receipt Summary Table */}
                      <div className="max-w-md mx-auto bg-slate-50 rounded-xl p-5 border border-slate-200 text-left space-y-2.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Transaction ID:</span>
                          <span className="font-mono font-bold text-[#081B38]">{paymentSuccessReceipt.transactionId}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Invoice Number:</span>
                          <span className="font-mono font-bold text-[#081B38]">{paymentSuccessReceipt.billNumber}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Account Number:</span>
                          <span className="font-mono font-bold text-[#081B38]">{paymentSuccessReceipt.accountNumber}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Account Holder:</span>
                          <span className="font-bold text-[#081B38]">{paymentSuccessReceipt.accountHolderName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Payment Method:</span>
                          <span className="font-semibold text-[#081B38]">{paymentSuccessReceipt.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm border-t border-slate-200">
                          <span className="font-bold text-[#081B38]">Total Settled:</span>
                          <span className="font-bold text-emerald-700 font-mono tabular-nums">
                            LKR {Number(paymentSuccessReceipt.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs text-[#081B38] hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                        >
                          <Printer size={15} /> Print Official Receipt
                        </button>
                        <button
                          type="button"
                          onClick={handleRejectAccount}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#081B38] hover:bg-[#0c2b59] text-white font-bold text-xs transition-all shadow-md cursor-pointer border border-slate-300/30"
                        >
                          Search Another Account
                        </button>
                      </div>
                    </div>
                  ) : result.bill ? (
                    /* Active Bill Card: Pure White with Navy Dark Blue & Silver Details */
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-[0_20px_50px_rgba(8,27,56,0.08)] space-y-6">
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-medium text-slate-500">
                              Invoice #{result.bill.bill_number}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase ${
                              result.bill.status === 'PAID'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-900 border border-amber-200'
                            }`}>
                              {result.bill.status}
                            </span>
                          </div>

                          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#081B38] tabular-nums font-mono">
                            LKR {Number(result.bill.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>

                          <p className="text-xs text-slate-500">
                            Statutory Due Date: <span className="text-[#081B38] font-bold">{formatDate(result.bill.due_date)}</span>
                          </p>
                        </div>

                        {/* Top quick links */}
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/bill/${result.bill.access_token}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#081B38] text-xs font-bold transition-all shadow-sm"
                          >
                            <Receipt size={14} />
                            View E-Bill
                          </Link>
                          <Link
                            href={`/pay/${result.bill.access_token}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#081B38] hover:bg-[#0c2b59] text-white text-xs font-bold transition-all shadow-md border border-slate-300/30"
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
                            className="inline-flex items-center gap-1.5 text-xs text-[#081B38] hover:underline font-bold transition-colors cursor-pointer"
                          >
                            {showBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {showBreakdown ? 'Hide NWSDB Tariff Breakdown' : 'Show Itemized Tariff Breakdown'}
                          </button>

                          {showBreakdown && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs"
                            >
                              {result.bill.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between text-slate-600 py-1 border-b border-slate-200/60 last:border-b-0">
                                  <span>{item.description}</span>
                                  <span className="font-mono font-bold text-[#081B38]">
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
                        <div className="pt-4 border-t border-slate-100 space-y-4">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
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
                                className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                                  selectedPaymentMethod === method
                                    ? 'bg-[#081B38] border-[#081B38] text-white font-bold shadow-md'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
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
                              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#081B38] hover:bg-[#0c2b59] text-white rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer border border-slate-300/30"
                            >
                              {isPaying ? (
                                <>
                                  <RefreshCw size={17} className="animate-spin text-white" />
                                  <span>Processing Instant Payment...</span>
                                </>
                              ) : (
                                <>
                                  <CreditCard size={18} />
                                  <span>Pay LKR {Number(result.bill.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Now &rarr;</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Zero Balance Card */
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-[0_20px_50px_rgba(8,27,56,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-[#081B38] flex items-center gap-2">
                          <CheckCircle2 size={18} className="text-emerald-700" />
                          <span>Zero Balance Due &bull; All Bills Settled</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {result.lastReading 
                            ? `Last recorded meter reading: ${result.lastReading.current_reading} units on ${formatDate(result.lastReading.reading_date)}.`
                            : 'This water account has no pending charges at this time.'}
                        </p>
                      </div>

                      <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Status: Active &amp; Clear
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================== */}
        {/* 5. 3 FEATURE CARDS WITH ULTRA-PREMIUM GENERATED IMAGES & SCROLL ANIMATIONS */}
        {/* ===================================================================== */}
        <div className="pt-6">
          <motion.div 
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="flex items-center justify-between mb-5"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                SECURITY &bull; TRANSPARENCY &bull; ACCREDITATION
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#081B38] font-serif tracking-tight mt-0.5">
                Official Settlement Architecture
              </h2>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-semibold">
              SLS 614 &bull; DCWS CERTIFIED
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: "Civic Identification",
                title: "Meter Ledger Verification",
                desc: "Cryptographically guarantees all payments apply strictly to your verified residential meter and registered resident account.",
                image: "/pay-card-verify.jpg"
              },
              {
                category: "Instant Settlement",
                title: "Real-Time Clearance",
                desc: "Sub-second ledger clearance and automated electronic receipts supported via LankaQR, Visa, Mastercard, and CEFT.",
                image: "/pay-card-settle.jpg"
              },
              {
                category: "Audited Volumetric",
                title: "Official NWSDB Slabs",
                desc: "Statutory progressive volumetric tariffs audited under the Department of Community Water Supply with full itemized transparency.",
                image: "/pay-card-tariffs.jpg"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.12, ease: smoothEase }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(8,27,56,0.08)] bg-white border border-slate-200/90 flex flex-col group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,27,56,0.16)] hover:border-slate-300"
              >
                {/* Top Image Section (~55%) */}
                <div className="h-48 sm:h-52 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                  {/* Floating Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-mono font-bold tracking-wider text-[#081B38] shadow-sm uppercase">
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Bottom Info Panel (~45%) */}
                <div className="bg-white p-5 sm:p-6 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#081B38] tracking-tight font-serif mb-2 group-hover:text-[#0B2548] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38]">
                    <span className="font-mono uppercase tracking-wider text-[11px] text-slate-500">
                      Certified Gateway
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#081B38] group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <Check size={13} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 6. SOVEREIGN INSTITUTIONAL FOOTER (EXACT MATCH TO HOME PAGE) */}
      {/* ========================================================================= */}
      <footer className="bg-[#020e1e] text-white pt-16 pb-12 border-t border-slate-800 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: smoothEase }}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                  <Droplet size={20} className="text-cyan-300" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Vikasha CBO</h4>
                  <p className="text-xs text-cyan-200/80">විකාශා ප්‍රජා මූල සංවිධානය &bull; මාගම්මන</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                National Water Supply &amp; Drainage Board / Department of Community Water Supply (DCWS) registered scheme ensuring uninterrupted safe drinking water for Magammana, Homagama.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">Quick Access</h5>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li><Link href="/pay" className="hover:text-cyan-300 transition-colors duration-200">Online Bill Payment</Link></li>
                <li><Link href="/meter-reader" className="hover:text-cyan-300 transition-colors duration-200">Field Meter Reader App</Link></li>
                <li><Link href="/admin/dashboard" className="hover:text-cyan-300 transition-colors duration-200">Administrative Dashboard</Link></li>
                <li><Link href="/login" className="hover:text-cyan-300 transition-colors duration-200">Staff Portal Login</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">Contact &amp; Emergency</h5>
              <div className="space-y-2 text-xs text-slate-300 font-medium">
                <p className="flex items-center gap-2"><MapPin size={13} className="text-cyan-400" /> Magammana, Homagama, Sri Lanka</p>
                <p className="flex items-center gap-2"><Mail size={13} className="text-cyan-400" /> support@vikashacbo.com</p>
                <p className="flex items-center gap-2"><Phone size={13} className="text-emerald-400" /> Hotline: 011 289 4567</p>
                <p className="flex items-center gap-2"><Clock size={13} className="text-amber-400" /> Mon - Sat: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Water Project). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-5 text-slate-300">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms &amp; Conditions</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors duration-200">Refund Policy</Link>
              <Link href="/delivery-policy" className="hover:text-white transition-colors duration-200">Delivery Policy</Link>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                <Shield size={13} /> DCWS / NWSDB Regulated
              </span>
            </div>
          </div>

        </motion.div>
      </footer>

    </div>
  )
}

export default function ConsumerPayPortalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-[#081B38]">
        <div className="flex items-center gap-3 font-semibold text-sm">
          <RefreshCw size={18} className="animate-spin text-[#081B38]" />
          <span>Loading Consumer Billing Portal...</span>
        </div>
      </div>
    }>
      <ConsumerPayPortalContent />
    </Suspense>
  )
}
