'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addBillingRule } from './actions'
import { calculateBill, Slab } from '@/lib/billing/engine'

export function BillingRulesClientPage({ existingRules }: { existingRules: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  const [name, setName] = useState('')
  const [effectiveFrom, setEffectiveFrom] = useState('')
  const [effectiveTo, setEffectiveTo] = useState('')
  
  const [slabs, setSlabs] = useState<Slab[]>([
    { from_unit: 0, to_unit: 100, type: 'FIXED', rate: 1000, order_index: 1 }
  ])

  const [previewUnits, setPreviewUnits] = useState(250)
  
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
    startTransition(async () => {
      const result = await addBillingRule({
        name, effectiveFrom, effectiveTo, slabs
      })
      if (result.error) {
        setError(result.error)
      } else {
        setName('')
        setEffectiveFrom('')
        setEffectiveTo('')
        setSlabs([{ from_unit: 0, to_unit: 100, type: 'FIXED', rate: 1000, order_index: 1 }])
      }
    })
  }

  const preview = calculateBill(previewUnits, { id: 'preview', name: 'Preview', slabs })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Billing Rules</h1>
        <p className="text-sm text-gray-500 mt-1">Manage tariff calculations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Create Billing Rule</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Rule Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Standard September Tariff" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />
                </div>
                <div />
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Effective From</label>
                  <input required type="date" value={effectiveFrom} onChange={e => setEffectiveFrom(e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Effective To (Optional)</label>
                  <input type="date" value={effectiveTo} onChange={e => setEffectiveTo(e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Slabs</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] gap-2 text-sm font-medium text-gray-700">
                    <div>From Unit</div>
                    <div>To Unit (Empty=∞)</div>
                    <div>Type</div>
                    <div>Rate (LKR)</div>
                    <div></div>
                  </div>
                  {slabs.map((slab, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] gap-2 items-center">
                      <input type="number" required value={slab.from_unit} onChange={e => handleUpdateSlab(idx, 'from_unit', parseInt(e.target.value))} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm" />
                      <input type="number" value={slab.to_unit || ''} onChange={e => handleUpdateSlab(idx, 'to_unit', e.target.value ? parseInt(e.target.value) : null)} placeholder="∞" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm" />
                      <select value={slab.type} onChange={e => handleUpdateSlab(idx, 'type', e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                        <option value="FIXED">FIXED</option>
                        <option value="PER_UNIT">PER UNIT</option>
                      </select>
                      <input type="number" required value={slab.rate} onChange={e => handleUpdateSlab(idx, 'rate', parseFloat(e.target.value))} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm" />
                      <button type="button" onClick={() => handleRemoveSlab(idx)} className="text-red-500 hover:text-red-700 px-2">X</button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddSlab} className="mt-3 text-sm text-indigo-600 hover:text-indigo-800">+ Add Slab</button>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button type="submit" disabled={isPending} className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50">
                {isPending ? 'Saving...' : 'Save Rule'}
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">Test Units</label>
                <input type="number" value={previewUnits} onChange={e => setPreviewUnits(parseInt(e.target.value) || 0)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm" />
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Breakdown</h5>
                <ul className="space-y-1 text-sm text-gray-600 mb-4">
                  {preview.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{item.description}</span>
                      <span>LKR {item.amount.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between border-t pt-2 font-bold text-gray-900">
                  <span>Total:</span>
                  <span>LKR {preview.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Existing Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-gray-100">
                {existingRules.map((rule) => (
                  <li key={rule.id} className="py-3">
                    <p className="text-sm font-medium text-gray-900">{rule.name}</p>
                    <p className="text-xs text-gray-500">{new Date(rule.effective_from).toLocaleDateString()} - {rule.effective_to ? new Date(rule.effective_to).toLocaleDateString() : 'Ongoing'}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
