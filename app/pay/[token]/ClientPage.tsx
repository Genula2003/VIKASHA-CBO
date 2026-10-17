'use client'

import { useState, useTransition } from 'react'
import { processDemoPayment } from './actions'
import Link from 'next/link'
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
  AlertCircle
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

  // Success E-Receipt Screen
  if (success) {
    return (
      <div className="min-h-screen bg-[#F0F6FF] text-[#081B38] font-sans py-12 px-4 sm:px-6 relative selection:bg-[#0066FF] selection:text-white">
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-40 pointer-events-none"
          style={{ backgroundImage: `url('/pay-water-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/70 pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          {/* Official E-Receipt Card */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_25px_70px_rgba(8,27,56,0.12)] overflow-hidden print:shadow-none print:border-none">
            
            {/* Header Badge */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 sm:p-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mx-auto flex items-center justify-center text-white shadow-inner">
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
              <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Settled Amount</span>
                <div className="text-4xl font-black text-[#081B38] mt-1 font-mono">
                  LKR {formattedAmount}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mt-2 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Account Balance Cleared &bull; Reconciled
                </div>
              </div>

              {/* Receipt Details Table */}
              <div className="divide-y divide-gray-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Transaction ID</span>
                  <span className="font-mono font-bold text-[#081B38]">{transactionId}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Bill Reference</span>
                  <span className="font-mono font-bold text-[#081B38]">#{bill.bill_number}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Water Account</span>
                  <span className="font-mono font-bold text-[#0066FF]">#{accountNum}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Consumer Name</span>
                  <span className="font-bold text-[#081B38] text-right">{accountHolder}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Service Address</span>
                  <span className="font-medium text-gray-700 text-right max-w-[240px] truncate">{address}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Payment Channel</span>
                  <span className="font-bold text-[#081B38]">{methodNames[method]}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Payment Timestamp</span>
                  <span className="font-medium text-gray-700">{paymentTimestamp}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Gateway Provider</span>
                  <span className="font-bold text-[#081B38]">PayHere (CBSL Regulated)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors"
                >
                  <Printer size={15} />
                  Print / Save Official PDF Receipt
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/bill/${bill.access_token}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-[#0066FF] text-white hover:bg-blue-600 font-bold text-xs transition-colors shadow-sm"
                  >
                    <FileText size={14} />
                    View Updated Bill
                  </Link>

                  <Link
                    href="/pay"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-[#081B38] text-white hover:bg-[#1C2541] font-bold text-xs transition-colors shadow-sm"
                  >
                    <ArrowLeft size={14} />
                    Quick Pay Home
                  </Link>
                </div>
              </div>

            </div>

            {/* Footer Notice */}
            <div className="bg-gray-50 border-t border-gray-100 p-4 text-center text-[11px] text-gray-500 space-y-1">
              <p>This is a computer-generated municipal receipt verified under DCWS / NWSDB standards.</p>
              <p className="font-bold text-gray-700">Need help? Contact support@vikashacbo.com &bull; Hotline: 011 289 4567</p>
            </div>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F0F6FF] text-[#081B38] font-sans relative selection:bg-[#0066FF] selection:text-white overflow-x-hidden flex flex-col justify-between">
      
      {/* Background Water Artwork Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom pointer-events-none opacity-85"
        style={{ backgroundImage: `url('/pay-water-bg.jpg')` }}
      />
      {/* Soft Luminous Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-t from-blue-100/40 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Branding & Trust Showcase */}
          <div className="lg:col-span-6 space-y-8 lg:space-y-12">
            
            {/* Header / Logo */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#081B38] to-[#0066FF] shadow-lg shadow-blue-600/25 flex items-center justify-center text-white">
                <Droplet size={24} className="fill-white" />
              </div>
              <div>
                <span className="text-xl font-black text-[#081B38] tracking-tight block">
                  Vikasha CBO
                </span>
                <span className="text-xs text-gray-500 font-medium block">
                  Magammana Community Water Project
                </span>
              </div>
            </div>

            {/* Headline & Description */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.05] text-[#081B38]">
                Pay Your <br />
                <span className="text-[#0066FF]">Water Bill Online</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-normal max-w-lg leading-relaxed">
                Verified and secure payment for Magammana Community Water Supply Scheme
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-start gap-6 sm:gap-10 pt-2">
              
              {/* Badge 1: Secure Payments */}
              <div className="flex flex-col items-center text-center max-w-[105px] group">
                <div className="w-14 h-14 rounded-full bg-[#EBF4FF] border border-[#D0E4FF] flex items-center justify-center text-[#0066FF] shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <ShieldCheck size={26} strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-[#081B38] mt-2.5 leading-snug">
                  Secure<br />Payments
                </span>
              </div>

              {/* Badge 2: Fast & Convenient */}
              <div className="flex flex-col items-center text-center max-w-[105px] group">
                <div className="w-14 h-14 rounded-full bg-[#EBF4FF] border border-[#D0E4FF] flex items-center justify-center text-[#0066FF] shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Zap size={26} strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-[#081B38] mt-2.5 leading-snug">
                  Fast &amp;<br />Convenient
                </span>
              </div>

              {/* Badge 3: View & Settle Bills Easily */}
              <div className="flex flex-col items-center text-center max-w-[115px] group">
                <div className="w-14 h-14 rounded-full bg-[#EBF4FF] border border-[#D0E4FF] flex items-center justify-center text-[#0066FF] shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <FileText size={26} strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-[#081B38] mt-2.5 leading-snug">
                  View &amp; Settle<br />Bills Easily
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: The Payment Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[530px] bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-9 shadow-[0_25px_70px_rgba(8,27,56,0.12)] border border-white/80 space-y-6 relative">
              
              {/* Card Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center text-white shadow-sm">
                    <Droplet size={18} className="fill-white" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#081B38] block leading-tight">Vikasha CBO</span>
                    <span className="text-[10px] text-gray-400 font-medium block">Magammana Community Water Project</span>
                  </div>
                </div>

                <Link 
                  href={`/bill/${bill.access_token}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#081B38] transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Bill
                </Link>
              </div>

              {/* Title Header */}
              <div className="text-center pt-1">
                <h2 className="text-2xl sm:text-[26px] font-black text-[#081B38] tracking-tight">
                  Confirm &amp; Settle Water Bill
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Verified online payment for Magammana Community Water Supply Scheme
                </p>
              </div>

              {/* Account & Total Payable Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                
                {/* Account Details (Left) */}
                <div className="sm:col-span-6 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    WATER ACCOUNT
                  </span>
                  <div className="text-xl font-black text-[#081B38] tracking-tight">
                    Account #{accountNum}
                  </div>
                  <div className="text-xs font-extrabold text-[#081B38] uppercase">
                    {accountHolder}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold leading-relaxed">
                    {address}
                  </div>
                </div>

                {/* Total Payable Box (Right) */}
                <div className="sm:col-span-6 bg-[#EDF5FF] rounded-2xl p-4 text-center sm:text-right flex flex-col justify-center border border-blue-100/60">
                  <span className="text-[10px] font-black text-[#0066FF] uppercase tracking-wider block">
                    TOTAL PAYABLE
                  </span>
                  <div className="text-xs font-black text-[#081B38] mt-0.5">
                    LKR
                  </div>
                  <div className="text-3xl font-black text-[#081B38] tracking-tight leading-none mt-0.5">
                    {formattedAmount}
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium mt-1 block">
                    Invoice #{bill.bill_number}
                  </span>
                </div>

              </div>

              {/* Select Payment Method */}
              <div className="space-y-2.5 pt-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-700 block">
                  SELECT PAYMENT METHOD
                </label>

                <div className="space-y-2.5">
                  
                  {/* Option 1: Credit / Debit Card */}
                  <div 
                    onClick={() => setMethod('card')}
                    className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      method === 'card' 
                        ? 'border-2 border-[#0066FF] bg-white shadow-[0_4px_16px_rgba(0,102,255,0.08)]' 
                        : 'border border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        method === 'card' ? 'bg-[#0066FF] text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#081B38] block">
                          Credit / Debit Card
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium block">
                          Visa, MasterCard &bull; 3D Secure 2.0 OTP Verified
                        </span>
                      </div>
                    </div>
                    
                    {/* Custom Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      method === 'card' ? 'border-[#0066FF]' : 'border-gray-300'
                    }`}>
                      {method === 'card' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                      )}
                    </div>
                  </div>

                  {/* Option 2: LankaQR / Mobile Wallets */}
                  <div 
                    onClick={() => setMethod('lankaqr')}
                    className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      method === 'lankaqr' 
                        ? 'border-2 border-[#0066FF] bg-white shadow-[0_4px_16px_rgba(0,102,255,0.08)]' 
                        : 'border border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        method === 'lankaqr' ? 'bg-[#0066FF] text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <QrCode size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#081B38] block">
                          LankaQR / Mobile Wallets
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium block">
                          FriMi, Genie, eZ Cash, Any Bank LankaQR App
                        </span>
                      </div>
                    </div>

                    {/* Custom Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      method === 'lankaqr' ? 'border-[#0066FF]' : 'border-gray-300'
                    }`}>
                      {method === 'lankaqr' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                      )}
                    </div>
                  </div>

                  {/* Option 3: Internet Banking Direct Pay */}
                  <div 
                    onClick={() => setMethod('banking')}
                    className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      method === 'banking' 
                        ? 'border-2 border-[#0066FF] bg-white shadow-[0_4px_16px_rgba(0,102,255,0.08)]' 
                        : 'border border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        method === 'banking' ? 'bg-[#0066FF] text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Building2 size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#081B38] block">
                          Internet Banking Direct Pay
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium block">
                          Commercial Bank, Sampath Vishwa, BOC, People&apos;s Bank
                        </span>
                      </div>
                    </div>

                    {/* Custom Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      method === 'banking' ? 'border-[#0066FF]' : 'border-gray-300'
                    }`}>
                      {method === 'banking' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="pt-2 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Water Tariff Charge</span>
                  <span className="font-bold text-[#081B38]">LKR {formattedAmount}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>PayHere Gateway Fee</span>
                  <span className="font-bold text-emerald-600">LKR 0.00 (Waived)</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="font-extrabold text-[#081B38]">Net Settlement Amount</span>
                  <span className="font-black text-[#0066FF]">LKR {formattedAmount}</span>
                </div>
              </div>

              {/* Error Notice */}
              {error && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Pay Button */}
              <div>
                <button
                  onClick={handlePay}
                  disabled={isPending}
                  className="w-full py-4 rounded-2xl bg-[#0066FF] hover:bg-blue-600 active:scale-[0.99] text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_12px_24px_-4px_rgba(0,102,255,0.4)] transition-all cursor-pointer disabled:opacity-50"
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
      </div>

      {/* Subtle Regulatory Compliance & Links Footer */}
      <footer className="relative z-10 py-4 px-6 text-center border-t border-white/60 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Vikasha CBO &bull; Magammana Community Water Supply Scheme &bull; Payments secured by PayHere (CBSL Regulated).
          </p>
          <div className="flex items-center gap-4 text-gray-600">
            <Link href="/terms" className="hover:text-[#0066FF] transition-colors">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-[#0066FF] transition-colors">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-[#0066FF] transition-colors">Refund Policy</Link>
            <Link href="/delivery-policy" className="hover:text-[#0066FF] transition-colors">Delivery Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
