'use client'

import { useState, useTransition } from 'react'
import { processDemoPayment } from './actions'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { 
  Droplet, 
  ShieldCheck, 
  Zap,
  FileText,
  Lock, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building2, 
  ArrowLeft, 
  Printer, 
  AlertCircle,
  MapPin,
  Mail,
  Phone,
  Clock,
  Shield
} from 'lucide-react'

interface PaymentClientPageProps {
  bill: {
    bill_number: string
    access_token: string
    amount: number
    status: string
    account_number?: string
    account_holder_name?: string
    address?: string
    billing_period_start?: string
    billing_period_end?: string
    consumers?: {
      account_number?: string
      account_holder_name?: string
      address?: string
    }
  }
}

export function PaymentClientPage({ bill }: PaymentClientPageProps) {
  const [method, setMethod] = useState<'card' | 'lankaqr' | 'banking'>('card')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [paymentTimestamp, setPaymentTimestamp] = useState<string>('')

  const accountNum = bill.account_number || bill.consumers?.account_number || 'N/A'
  const accountHolder = bill.account_holder_name || bill.consumers?.account_holder_name || 'Registered Resident'
  const address = bill.address || bill.consumers?.address || 'Magammana, Homagama (Wedagewaththa Road)'

  const formattedAmount = Number(bill.amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  const methodNames = {
    card: 'Visa / MasterCard / Debit Card',
    lankaqr: 'LankaQR / Mobile Wallets (eZ Cash, FriMi, Genie)',
    banking: 'Internet Banking Direct Pay (Commercial Bank, Sampath, BOC)'
  }

  const handlePay = () => {
    setError(null)
    startTransition(async () => {
      const selectedLabel = methodNames[method]
      const result = await processDemoPayment(bill.access_token, selectedLabel)
      if (result.error) {
        setError(result.error)
      } else {
        setTransactionId(result.transactionId || `TXN-${Date.now()}-${accountNum}`)
        setPaymentTimestamp(new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' }))
        setSuccess(true)
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#040D1A] text-slate-100 font-sans relative selection:bg-[#00D2FF] selection:text-[#040D1A] overflow-x-hidden flex flex-col justify-between">
      
      {/* 1. Universal Top Navigation Bar */}
      <Navbar activeTab="billing" />

      {/* 2. Navy Dark Blue Water Background Artwork */}
      <div 
        className="fixed inset-0 bg-cover bg-center pointer-events-none opacity-50 z-0"
        style={{ backgroundImage: `url('/pay-water-dark-navy.jpg')` }}
      />
      {/* Ambient Dark Navy & Cyan Atmosphere Glows */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#081B38]/90 via-[#040D1A]/75 to-[#020e1e]/95 pointer-events-none z-0" />
      <div className="fixed -top-40 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* 3. Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 sm:pt-40 lg:pt-44 pb-16 flex-1 flex items-center">
        
        {/* If payment succeeded -> Glass E-Receipt Screen */}
        {success ? (
          <div className="w-full max-w-xl mx-auto space-y-6">
            <div className="backdrop-blur-2xl bg-[#081B38]/70 border border-white/20 rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden print:bg-white print:text-black">
              
              {/* Receipt Header Badge */}
              <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md text-white p-6 sm:p-8 text-center space-y-3 border-b border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-white shadow-inner">
                  <CheckCircle2 size={36} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-100">
                    Municipal Payment Succeeded
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Official Payment Receipt
                  </h1>
                  <p className="text-xs text-emerald-100 font-medium mt-0.5">
                    Vikasha CBO &bull; Magammana Community Water Project
                  </p>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Amount Highlight */}
                <div className="bg-cyan-500/10 rounded-2xl p-5 border border-cyan-400/20 text-center backdrop-blur-md">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">Total Settled Amount</span>
                  <div className="text-4xl font-black text-white mt-1 font-mono tracking-tight">
                    LKR {formattedAmount}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mt-2 border border-emerald-400/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Account Balance Cleared &bull; Reconciled
                  </div>
                </div>

                {/* Receipt Details Table */}
                <div className="divide-y divide-white/10 text-xs">
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Transaction ID</span>
                    <span className="font-mono font-bold text-white">{transactionId}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Bill Reference</span>
                    <span className="font-mono font-bold text-white">#{bill.bill_number}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Water Account</span>
                    <span className="font-mono font-bold text-[#38BDF8]">#{accountNum}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Consumer Name</span>
                    <span className="font-bold text-white text-right">{accountHolder}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Service Address</span>
                    <span className="font-medium text-slate-300 text-right max-w-[240px] truncate">{address}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Payment Channel</span>
                    <span className="font-bold text-white">{methodNames[method]}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Payment Timestamp</span>
                    <span className="font-medium text-slate-300">{paymentTimestamp}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Gateway Provider</span>
                    <span className="font-bold text-cyan-300">PayHere (CBSL Regulated)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20 backdrop-blur-md cursor-pointer"
                  >
                    <Printer size={15} />
                    Print / Save Official PDF Receipt
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/bill/${bill.access_token}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-[#0066FF] text-white hover:bg-blue-600 font-bold text-xs transition-colors shadow-lg shadow-blue-600/30 border border-blue-400/30"
                    >
                      <FileText size={14} />
                      View Updated Bill
                    </Link>

                    <Link
                      href="/pay"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white/10 text-white hover:bg-white/15 font-bold text-xs transition-colors border border-white/20 backdrop-blur-md"
                    >
                      <ArrowLeft size={14} />
                      Quick Pay Home
                    </Link>
                  </div>
                </div>

              </div>

              {/* Receipt Footer Notice */}
              <div className="bg-black/30 border-t border-white/10 p-4 text-center text-[11px] text-slate-400 space-y-1">
                <p>This is a computer-generated municipal receipt verified under DCWS / NWSDB standards.</p>
                <p className="font-bold text-slate-300">Need help? Contact support@vikashacbo.com &bull; Hotline: 011 289 4567</p>
              </div>

            </div>
          </div>
        ) : (
          /* Active Checkout Layout: 2 Columns */
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Branding & Trust Showcase */}
            <div className="lg:col-span-6 space-y-8 lg:space-y-12">
              
              {/* Header / Brand Badge */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D2FF] to-[#0066FF] shadow-[0_0_25px_rgba(0,210,255,0.4)] flex items-center justify-center text-white border border-white/30">
                  <Droplet size={24} className="fill-white" />
                </div>
                <div>
                  <span className="text-xl font-black text-white tracking-tight block">
                    Vikasha CBO
                  </span>
                  <span className="text-xs text-cyan-200/80 font-medium block">
                    Magammana Community Water Project
                  </span>
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.05] text-white">
                  Pay Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#00D2FF]">
                    Water Bill Online
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-normal max-w-lg leading-relaxed">
                  Verified and secure payment for Magammana Community Water Supply Scheme
                </p>
              </div>

              {/* 3 Trust Badges with Frosted Dark Glass */}
              <div className="flex items-start gap-6 sm:gap-10 pt-2">
                
                {/* Badge 1: Secure Payments */}
                <div className="flex flex-col items-center text-center max-w-[105px] group">
                  <div className="w-14 h-14 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md flex items-center justify-center text-[#38BDF8] shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/50 group-hover:bg-white/10">
                    <ShieldCheck size={26} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-bold text-white mt-2.5 leading-snug">
                    Secure<br />Payments
                  </span>
                </div>

                {/* Badge 2: Fast & Convenient */}
                <div className="flex flex-col items-center text-center max-w-[105px] group">
                  <div className="w-14 h-14 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md flex items-center justify-center text-[#38BDF8] shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/50 group-hover:bg-white/10">
                    <Zap size={26} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-bold text-white mt-2.5 leading-snug">
                    Fast &amp;<br />Convenient
                  </span>
                </div>

                {/* Badge 3: View & Settle Bills Easily */}
                <div className="flex flex-col items-center text-center max-w-[115px] group">
                  <div className="w-14 h-14 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md flex items-center justify-center text-[#38BDF8] shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/50 group-hover:bg-white/10">
                    <FileText size={26} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-bold text-white mt-2.5 leading-snug">
                    View &amp; Settle<br />Bills Easily
                  </span>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: The Payment Card with Ultra-Premium Glass Effect */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[530px] backdrop-blur-2xl bg-[#081B38]/70 border border-white/20 rounded-[32px] sm:rounded-[36px] p-6 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-6 relative">
                
                {/* Card Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D2FF] to-[#0066FF] flex items-center justify-center text-white shadow-sm border border-white/20">
                      <Droplet size={18} className="fill-white" />
                    </div>
                    <div>
                      <span className="text-sm font-black text-white block leading-tight">Vikasha CBO</span>
                      <span className="text-[10px] text-cyan-200/70 font-medium block">Magammana Community Water Project</span>
                    </div>
                  </div>

                  <Link 
                    href={`/bill/${bill.access_token}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={14} /> Back to Bill
                  </Link>
                </div>

                {/* Title Header */}
                <div className="text-center pt-1">
                  <h2 className="text-2xl sm:text-[26px] font-black text-white tracking-tight">
                    Confirm &amp; Settle Water Bill
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Verified online payment for Magammana Community Water Supply Scheme
                  </p>
                </div>

                {/* Account & Total Payable Row with Frosted Glass Pill */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  
                  {/* Account Details (Left) */}
                  <div className="sm:col-span-6 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      WATER ACCOUNT
                    </span>
                    <div className="text-xl font-black text-white tracking-tight">
                      Account #{accountNum}
                    </div>
                    <div className="text-xs font-extrabold text-cyan-300 uppercase">
                      {accountHolder}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold leading-relaxed">
                      {address}
                    </div>
                  </div>

                  {/* Total Payable Box (Right - Frosted Glass Container) */}
                  <div className="sm:col-span-6 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 backdrop-blur-md rounded-2xl p-4 text-center sm:text-right flex flex-col justify-center border border-cyan-400/30 shadow-inner">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider block">
                      TOTAL PAYABLE
                    </span>
                    <div className="text-xs font-black text-slate-200 mt-0.5">
                      LKR
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight leading-none mt-0.5 font-mono">
                      {formattedAmount}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                      Invoice #{bill.bill_number}
                    </span>
                  </div>

                </div>

                {/* Select Payment Method */}
                <div className="space-y-2.5 pt-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300 block">
                    SELECT PAYMENT METHOD
                  </label>

                  <div className="space-y-2.5">
                    
                    {/* Option 1: Credit / Debit Card */}
                    <div 
                      onClick={() => setMethod('card')}
                      className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                        method === 'card' 
                          ? 'border-2 border-[#00D2FF] bg-[#00D2FF]/10 shadow-[0_0_20px_rgba(0,210,255,0.25)] backdrop-blur-md' 
                          : 'border border-white/10 hover:border-white/25 bg-white/[0.04] backdrop-blur-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          method === 'card' 
                            ? 'bg-gradient-to-br from-[#00D2FF] to-[#0066FF] text-white shadow-sm border border-white/30' 
                            : 'bg-white/10 text-slate-300'
                        }`}>
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">
                            Credit / Debit Card
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            Visa, MasterCard &bull; 3D Secure 2.0 OTP Verified
                          </span>
                        </div>
                      </div>
                      
                      {/* Custom Glass Radio Button */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        method === 'card' ? 'border-[#00D2FF]' : 'border-slate-500'
                      }`}>
                        {method === 'card' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]" />
                        )}
                      </div>
                    </div>

                    {/* Option 2: LankaQR / Mobile Wallets */}
                    <div 
                      onClick={() => setMethod('lankaqr')}
                      className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                        method === 'lankaqr' 
                          ? 'border-2 border-[#00D2FF] bg-[#00D2FF]/10 shadow-[0_0_20px_rgba(0,210,255,0.25)] backdrop-blur-md' 
                          : 'border border-white/10 hover:border-white/25 bg-white/[0.04] backdrop-blur-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          method === 'lankaqr' 
                            ? 'bg-gradient-to-br from-[#00D2FF] to-[#0066FF] text-white shadow-sm border border-white/30' 
                            : 'bg-white/10 text-slate-300'
                        }`}>
                          <QrCode size={20} />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">
                            LankaQR / Mobile Wallets
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            FriMi, Genie, eZ Cash, Any Bank LankaQR App
                          </span>
                        </div>
                      </div>

                      {/* Custom Glass Radio Button */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        method === 'lankaqr' ? 'border-[#00D2FF]' : 'border-slate-500'
                      }`}>
                        {method === 'lankaqr' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]" />
                        )}
                      </div>
                    </div>

                    {/* Option 3: Internet Banking Direct Pay */}
                    <div 
                      onClick={() => setMethod('banking')}
                      className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                        method === 'banking' 
                          ? 'border-2 border-[#00D2FF] bg-[#00D2FF]/10 shadow-[0_0_20px_rgba(0,210,255,0.25)] backdrop-blur-md' 
                          : 'border border-white/10 hover:border-white/25 bg-white/[0.04] backdrop-blur-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          method === 'banking' 
                            ? 'bg-gradient-to-br from-[#00D2FF] to-[#0066FF] text-white shadow-sm border border-white/30' 
                            : 'bg-white/10 text-slate-300'
                        }`}>
                          <Building2 size={20} />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">
                            Internet Banking Direct Pay
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            Commercial Bank, Sampath Vishwa, BOC, People&apos;s Bank
                          </span>
                        </div>
                      </div>

                      {/* Custom Glass Radio Button */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        method === 'banking' ? 'border-[#00D2FF]' : 'border-slate-500'
                      }`}>
                        {method === 'banking' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]" />
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>Water Tariff Charge</span>
                    <span className="font-bold text-white font-mono">LKR {formattedAmount}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 font-medium">
                    <span>PayHere Gateway Fee</span>
                    <span className="font-bold text-emerald-400">LKR 0.00 (Waived)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1 border-t border-white/10">
                    <span className="font-extrabold text-white">Net Settlement Amount</span>
                    <span className="font-black text-[#38BDF8] font-mono text-base">LKR {formattedAmount}</span>
                  </div>
                </div>

                {/* Error Notice */}
                {error && (
                  <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-xs text-red-200 flex items-center gap-2 backdrop-blur-md">
                    <AlertCircle size={16} className="shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Pay Button with Luminous Glow */}
                <div>
                  <button
                    onClick={handlePay}
                    disabled={isPending}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0070FF] hover:to-[#005CE6] active:scale-[0.99] text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_10px_35px_rgba(0,102,255,0.5)] border border-blue-400/40 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Lock size={16} />
                    <span>
                      {isPending 
                        ? 'Securing Payment Authorization...' 
                        : `Pay LKR ${formattedAmount} via PayHere`
                      }
                    </span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* 4. Sovereign Institutional Footer */}
      <footer className="bg-[#020e1e] text-white pt-16 pb-12 border-t border-slate-800 relative z-10 w-full mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

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

        </div>
      </footer>

    </div>
  )
}
