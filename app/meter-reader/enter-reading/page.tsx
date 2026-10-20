'use client'

import { useState, useTransition } from 'react'
import { searchConsumer, submitReading } from './actions'
import { formatDate } from '@/lib/format'
import Link from 'next/link'
import { Search, User, Hash, Calendar, Activity, CheckCircle2, ArrowRight, AlertCircle, Loader2, RotateCcw, Receipt, Droplets, MapPin, Printer } from 'lucide-react'
import { ConsumerRecordSkeleton } from '@/components/ui/Skeleton'

export default function EnterReadingPage() {
  const [accountNumber, setAccountNumber] = useState('')
  const [consumer, setConsumer] = useState<any>(null)
  const [lastReading, setLastReading] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPendingSearch, startTransitionSearch] = useTransition()
  
  const [currentReading, setCurrentReading] = useState('')
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const [resultBill, setResultBill] = useState<any>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setConsumer(null)
    setResultBill(null)
    startTransitionSearch(async () => {
      const result = await searchConsumer(accountNumber)
      if (result.error) {
        setError(result.error)
      } else {
        setConsumer(result.consumer)
        setLastReading(result.lastReading)
      }
    })
  }

  const handleSubmitReading = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    startTransitionSubmit(async () => {
      const formData = new FormData()
      formData.append('consumerId', consumer.id)
      formData.append('accountNumber', consumer.accountNumber || '')
      formData.append('consumerName', consumer.name || '')
      formData.append('currentReading', currentReading)
      formData.append('previousReading', lastReading.value.toString())
      formData.append('lastReadingDate', lastReading.date)
      
      const result = await submitReading(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setResultBill(result.bill)
      }
    })
  }

  const handleReset = () => {
    setAccountNumber('')
    setConsumer(null)
    setLastReading(null)
    setResultBill(null)
    setCurrentReading('')
    setError(null)
  }

  return (
    <div className="space-y-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] p-4 md:p-8 -m-4 md:-m-8">
      
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[13px] font-semibold mb-6 shadow-sm">
            <MapPin size={14} className="text-cyan-400" />
            Field Data Collection
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">Record Meter Reading</h1>
          <p className="text-gray-300 font-medium max-w-xl text-[15px]">Search for a consumer, verify past records, and enter the current reading to generate a bill instantly.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Step 1: Search */}
        {!consumer && !resultBill && (
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0066FF]">
                <Search size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0B132B]">Search Consumer</h2>
                <p className="text-gray-500 font-medium">Enter the account number to proceed</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Account Number</label>
                <div className="relative flex">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="e.g. CON-1042"
                    className="block w-full pl-11 rounded-l-2xl border-gray-200 bg-gray-50/50 py-4 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:bg-white focus:ring-[#0066FF] text-lg font-bold transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isPendingSearch || !accountNumber}
                    className="relative -ml-px flex items-center justify-center gap-2 rounded-r-2xl bg-[#0066FF] px-8 py-4 text-[15px] font-bold text-white shadow-sm hover:bg-[#0052CC] transition-colors disabled:opacity-50"
                  >
                    {isPendingSearch ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                  <p className="text-sm font-bold text-red-600">{error}</p>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Searching Consumer Skeleton */}
        {isPendingSearch && !consumer && (
          <ConsumerRecordSkeleton />
        )}

        {/* Step 2: Enter Reading */}
        {consumer && !resultBill && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Consumer Details Card */}
            <div className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-gray-50/80 px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0B132B] flex items-center gap-2.5">
                  <User size={18} className="text-[#0066FF]" />
                  Consumer Verified
                </h2>
                <button onClick={handleReset} className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <RotateCcw size={14} /> Change
                </button>
              </div>
              <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Acc Number</p>
                  <p className="font-bold text-[#0B132B]">{consumer.accountNumber}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Name</p>
                  <p className="font-bold text-[#0B132B] truncate">{consumer.name}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Reading</p>
                  <p className="font-bold text-[#0066FF] text-lg leading-tight">{lastReading.value}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Date</p>
                  <p className="font-bold text-gray-600">{formatDate(lastReading.date)}</p>
                </div>
              </div>
            </div>

            {/* Reading Input Card */}
            <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-[28px] p-8 md:p-10 shadow-xl border border-gray-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[40px] pointer-events-none -mr-20 -mt-20"></div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-400 backdrop-blur-sm border border-white/10">
                  <Activity size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Record New Reading</h2>
                  <p className="text-gray-400 font-medium">Enter the value currently shown on the meter</p>
                </div>
              </div>

              <form onSubmit={handleSubmitReading} className="space-y-6 relative z-10">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Droplets size={24} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      value={currentReading}
                      onChange={(e) => setCurrentReading(e.target.value)}
                      className="block w-full pl-14 rounded-2xl bg-white/10 border border-white/20 py-5 text-white placeholder-gray-500 shadow-sm focus:border-cyan-400 focus:ring-cyan-400 text-3xl font-black transition-colors"
                      placeholder="0"
                      autoFocus
                    />
                  </div>
                  
                  {currentReading && parseInt(currentReading) < lastReading.value && (
                    <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3">
                      <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-red-200">
                        <strong className="text-red-400">Warning:</strong> Current reading ({currentReading}) is lower than previous reading ({lastReading.value}).
                      </p>
                    </div>
                  )}
                  {currentReading && parseInt(currentReading) >= lastReading.value && (
                    <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-200 uppercase tracking-widest">Total Consumption</span>
                      <span className="text-2xl font-black text-emerald-400">{parseInt(currentReading) - lastReading.value} Units</span>
                    </div>
                  )}
                </div>
                
                {error && (
                  <div className="rounded-xl bg-red-500/20 p-4 border border-red-500/30">
                    <p className="text-sm font-bold text-red-400 text-center">{error}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-2xl bg-white/5 px-6 py-4 text-[15px] font-bold text-white shadow-sm hover:bg-white/10 transition-colors border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPendingSubmit || !currentReading || parseInt(currentReading) < lastReading.value}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-[#0066FF] px-6 py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_-4px_rgba(0,200,255,0.4)] hover:shadow-[0_12px_24px_-4px_rgba(0,200,255,0.5)] transition-all disabled:opacity-50 hover:-translate-y-0.5"
                  >
                    {isPendingSubmit ? (
                      <><Loader2 size={20} className="animate-spin" /> Processing...</>
                    ) : (
                      'Submit & Generate Bill'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 3: Success Result */}
        {resultBill && (
          <div className="bg-white rounded-[28px] p-8 md:p-12 shadow-xl border border-gray-100 text-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 mb-6 border-8 border-emerald-50/50">
              <CheckCircle2 size={40} className="text-emerald-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-[#0B132B] mb-2">Reading Submitted!</h2>
            <p className="text-gray-500 font-medium mb-8">Bill has been successfully generated for this consumer.</p>
            
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 max-w-sm mx-auto space-y-4 mb-8 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Bill Number</span>
                <span className="font-black text-[#0B132B]">{resultBill.number}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Consumption</span>
                <span className="font-bold text-gray-700">{resultBill.units} Units</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Total Bill</span>
                <span className="text-2xl font-black text-[#00C853]">Rs {resultBill.amount.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl bg-gray-50 border border-gray-200 px-5 py-3 text-[14px] font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Record Another
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 hover:bg-black px-5 py-3 text-[14px] font-bold text-white transition-colors shadow-sm"
              >
                <Printer size={16} /> Print Field Slip
              </button>
              <Link 
                href={`/bill/${resultBill.token}`} 
                target="_blank" 
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0088FF] px-5 py-3 text-[14px] font-bold text-white shadow-md shadow-blue-500/25 hover:-translate-y-0.5 transition-all"
              >
                <Receipt size={16} /> View Digital Bill
              </Link>
            </div>

            {/* Printable Thermal Slip for Field Bluetooth / Handheld Printer */}
            <div className="hidden print:block text-black font-mono text-[11px] leading-tight text-left border border-black p-4 mt-6 mx-auto max-w-[280px]">
              <div className="text-center pb-2 border-b border-dashed border-black">
                <div className="font-bold text-sm">VIKASHA CBO</div>
                <div className="text-[10px]">COMMUNITY WATER PROJECT</div>
                <div className="text-[10px]">MAGAMMANA, HOMAGAMA</div>
                <div className="text-[10px]">HOTLINE: 011 289 4567</div>
              </div>
              <div className="py-2 border-b border-dashed border-black space-y-1">
                <div>DATE: {new Date().toLocaleDateString('en-GB')}</div>
                <div>ACC NO: #{resultBill.accountNumber || consumer?.accountNumber}</div>
                <div>NAME: {resultBill.consumerName || consumer?.name}</div>
                <div>INV NO: {resultBill.number}</div>
              </div>
              <div className="py-2 border-b border-dashed border-black space-y-1">
                <div>PREV READING: {lastReading?.value || 0}</div>
                <div>CURR READING: {currentReading}</div>
                <div className="font-bold">UNITS CONSUMED: {resultBill.units} UNITS</div>
              </div>
              <div className="py-2 border-b border-black">
                <div className="text-sm font-bold text-right">TOTAL: LKR {Number(resultBill.amount).toFixed(2)}</div>
              </div>
              <div className="text-center pt-2 text-[10px]">
                <div>PAY ONLINE: support@vikashacbo.com</div>
                <div>CONSERVE WATER &bull; SAVE LIFE</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
