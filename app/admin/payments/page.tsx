import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function PaymentsPage() {
  const supabase = await createClient()

  const { data: payments } = await supabase
    .from('payments')
    .select('*, bills(bill_number, consumers(account_number, account_holder_name))')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payments</h1>
        <p className="text-sm text-gray-500 mt-1">View all received payments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Transaction ID</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Consumer</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bill Number</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments && payments.map((p) => (
                  <tr key={p.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{p.transaction_id}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(p.created_at).toLocaleString()}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.bills?.consumers?.account_holder_name} ({p.bills?.consumers?.account_number})</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.bills?.bill_number}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900">LKR {p.amount.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.method}</td>
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
