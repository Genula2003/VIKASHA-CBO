import { getBillByAccessToken } from '@/lib/services/consumer-lookup'
import { PaymentClientPage } from './ClientPage'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, Droplet, CheckCircle2 } from 'lucide-react'

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
      <div className="min-h-screen bg-[#F0F6FF] flex flex-col items-center justify-center p-6 text-[#081B38] relative font-sans">
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-40 pointer-events-none"
          style={{ backgroundImage: `url('/pay-water-bg.jpg')` }}
        />
        <div className="max-w-md w-full bg-white rounded-[32px] p-8 shadow-[0_25px_70px_rgba(8,27,56,0.12)] border border-white/80 text-center space-y-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
            <AlertCircle size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#081B38]">Payment Link Expired or Invalid</h2>
            <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
              We could not locate this payment session. Please search your account again on the quick pay portal.
            </p>
          </div>
          <Link
            href="/pay"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-[0_8px_20px_rgba(0,102,255,0.25)]"
          >
            <ArrowLeft size={16} /> Return to Quick Pay
          </Link>
        </div>
      </div>
    )
  }

  if (bill.status === 'PAID') {
    return (
      <div className="min-h-screen bg-[#F0F6FF] flex flex-col items-center justify-center p-6 text-[#081B38] relative font-sans">
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-40 pointer-events-none"
          style={{ backgroundImage: `url('/pay-water-bg.jpg')` }}
        />
        <div className="max-w-md w-full bg-white rounded-[32px] p-8 shadow-[0_25px_70px_rgba(8,27,56,0.12)] border border-white/80 text-center space-y-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#081B38]">Bill Already Settled</h2>
            <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
              Invoice #{bill.bill_number} has already been paid in full. No balance is pending for this period.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href={`/bill/${token}`}
              className="px-4 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors text-center"
            >
              View Receipt
            </Link>
            <Link
              href="/pay"
              className="px-4 py-3 rounded-2xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-sm text-center"
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
