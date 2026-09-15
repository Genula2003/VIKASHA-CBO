'use client'

import { useState, useTransition } from 'react'
import { processDemoPayment } from './actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export function PaymentClientPage({ bill }: { bill: any }) {
  const [method, setMethod] = useState('Card')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handlePay = () => {
    setError(null)
    startTransition(async () => {
      const result = await processDemoPayment(bill.access_token, method)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
      }
    })
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center p-8 border-green-200 bg-green-50">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h2>
          <p className="text-gray-600 mb-6">Your payment for Bill {bill.bill_number} has been processed.</p>
          <Link href={`/bill/${bill.access_token}`} className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Return to Bill
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-slate-900 text-white rounded-t-lg">
          <CardTitle>Demo Payment Gateway</CardTitle>
          <p className="text-xs text-slate-400">PayHere is not connected.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <p className="text-sm text-gray-500">Payment Amount</p>
            <p className="text-4xl font-bold text-gray-900">LKR {bill.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Bill Number: {bill.bill_number}</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-900">Payment Method</label>
            <div className="space-y-2">
              {['Card', 'Bank Transfer', 'Mobile Payment'].map(m => (
                <label key={m} className={`flex items-center p-3 border rounded-md cursor-pointer ${method === m ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600" />
                  <span className="ml-3 block text-sm font-medium text-gray-900">{m}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="pt-4">
            <button
              onClick={handlePay}
              disabled={isPending}
              className="w-full rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              {isPending ? 'Processing Payment...' : 'Pay Now'}
            </button>
          </div>
          
          <div className="text-center">
            <Link href={`/bill/${bill.access_token}`} className="text-sm text-gray-500 hover:text-gray-900">
              Cancel and return to bill
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
