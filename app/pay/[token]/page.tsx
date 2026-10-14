import { getBillByAccessToken } from '@/lib/services/consumer-lookup'
import { PaymentClientPage } from './ClientPage'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, Droplet } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PayPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const { bill } = await getBillByAccessToken(token)

  if (!bill) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-[#0B132B]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-black text-gray-900">Payment Link Expired or Invalid</h2>
          <p className="text-sm text-gray-500 font-medium">
            We could not locate this payment session. Please look up your account again on the quick pay portal.
          </p>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0066FF] text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-sm"
          >
            <ArrowLeft size={16} /> Return to Quick Pay
          </Link>
        </div>
      </div>
    )
  }

  if (bill.status === 'PAID') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-[#0B132B]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Droplet size={28} />
          </div>
          <h2 className="text-xl font-black text-gray-900">Bill Already Settled</h2>
          <p className="text-sm text-gray-500 font-medium">
            Invoice #{bill.bill_number} has already been paid in full. No balance is pending for this period.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Link
              href={`/bill/${token}`}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
            >
              View Receipt
            </Link>
            <Link
              href="/pay"
              className="px-5 py-2.5 rounded-xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-600 transition-colors"
            >
              Search Another
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <PaymentClientPage bill={bill} />
}
