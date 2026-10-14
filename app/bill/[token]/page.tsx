import { getBillByAccessToken } from '@/lib/services/consumer-lookup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/format'
import Link from 'next/link'
import { Download, Droplet, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PublicBillPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const { bill } = await getBillByAccessToken(token)

  if (!bill) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center p-8">
          <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Bill Link</h2>
          <p className="text-gray-600 mb-6">The link you followed is invalid, expired, or the bill does not exist.</p>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            <ArrowLeft size={16} /> Return to Pay Portal
          </Link>
        </Card>
      </div>
    )
  }

  const isPaid = bill.status === 'PAID'
  const consumer = bill.consumers || {}
  const readings = bill.meter_readings || { previous_reading: 0, current_reading: 0, units_consumed: 0 }
  const calculationItems = bill.bill_calculation_items || []

  return (
    <div className="min-h-screen bg-[#F7F7F4] py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#004EEB] selection:text-white font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/pay" className="p-2.5 rounded-lg bg-white border border-[#E2E0D8] text-[#475467] hover:text-[#0A1120] transition-colors shadow-sm">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-[#0A1120] tracking-tight">Official Municipal E-Bill</h1>
              <p className="text-xs text-[#667085] font-medium">Verified by National Water Supply &amp; Drainage Board Standard</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {bill.pdf_url && (
              <a href={bill.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-1.5 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-[#0A1120] shadow-sm border border-[#D0D5DD] hover:bg-[#F0EFEA] transition-colors">
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            )}
            {!isPaid && (
              <Link href={`/pay/${token}`} className="rounded-lg bg-[#004EEB] hover:bg-[#003CC7] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors">
                Pay Bill Now
              </Link>
            )}
          </div>
        </div>

        {/* Bill Container */}
        <Card className="border border-[#E2E0D8] shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-[#0A1120] text-white p-6 sm:p-8 flex flex-row justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2 border border-blue-400/20">
                <Droplet size={14} /> Vikasha CBO &bull; Magammana Community Water Project
              </div>
              <CardTitle className="text-2xl font-black text-white">Invoice #{bill.bill_number}</CardTitle>
              <p className="text-xs text-gray-400 mt-1 font-medium">Issued for Account {consumer.account_number}</p>
            </div>
            <div className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
              isPaid ? 'bg-emerald-500 text-white shadow-sm' : 'bg-amber-400 text-gray-900 shadow-sm'
            }`}>
              {bill.status}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Number</p>
                  <p className="text-lg font-black text-gray-900 font-mono mt-0.5">{consumer.account_number}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Holder</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{consumer.account_holder_name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Service Address</p>
                  <p className="text-xs font-medium text-gray-600 mt-0.5">{consumer.address || 'Registered Community Address'}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-slate-50/60 space-y-3">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meter Reading Verification</div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Previous Meter Reading:</span>
                  <span className="font-mono font-bold text-gray-900">{readings.previous_reading} units</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Current Meter Reading:</span>
                  <span className="font-mono font-bold text-gray-900">{readings.current_reading} units</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-sm">
                  <span className="font-bold text-gray-900">Total Units Consumed:</span>
                  <span className="font-black text-blue-600 font-mono">{readings.units_consumed} Units</span>
                </div>
              </div>
            </div>
            
            {/* Calculation Breakdown */}
            <div className="border-t border-gray-100 p-6 sm:p-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Official NWSDB Tariff Breakdown</h3>
              <ul className="space-y-2.5">
                {calculationItems.map((item: any, idx: number) => (
                  <li key={idx} className="flex justify-between text-xs sm:text-sm text-gray-700 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    <span className="font-medium text-gray-800">{item.description}</span>
                    <span className="font-mono font-bold text-gray-900">LKR {Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Payable Balance</span>
                  <p className="text-xs text-gray-500 font-medium">Due Date: {formatDate(bill.due_date)}</p>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0B132B]">
                  LKR {Number(bill.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {!isPaid && (
                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                  <Link
                    href={`/pay/${token}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-sm shadow-md hover:from-blue-700 hover:to-blue-600 transition-all"
                  >
                    Proceed to Online Payment
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
