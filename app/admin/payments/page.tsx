import { getAllPayments } from '@/lib/services/system-store'
import { formatDate } from '@/lib/format'
import { CreditCard, Wallet, ArrowRightLeft, Hash, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PaymentsPage() {
  const storePayments = getAllPayments()

  const payments = storePayments.map(p => ({
    id: p.id,
    transaction_id: p.transaction_id,
    amount: p.amount,
    method: p.method,
    status: p.status,
    created_at: p.paid_at,
    bills: {
      bill_number: p.bill_number,
      consumers: {
        account_number: p.account_number,
        account_holder_name: p.account_holder_name
      }
    }
  }))

  const totalRevenue = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[12px] font-semibold mb-4 shadow-sm">
              <Wallet size={14} className="text-emerald-400" />
              Municipal Revenue Reconciliation
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">Payment History &amp; Settlements</h1>
            <p className="text-gray-300 font-medium max-w-xl text-sm leading-relaxed">
              Audit log of all settled water bills, merchant gateway transactions, and counter receipts.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
            <span className="text-[11px] font-bold text-gray-300 uppercase block">Total Reconciled</span>
            <div className="text-2xl font-black text-emerald-400">
              LKR {totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066FF]">
               <ArrowRightLeft size={20} strokeWidth={2.5} />
             </div>
             <div>
               <h2 className="text-base font-black text-[#0B132B]">Verified Transactions</h2>
               <p className="text-xs text-gray-400 font-medium">Recorded payment audits with cryptographic transaction hashes</p>
             </div>
           </div>
           
           <div className="bg-gray-50 px-3.5 py-1.5 rounded-xl text-xs font-bold text-gray-500 border border-gray-200">
             Total Records: {payments.length}
           </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-left text-xs">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="py-3.5 pl-5 pr-3 font-bold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Consumer Details</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Bill Ref</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Date &amp; Time</th>
                <th className="px-3 py-3.5 font-bold text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-3 py-3.5 pr-5 text-right font-bold text-gray-400 uppercase tracking-wider">Amount Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-5 pr-3 font-mono font-bold text-[#0B132B]">
                      <div className="flex items-center gap-1.5">
                        <Hash size={13} className="text-gray-400" />
                        <span>{p.transaction_id}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="font-bold text-[#0B132B]">{p.bills?.consumers?.account_holder_name || 'Community Consumer'}</div>
                      <div className="text-[11px] font-mono text-[#0066FF] mt-0.5">Acc #{p.bills?.consumers?.account_number}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 font-mono font-bold text-gray-700">
                      {p.bills?.bill_number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-gray-500 font-medium">
                      {formatDate(p.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        <CreditCard size={12} />
                        {p.method}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-5 text-right">
                      <div className="inline-flex items-center gap-1.5 font-black text-emerald-600 font-mono text-sm">
                        <CheckCircle2 size={15} />
                        LKR {Number(p.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                    No payment records logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
