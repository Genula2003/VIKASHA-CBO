'use client'

import { useState, useTransition } from 'react'
import { processDemoPayment } from './actions'
import Link from 'next/link'
import { 
  Droplet, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building2, 
  ArrowLeft, 
  Printer, 
  AlertCircle,
  FileText
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
  const address = bill.address || bill.consumers?.address || 'Magammana, Homagama'

  const methodNames = {
    card: 'Visa / MasterCard / Debit Card',
    lankaqr: 'LankaQR / Mobile Wallet (eZ Cash, FriMi, Genie)',
    banking: 'Direct Bank Portal (Commercial Bank, Sampath, BOC)'
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

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B] font-sans py-12 px-4 sm:px-6 selection:bg-[#0066FF] selection:text-white">
        <div className="max-w-xl mx-auto space-y-6">
          
          {/* Official E-Receipt Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_-15px_rgba(11,19,43,0.08)] overflow-hidden print:shadow-none print:border-none">
            
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
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Settled Amount</span>
                <div className="text-4xl font-black text-[#0B132B] mt-1 font-mono">
                  LKR {Number(bill.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                  <span className="font-mono font-bold text-[#0B132B]">{transactionId}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Bill Reference</span>
                  <span className="font-mono font-bold text-[#0B132B]">#{bill.bill_number}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Water Account</span>
                  <span className="font-mono font-bold text-[#0066FF]">#{accountNum}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Consumer Name</span>
                  <span className="font-bold text-[#0B132B] text-right">{accountHolder}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Service Address</span>
                  <span className="font-medium text-gray-700 text-right max-w-[240px] truncate">{address}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Payment Channel</span>
                  <span className="font-bold text-[#0B132B]">{methodNames[method]}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Payment Timestamp</span>
                  <span className="font-medium text-gray-700">{paymentTimestamp}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Gateway Provider</span>
                  <span className="font-bold text-[#0B132B]">PayHere (CBSL Regulated)</span>
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
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-[#0B132B] text-white hover:bg-[#1C2541] font-bold text-xs transition-colors shadow-sm"
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B] font-sans selection:bg-[#0066FF] selection:text-white">
      
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B132B] to-[#0066FF] text-white flex items-center justify-center shadow-md">
              <Droplet size={20} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-[#0B132B]">Vikasha CBO</span>
              <p className="text-[11px] font-medium text-gray-400">Magammana Community Water Project</p>
            </div>
          </Link>

          <Link 
            href={`/bill/${bill.access_token}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#0B132B] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Bill
          </Link>
        </div>
      </header>

      {/* Main Checkout Area */}
      <main className="max-w-2xl mx-auto px-6 py-10 md:py-14 space-y-8">
        
        {/* Page Title */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-[#0066FF] text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck size={14} />
            PayHere Municipal Payment Gateway
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0B132B] tracking-tight">
            Confirm &amp; Settle Water Bill
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Verified online payment for Magammana Community Water Supply Scheme
          </p>
        </div>

        {/* Bill Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_20px_50px_-15px_rgba(11,19,43,0.06)] space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Water Account</span>
              <div className="text-2xl font-black text-[#0B132B] font-mono mt-0.5">
                Account #{accountNum}
              </div>
              <p className="text-xs font-bold text-gray-800 mt-1">{accountHolder}</p>
              <p className="text-xs text-gray-500 font-medium">{address}</p>
            </div>

            <div className="sm:text-right bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
              <span className="text-[11px] font-bold text-[#0066FF] uppercase tracking-wider block">Total Payable</span>
              <div className="text-3xl font-black text-[#0B132B] font-mono mt-0.5">
                LKR {Number(bill.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] font-medium text-gray-500">Invoice #{bill.bill_number}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700 block">
              Select Payment Method
            </label>

            <div className="grid grid-cols-1 gap-3">
              {/* Option 1: Card */}
              <label 
                onClick={() => setMethod('card')}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  method === 'card' 
                    ? 'border-[#0066FF] bg-blue-50/50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    method === 'card' ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#0B132B] block">Credit / Debit Card</span>
                    <span className="text-[11px] text-gray-500 font-medium">Visa, MasterCard &bull; 3D Secure 2.0 OTP Verified</span>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={method === 'card'} 
                  onChange={() => setMethod('card')} 
                  className="h-4 w-4 text-[#0066FF] focus:ring-[#0066FF]" 
                />
              </label>

              {/* Option 2: LankaQR */}
              <label 
                onClick={() => setMethod('lankaqr')}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  method === 'lankaqr' 
                    ? 'border-[#0066FF] bg-blue-50/50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    method === 'lankaqr' ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <QrCode size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#0B132B] block">LankaQR / Mobile Wallets</span>
                    <span className="text-[11px] text-gray-500 font-medium">FriMi, Genie, eZ Cash, Any Bank LankaQR App</span>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={method === 'lankaqr'} 
                  onChange={() => setMethod('lankaqr')} 
                  className="h-4 w-4 text-[#0066FF] focus:ring-[#0066FF]" 
                />
              </label>

              {/* Option 3: Direct Banking */}
              <label 
                onClick={() => setMethod('banking')}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  method === 'banking' 
                    ? 'border-[#0066FF] bg-blue-50/50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    method === 'banking' ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#0B132B] block">Internet Banking Direct Pay</span>
                    <span className="text-[11px] text-gray-500 font-medium">Commercial Bank, Sampath Vishwa, BOC, People&apos;s Bank</span>
                  </div>
                </div>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={method === 'banking'} 
                  onChange={() => setMethod('banking')} 
                  className="h-4 w-4 text-[#0066FF] focus:ring-[#0066FF]" 
                />
              </label>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Water Tariff Charge</span>
              <span className="font-mono font-bold text-[#0B132B]">
                LKR {Number(bill.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>PayHere Gateway Fee</span>
              <span className="font-bold text-emerald-600">LKR 0.00 (Waived)</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-sm text-[#0B132B]">
              <span>Net Settlement Amount</span>
              <span className="font-mono text-[#0066FF]">
                LKR {Number(bill.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Error notice if any */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="space-y-4 pt-2">
            <button
              onClick={handlePay}
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-black text-sm shadow-[0_12px_24px_-4px_rgba(0,102,255,0.4)] disabled:opacity-50 transition-all cursor-pointer"
            >
              <Lock size={16} />
              {isPending 
                ? 'Securing Payment Authorization...' 
                : `Pay LKR ${Number(bill.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} via PayHere`
              }
            </button>

            {/* Mandatory Bank & PayHere Compliance Notice */}
            <div className="text-[11px] text-gray-500 text-center leading-relaxed space-y-1">
              <p>
                By clicking Pay, you authorize PayHere to charge your selected method in LKR and agree to Vikasha CBO&apos;s{' '}
                <Link href="/terms" target="_blank" className="text-[#0066FF] font-bold underline">Terms &amp; Conditions</Link>,{' '}
                <Link href="/privacy-policy" target="_blank" className="text-[#0066FF] font-bold underline">Privacy Policy</Link>,{' '}
                <Link href="/refund-policy" target="_blank" className="text-[#0066FF] font-bold underline">Refund Policy</Link>, and{' '}
                <Link href="/delivery-policy" target="_blank" className="text-[#0066FF] font-bold underline">Delivery Policy</Link>.
              </p>
              <p className="text-[10px] text-gray-400">
                Vikasha CBO does not store card or banking credentials. All payments are encrypted under 256-bit TLS and processed by PayHere (licensed by CBSL).
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <div>
            &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Community Water Scheme). All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <Link href="/privacy-policy" className="hover:text-[#0B132B]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#0B132B]">Terms</Link>
            <Link href="/refund-policy" className="hover:text-[#0B132B]">Refunds</Link>
            <Link href="/delivery-policy" className="hover:text-[#0B132B]">Delivery</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
