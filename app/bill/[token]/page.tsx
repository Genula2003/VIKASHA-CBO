import { createAdminClient } from '@/lib/supabase/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Download } from 'lucide-react'

export default async function PublicBillPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const supabase = createAdminClient()

  // Fetch bill using secure access token
  const { data: bill, error } = await supabase
    .from('bills')
    .select(`
      *,
      consumers(account_number, account_holder_name),
      meter_readings(previous_reading, current_reading, units_consumed),
      bill_calculation_items(description, amount)
    `)
    .eq('access_token', token)
    .single()

  if (error || !bill) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center p-8">
          <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Bill Link</h2>
          <p className="text-gray-600">The link you followed is invalid, expired, or the bill does not exist.</p>
        </Card>
      </div>
    )
  }

  const isPaid = bill.status === 'PAID'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">E-Bill</h1>
          <div className="flex space-x-3">
            {bill.pdf_url && (
              <a href={bill.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Download className="-ml-0.5 h-4 w-4" />
                Download PDF
              </a>
            )}
            {!isPaid && (
              <Link href={`/pay/${token}`} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Pay Bill
              </Link>
            )}
          </div>
        </div>

        <Card>
          <CardHeader className="bg-slate-900 text-white rounded-t-lg flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Bill Details</CardTitle>
              <p className="text-slate-300 mt-1">Number: {bill.bill_number}</p>
            </div>
            <div className={`px-4 py-1 rounded-full text-sm font-bold ${isPaid ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
              {bill.status}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="text-lg font-semibold">{bill.consumers.account_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Holder</p>
                  <p className="text-lg font-semibold">{bill.consumers.account_holder_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Billing Period</p>
                  <p className="font-semibold">{new Date(bill.billing_period_start).toLocaleDateString()} - {new Date(bill.billing_period_end).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="p-6 bg-gray-50 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Previous Reading</span>
                  <span className="font-semibold">{bill.meter_readings.previous_reading}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Reading</span>
                  <span className="font-semibold">{bill.meter_readings.current_reading}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-500 font-medium">Units Consumed</span>
                  <span className="font-bold text-indigo-600">{bill.meter_readings.units_consumed}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Calculation Breakdown</h3>
              <ul className="space-y-2">
                {bill.bill_calculation_items.map((item: any, idx: number) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.description}</span>
                    <span className="font-medium">LKR {item.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total Payable</span>
                <span className="text-2xl font-bold text-indigo-600">LKR {bill.amount.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500 text-right mt-2">Due Date: {new Date(bill.due_date).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
