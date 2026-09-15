'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { resendBillEmail, resendBillSms } from './actions'

export function BillsClientPage({ bills }: { bills: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  const handleResendEmail = (id: string) => {
    setMessage(null)
    startTransition(async () => {
      const res = await resendBillEmail(id)
      if (res.error) setMessage(res.error)
      else setMessage('Email sent successfully.')
      setTimeout(() => setMessage(null), 3000)
    })
  }

  const handleResendSms = (id: string) => {
    setMessage(null)
    startTransition(async () => {
      const res = await resendBillSms(id)
      if (res.error) setMessage(res.error)
      else setMessage('Demo SMS sent successfully.')
      setTimeout(() => setMessage(null), 3000)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bills</h1>
        <p className="text-sm text-gray-500 mt-1">View all generated bills and manage notifications.</p>
      </div>

      {message && (
        <div className="rounded-md bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-800">{message}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Bill Number</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Consumer</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bills && bills.map((b) => (
                  <tr key={b.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{b.bill_number}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{b.consumers?.account_holder_name} ({b.consumers?.account_number})</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(b.created_at).toLocaleDateString()}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900">LKR {b.amount.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${b.status === 'PAID' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <div className="flex justify-end gap-2">
                        <a href={b.pdf_url || '#'} target="_blank" className="text-indigo-600 hover:text-indigo-900">PDF</a>
                        <a href={`/bill/${b.access_token}`} target="_blank" className="text-indigo-600 hover:text-indigo-900">View</a>
                        <button onClick={() => handleResendEmail(b.id)} disabled={isPending} className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50">Email</button>
                        <button onClick={() => handleResendSms(b.id)} disabled={isPending} className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50">SMS</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
