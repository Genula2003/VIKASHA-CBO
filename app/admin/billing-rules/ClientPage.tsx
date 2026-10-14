'use client'

import { useState, useTransition } from 'react'
import { addBillingRule } from './actions'
import { calculateBill, Slab } from '@/lib/billing/engine'
import { formatDate } from '@/lib/format'
import { Calculator, Settings2, Plus, X, Calendar, Receipt, Hash, BarChart3, Loader2, IndianRupee } from 'lucide-react'

export function BillingRulesClientPage({ existingRules }: { existingRules: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  
  const [name, setName] = useState('')
  const [effectiveFrom, setEffectiveFrom] = useState('')
  const [effectiveTo, setEffectiveTo] = useState('')
  
  const [slabs, setSlabs] = useState<Slab[]>([
    { from_unit: 0, to_unit: null, type: 'PER_UNIT', rate: 0, order_index: 1 }
  ])

  const [previewUnits, setPreviewUnits] = useState(0)
  
  const handleAddSlab = () => {
    const lastSlab = slabs[slabs.length - 1]
    const nextFrom = lastSlab && lastSlab.to_unit ? lastSlab.to_unit + 1 : 0
    setSlabs([...slabs, { from_unit: nextFrom, to_unit: null, type: 'PER_UNIT', rate: 0, order_index: slabs.length + 1 }])
  }

  const handleUpdateSlab = (index: number, field: keyof Slab, value: any) => {
    const newSlabs = [...slabs]
    newSlabs[index] = { ...newSlabs[index], [field]: value }
    setSlabs(newSlabs)
  }

  const handleRemoveSlab = (index: number) => {
    setSlabs(slabs.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    startTransition(async () => {
      const result = await addBillingRule({
        name, effectiveFrom, effectiveTo, slabs
      })
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setName('')
        setEffectiveFrom('')
        setEffectiveTo('')
        setSlabs([{ from_unit: 0, to_unit: null, type: 'PER_UNIT', rate: 0, order_index: 1 }])
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  const preview = calculateBill(previewUnits, { id: 'preview', name: 'Preview', slabs })

  return (
    <div className="space-y-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] p-4 md:p-8 -m-4 md:-m-8">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[13px] font-semibold mb-6 shadow-sm">
              <Calculator size={14} className="text-cyan-400" />
              Tariff Configuration
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">Billing Rules Engine</h1>
            <p className="text-gray-300 font-medium max-w-xl text-[15px]">Define dynamic pricing slabs, fixed charges, and seasonal tariffs for automated bill generation.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        
        {/* Left Column: Form */}
        <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066FF]">
              <Settings2 size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold text-[#0B132B]">Create Billing Rule</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Rule Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Receipt size={16} className="text-gray-400" />
                  </div>
                  <input required value={name} onChange={e => setName(e.target.value)} className="block w-full pl-10 rounded-xl border-gray-200 bg-gray-50/50 py-3 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:bg-white focus:ring-[#0066FF] sm:text-sm font-medium transition-colors" placeholder="e.g. Standard September Tariff" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Effective From *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input required type="date" value={effectiveFrom} onChange={e => setEffectiveFrom(e.target.value)} className="block w-full pl-10 rounded-xl border-gray-200 bg-gray-50/50 py-3 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:bg-white focus:ring-[#0066FF] sm:text-sm font-medium transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Effective To (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input type="date" value={effectiveTo} onChange={e => setEffectiveTo(e.target.value)} className="block w-full pl-10 rounded-xl border-gray-200 bg-gray-50/50 py-3 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:bg-white focus:ring-[#0066FF] sm:text-sm font-medium transition-colors" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[14px] font-bold text-[#0066FF] uppercase tracking-wide flex items-center gap-2">
                  <BarChart3 size={16} /> Tariff Slabs Configuration
                </h4>
              </div>

              <div className="space-y-4">
                <div className="hidden md:grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] gap-3 px-2 text-[12px] font-black text-gray-500 uppercase tracking-wider">
                  <div>From Unit</div>
                  <div>To Unit (Empty=∞)</div>
                  <div>Charge Type</div>
                  <div>Rate (Rs)</div>
                  <div className="w-8"></div>
                </div>
                
                {slabs.map((slab, idx) => (
                  <div key={idx} className="relative group grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr_1fr_auto] gap-3 items-center bg-gray-50/50 p-4 md:p-2 rounded-2xl md:rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                    
                    <div className="md:hidden text-[11px] font-bold text-gray-400 uppercase mb-1">From Unit</div>
                    <input type="number" required value={slab.from_unit} onChange={e => handleUpdateSlab(idx, 'from_unit', parseInt(e.target.value))} className="block w-full rounded-lg border-gray-200 bg-white py-2 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:ring-[#0066FF] sm:text-sm font-medium" />
                    
                    <div className="md:hidden text-[11px] font-bold text-gray-400 uppercase mt-2 mb-1">To Unit</div>
                    <input type="number" value={slab.to_unit || ''} onChange={e => handleUpdateSlab(idx, 'to_unit', e.target.value ? parseInt(e.target.value) : null)} placeholder="∞" className="block w-full rounded-lg border-gray-200 bg-white py-2 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:ring-[#0066FF] sm:text-sm font-medium" />
                    
                    <div className="md:hidden text-[11px] font-bold text-gray-400 uppercase mt-2 mb-1">Charge Type</div>
                    <select value={slab.type} onChange={e => handleUpdateSlab(idx, 'type', e.target.value)} className="block w-full rounded-lg border-gray-200 bg-white py-2 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:ring-[#0066FF] sm:text-sm font-medium font-bold text-[#0066FF]">
                      <option value="FIXED">FIXED CHARGE</option>
                      <option value="PER_UNIT">PER UNIT RATE</option>
                    </select>
                    
                    <div className="md:hidden text-[11px] font-bold text-gray-400 uppercase mt-2 mb-1">Rate</div>
                    <input type="number" required value={slab.rate} onChange={e => handleUpdateSlab(idx, 'rate', parseFloat(e.target.value))} className="block w-full rounded-lg border-gray-200 bg-white py-2 text-[#0B132B] shadow-sm focus:border-[#0066FF] focus:ring-[#0066FF] sm:text-sm font-medium" />
                    
                    <button type="button" onClick={() => handleRemoveSlab(idx)} className="absolute top-3 right-3 md:relative md:top-0 md:right-0 flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                      <X size={16} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
              
              <button type="button" onClick={handleAddSlab} className="mt-5 flex items-center gap-2 text-[14px] font-bold text-[#0066FF] hover:text-[#0052CC] bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 rounded-xl transition-colors">
                <Plus size={16} strokeWidth={3} /> Add New Slab
              </button>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                <p className="text-sm font-bold text-red-600 text-center">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100">
                <p className="text-sm font-bold text-emerald-600 text-center">
                  Billing rule saved successfully!
                </p>
              </div>
            )}

            <button type="submit" disabled={isPending} className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0088FF] py-3.5 px-4 text-[15px] font-bold text-white shadow-[0_8px_20px_-4px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_24px_-4px_rgba(0,102,255,0.5)] transition-all disabled:opacity-50 hover:-translate-y-0.5 mt-4">
              {isPending ? (
                <><Loader2 size={18} className="animate-spin" /> Saving Rule...</>
              ) : (
                'Save Billing Rule'
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Preview + Existing */}
        <div className="space-y-8">
          
          {/* Live Preview Card */}
          <div className="bg-gradient-to-b from-[#0B132B] to-[#1C2541] rounded-[28px] p-8 shadow-xl border border-gray-800 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[30px] pointer-events-none"></div>
             
             <h2 className="text-lg font-bold mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                  <Calculator size={18} strokeWidth={2.5} />
                </div>
                Live Preview
             </h2>
             
             <div className="space-y-5 relative z-10">
               <div>
                 <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Test Consumption (Units)</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                     <Hash size={14} className="text-gray-400" />
                   </div>
                   <input type="number" value={previewUnits} onChange={e => setPreviewUnits(parseInt(e.target.value) || 0)} className="block w-full pl-10 rounded-xl bg-white/10 border border-white/20 py-2.5 text-white placeholder-gray-400 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 sm:text-sm font-bold transition-colors" />
                 </div>
               </div>
               
               <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                 <h5 className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest">Calculation Breakdown</h5>
                 <ul className="space-y-2.5 text-[13px] font-medium text-gray-300 mb-5">
                   {preview.items.map((item, i) => (
                     <li key={i} className="flex justify-between items-center">
                       <span>{item.description}</span>
                       <span className="text-white">Rs {item.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                     </li>
                   ))}
                   {preview.items.length === 0 && (
                     <li className="text-center text-gray-500 py-2">No applicable slabs</li>
                   )}
                 </ul>
                 <div className="flex justify-between items-center border-t border-white/10 pt-4 font-bold">
                   <span className="text-gray-300 uppercase text-[12px] tracking-wider">Total Bill Amount</span>
                   <span className="text-xl text-emerald-400">Rs {preview.totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                 </div>
               </div>
             </div>
          </div>
          
          {/* Existing Rules */}
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#0B132B] mb-6 flex items-center gap-2">
              <Settings2 size={18} className="text-gray-400" />
              Existing Rules
            </h2>
            
            <div className="space-y-3">
              {existingRules && existingRules.length > 0 ? (
                existingRules.map((rule) => (
                  <div key={rule.id} className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-100 hover:border-blue-100 transition-colors group cursor-default">
                    <h3 className="text-[14px] font-bold text-[#0B132B] mb-1">{rule.name}</h3>
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-500" suppressHydrationWarning>
                      <Calendar size={12} />
                      {formatDate(rule.effective_from)} 
                      <span className="text-gray-300 mx-1">→</span> 
                      {rule.effective_to ? formatDate(rule.effective_to) : 'Ongoing'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm font-bold text-gray-400">No billing rules found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
