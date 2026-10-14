import Link from 'next/link'
import { Droplet, ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Scale, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Vikasha CBO',
  description: 'Official terms and conditions for community water connections, tariffs, and online payments under Vikasha CBO (Magammana).',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B] font-sans selection:bg-[#0066FF] selection:text-white">
      
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B132B] to-[#0066FF] text-white flex items-center justify-center shadow-md">
              <Droplet size={20} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-[#0B132B]">Vikasha CBO</span>
              <p className="text-[11px] font-medium text-gray-400">Magammana Community Water Project</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/pay" 
              className="text-xs font-bold px-4 py-2 rounded-xl bg-[#0066FF] text-white hover:bg-blue-600 transition-colors shadow-sm"
            >
              Pay Water Bill
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#0B132B] transition-colors"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-10">
        
        {/* Document Header */}
        <div className="space-y-3 pb-8 border-b border-gray-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-black">
            PayHere Merchant Compliance &bull; Community By-Laws
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Last Updated: 13th October 2026 &bull; Published by Vikasha Community Based Organisation (විකාශා ප්‍රජා මූල සංවිධානය)
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-sm md:text-[15px] leading-relaxed text-gray-700 space-y-6">
          <p>
            Welcome to the official online service and payment platform of <strong>Vikasha Community Based Organisation (CBO)</strong>. By registering a water supply connection, receiving community metered water, or completing bill payments via our portal, you agree to be bound by these <strong>Terms and Conditions</strong>, our Constitution, and the statutory guidelines established by the Department of Community Water Supply (DCWS) of Sri Lanka.
          </p>

          {/* Section 1 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">1</span>
              Community Water Supply Service
            </h2>
            <p>
              Vikasha CBO operates the Magammana Community Water Supply Project on behalf of the registered residents of Magammana, Homagama. Water supplied through this scheme is treated, chlorinated, and intended primarily for domestic household drinking and sanitation needs.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">2</span>
              Water Meter &amp; Property Access
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Meter Maintenance:</strong> The water meter installed at your property boundary remains the property of Vikasha CBO. Consumers are responsible for protecting the meter from physical damage, frost, or unauthorized tampering.
              </li>
              <li>
                <strong>Officer Access:</strong> Consumers must grant unobstructed, safe physical access to authorized Vikasha CBO field meter readers during normal operational hours (8:00 AM – 5:00 PM) for monthly meter reading and maintenance inspections.
              </li>
              <li>
                <strong>Tampering &amp; Unlawful Bypasses:</strong> Any deliberate bypass of the meter, tampering with seals, or unauthorized connection directly to the main distribution line constitutes a severe violation and will result in immediate disconnection, civil penalties, and legal reporting.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">3</span>
              Billing, Tariffs &amp; Payment Due Dates
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Tariff Schedule:</strong> Monthly bills are calculated progressively according to the official domestic volumetric slabs and fixed service charge approved under National Water Supply &amp; Drainage Board standards.
              </li>
              <li>
                <strong>Grace Period:</strong> All monthly water bills must be settled in full within <strong>21 calendar days</strong> from the date of bill issuance.
              </li>
              <li>
                <strong>Electronic Invoices:</strong> Official e-bills and PDF downloads generated on this portal are valid municipal receipts for accounting and resident records.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">4</span>
              Arrears &amp; Service Disconnection Policy
            </h2>
            <p>
              To safeguard community water sustainability and financial solvency:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Overdue Reminders:</strong> Accounts with unpaid balances exceeding 30 days will receive automated SMS reminders.
              </li>
              <li>
                <strong>Final Red Notice:</strong> Accounts unpaid for two consecutive billing cycles (60+ days) will receive a formal written Red Notice.
              </li>
              <li>
                <strong>Disconnection:</strong> Failure to settle outstanding arrears within 7 days of receiving a Red Notice empowers the CBO maintenance committee to temporarily disconnect the service line. Reconnection requires settlement of all arrears plus a statutory reconnection fee.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">5</span>
              Online Payments via PayHere
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                By initiating an online payment on this website, you authorize our licensed gateway provider, <strong>PayHere</strong>, to charge your designated credit card, debit card, bank account, or digital wallet for the specified amount in Sri Lankan Rupees (LKR).
              </li>
              <li>
                You confirm that you are the lawful authorized cardholder or account owner authorized to execute the transaction.
              </li>
              <li>
                Any disputed or duplicate payments are governed by our official <Link href="/refund-policy" className="text-[#0066FF] font-bold underline">Refund Policy</Link>.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">6</span>
              Limitation of Liability &amp; Supply Interruptions
            </h2>
            <p>
              While Vikasha CBO exerts all diligence to ensure unhindered 24/7 water supply, we shall not be held liable for temporary interruptions resulting from:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Severe seasonal droughts affecting natural groundwater levels or source tube wells.</li>
              <li>Regional electricity grid power cuts affecting pump house operation (CEB load shedding).</li>
              <li>Emergency main distribution pipeline bursts, pipe damage caused by third-party roadwork, or necessary scheduled reservoir maintenance.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">7</span>
              Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the <strong>Democratic Socialist Republic of Sri Lanka</strong>. Any dispute arising out of or in connection with community water services shall be subject to the exclusive jurisdiction of the competent courts of Homagama and Colombo, Sri Lanka.
            </p>
          </div>

          {/* Contact Box */}
          <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl p-8 text-white space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-white">Questions Regarding Terms?</h3>
            <p className="text-xs text-gray-300">
              For any clarifications regarding our operational terms or community bylaws:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-cyan-400" />
                <span>support@vikashacbo.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-400" />
                <span>011 289 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-amber-400" />
                <span>Magammana, Homagama, Sri Lanka</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer with legal navigation */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div>
            &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Community Water Supply Project). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#0B132B] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#0066FF] font-bold">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="hover:text-[#0B132B] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
