'use client'

import { useState, useTransition } from 'react'
import { searchConsumer, submitReading } from './actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

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
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Enter Meter Reading</h1>
      </div>

      {!consumer && !resultBill && (
        <Card>
          <CardHeader>
            <CardTitle>Search Consumer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Account Number</label>
                <div className="mt-2 flex shadow-sm rounded-md">
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="ACC-00125"
                    className="block w-full rounded-none rounded-l-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="submit"
                    disabled={isPendingSearch || !accountNumber}
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isPendingSearch ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          </CardContent>
        </Card>
      )}

      {consumer && !resultBill && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-50 border-b pb-4">
              <CardTitle className="text-lg">Consumer Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Account Number</p>
                <p className="font-semibold text-gray-900">{consumer.accountNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Consumer Name</p>
                <p className="font-semibold text-gray-900">{consumer.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Previous Reading</p>
                <p className="font-semibold text-gray-900">{lastReading.value}</p>
              </div>
              <div>
                <p className="text-gray-500">Previous Reading Date</p>
                <p className="font-semibold text-gray-900">{new Date(lastReading.date).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 shadow-md">
            <CardContent className="p-6">
              <form onSubmit={handleSubmitReading} className="space-y-4">
                <div>
                  <label className="block text-lg font-medium leading-6 text-gray-900">Current Meter Reading</label>
                  <input
                    type="number"
                    required
                    value={currentReading}
                    onChange={(e) => setCurrentReading(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 py-3 text-gray-900 text-xl shadow-sm ring-1 ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="Enter value"
                    autoFocus
                  />
                  {currentReading && parseInt(currentReading) < lastReading.value && (
                    <p className="text-sm text-red-600 mt-2 font-medium">
                      Warning: Current reading ({currentReading}) is lower than previous reading ({lastReading.value}).
                    </p>
                  )}
                  {currentReading && parseInt(currentReading) >= lastReading.value && (
                    <p className="text-sm text-gray-600 mt-2">
                      Consumption: <strong>{parseInt(currentReading) - lastReading.value} units</strong>
                    </p>
                  )}
                </div>
                
                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPendingSubmit || !currentReading || parseInt(currentReading) < lastReading.value}
                    className="flex-1 rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                  >
                    {isPendingSubmit ? 'Submitting & Generating Bill...' : 'Submit Reading'}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {resultBill && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reading Submitted Successfully</h2>
            
            <div className="text-sm text-gray-700 bg-white p-4 rounded-md inline-block text-left shadow-sm border border-green-100">
              <p><strong>Bill Number:</strong> {resultBill.number}</p>
              <p><strong>Units Consumed:</strong> {resultBill.units}</p>
              <p className="text-lg mt-2"><strong>Calculated Bill:</strong> LKR {resultBill.amount.toLocaleString()}</p>
            </div>
            
            <div className="pt-4 flex justify-center gap-4">
              <Link href={`/bill/${resultBill.token}`} target="_blank" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                View Generated Bill &rarr;
              </Link>
            </div>
            <div className="pt-6">
              <button
                onClick={handleReset}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Enter Another Reading
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
