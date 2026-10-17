import { getBillByAccessToken } from '@/lib/services/consumer-lookup'
import { PaymentClientPage } from './ClientPage'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { AlertCircle, ArrowLeft, CheckCircle2, Droplet, MapPin, Mail, Phone, Clock, Shield } from 'lucide-react'

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
      <div className="min-h-screen bg-[#040D1A] text-slate-100 flex flex-col justify-between relative font-sans">
        <Navbar activeTab="billing" />
        
        <div 
          className="fixed inset-0 bg-cover bg-center pointer-events-none opacity-40 z-0"
          style={{ backgroundImage: `url('/pay-water-dark-navy.jpg')` }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-[#081B38]/90 via-[#040D1A]/80 to-[#020e1e]/95 pointer-events-none z-0" />

        <div className="relative z-10 max-w-md w-full mx-auto px-4 pt-36 pb-20 flex-1 flex items-center justify-center">
          <div className="w-full backdrop-blur-2xl bg-[#081B38]/70 rounded-[32px] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
              <AlertCircle size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Payment Link Expired or Invalid</h2>
              <p className="text-xs text-slate-300 font-medium mt-1.5 leading-relaxed">
                We could not locate this payment session. Please search your account again on the quick pay portal.
              </p>
            </div>
            <Link
              href="/pay"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/30 border border-blue-400/30"
            >
              <ArrowLeft size={16} /> Return to Quick Pay
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#020e1e] text-white pt-12 pb-8 border-t border-slate-800 relative z-10 w-full text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Vikasha CBO &bull; Magammana Community Water Project.</p>
        </footer>
      </div>
    )
  }

  if (bill.status === 'PAID') {
    return (
      <div className="min-h-screen bg-[#040D1A] text-slate-100 flex flex-col justify-between relative font-sans">
        <Navbar activeTab="billing" />
        
        <div 
          className="fixed inset-0 bg-cover bg-center pointer-events-none opacity-40 z-0"
          style={{ backgroundImage: `url('/pay-water-dark-navy.jpg')` }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-[#081B38]/90 via-[#040D1A]/80 to-[#020e1e]/95 pointer-events-none z-0" />

        <div className="relative z-10 max-w-md w-full mx-auto px-4 pt-36 pb-20 flex-1 flex items-center justify-center">
          <div className="w-full backdrop-blur-2xl bg-[#081B38]/70 rounded-[32px] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Bill Already Settled</h2>
              <p className="text-xs text-slate-300 font-medium mt-1.5 leading-relaxed">
                Invoice #{bill.bill_number} has already been paid in full. No balance is pending for this period.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href={`/bill/${token}`}
                className="px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white font-bold text-xs hover:bg-white/15 transition-colors text-center"
              >
                View Receipt
              </Link>
              <Link
                href="/pay"
                className="px-4 py-3 rounded-2xl bg-[#0066FF] text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/30 text-center border border-blue-400/30"
              >
                Search Another
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#020e1e] text-white pt-12 pb-8 border-t border-slate-800 relative z-10 w-full text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Vikasha CBO &bull; Magammana Community Water Project.</p>
        </footer>
      </div>
    )
  }

  return <PaymentClientPage bill={bill} />
}
