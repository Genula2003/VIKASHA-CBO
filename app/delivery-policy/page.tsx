import Link from 'next/link'
import { Droplet, ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Truck, Clock, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Delivery & Fulfillment Policy | Vikasha CBO',
  description: 'Official service delivery, water supply fulfillment, and electronic transaction fulfillment policy for Vikasha CBO (Magammana).',
}

export default function DeliveryPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B] font-sans selection:bg-[#0066FF] selection:text-white">
      
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center p-0.5 overflow-hidden">
              <img
                src="/logo.webp"
                alt="Vikasha CBO Official Logo"
                width={40}
                height={40}
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-[#0B132B]">Vikasha CBO</span>
              <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 hidden xs:block">Magammana Community Water</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link 
              href="/pay" 
              className="text-xs font-bold px-3 sm:px-4 py-2 rounded-xl bg-[#0066FF] text-white hover:bg-blue-600 transition-colors shadow-sm"
            >
              Pay Bill
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#0B132B] transition-colors"
            >
              <ArrowLeft size={14} /> <span className="hidden sm:inline">Back to</span> Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-10">
        
        {/* Document Header */}
        <div className="space-y-3 pb-8 border-b border-gray-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-black">
            Service Delivery Standards &bull; PayHere Compliance &bull; DCWS Norms
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B132B] tracking-tight">
            Service Delivery &amp; Fulfillment Policy
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Last Updated: 13th October 2026 &bull; Published by Vikasha Community Based Organisation (විකාශා ප්‍රජා මූල සංවිධානය)
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-sm md:text-[15px] leading-relaxed text-gray-700 space-y-6">
          <p>
            As a licensed Community Based Organisation (CBO) delivering municipal drinking water under the Department of Community Water Supply (DCWS), <strong>Vikasha CBO</strong> maintains strict service fulfillment and operational delivery timelines for physical utility water supply, new connections, electronic invoicing, and digital payment settlements.
          </p>

          {/* Section 1: Digital Bill Settlement & Delivery Timeline */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">1</span>
              Online Payment Settlement &amp; Receipt Delivery
            </h2>
            <p>
              When a consumer completes an online payment through our PayHere checkout gateway:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Immediate Electronic Fulfillment:</strong> The transaction is processed immediately (typically within <strong>2 to 5 seconds</strong>). An official computerized payment receipt with a unique Transaction ID is generated on-screen.
              </li>
              <li>
                <strong>Ledger Clearance:</strong> The consumer&apos;s municipal water account balance is marked as &quot;PAID&quot; in real-time across all CBO databases and field terminals.
              </li>
              <li>
                <strong>SMS / Email Confirmation:</strong> Where mobile numbers or email addresses are on file, an automated payment confirmation notification is dispatched within <strong>5 minutes</strong>.
              </li>
            </ul>
          </div>

          {/* Section 2: Household Water Supply Service Delivery */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">2</span>
              Continuous Water Supply Fulfillment
            </h2>
            <p>
              Vikasha CBO provides continuous, treated water supply to 341 registered households in the Magammana service area across 9 designated road divisions (Ranmal Uyana, Kothalawela Road, Batahena, Saman Uyana, Temple Road, Hospital Road, etc.):
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Operating Schedule:</strong> Continuous 24-hour pressurized pipeline delivery subject to scheduled reservoir pump maintenance cycles.
              </li>
              <li>
                <strong>Planned Interruption Notices:</strong> Any scheduled maintenance or pipeline upgrade work is announced at least <strong>24 to 48 hours in advance</strong> via resident SMS and community notices.
              </li>
              <li>
                <strong>Emergency Repairs &amp; Leaks:</strong> In the event of an unplanned pipe burst, our on-call technical response unit mobilizes within <strong>2 to 4 hours</strong> of receiving an emergency notice.
              </li>
            </ul>
          </div>

          {/* Section 3: New Connection Installation Timelines */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">3</span>
              New Water Connection Delivery Period
            </h2>
            <p>
              For newly approved household or commercial connection applications in Magammana:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Site Survey:</strong> Conducted within <strong>3 business days</strong> of application submission.
              </li>
              <li>
                <strong>Meter &amp; Pipeline Installation:</strong> Executed within <strong>7 to 10 business days</strong> following full payment of the approved estimate and DCWS road excavation clearance.
              </li>
            </ul>
          </div>

          {/* Section 4: Reconnection Timelines Following Settlement */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">4</span>
              Reconnection Service Fulfillment
            </h2>
            <p>
              If a water supply service was temporarily halted due to overdue arrears (exceeding 60 days):
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Upon complete online or counter settlement of the overdue bill and the standard reconnection fee, water supply will be restored within <strong>24 hours</strong> (excluding statutory public holidays).
              </li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white space-y-4 shadow-xl">
            <h3 className="text-base sm:text-lg font-black text-white">Questions on Service Delivery?</h3>
            <p className="text-xs text-gray-300">
              For any questions regarding water delivery schedules, meter installations, or receipt verification:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2.5 break-all">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                <span>support@vikashacbo.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-400 shrink-0" />
                <span>Hotline: 011 289 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0" />
                <span>Magammana, Homagama</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer with legal navigation */}
      <footer className="bg-white border-t border-gray-100 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Community Water Supply Project). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-[#0B132B] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0B132B] transition-colors">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="hover:text-[#0B132B] transition-colors">Refund Policy</Link>
            <Link href="/delivery-policy" className="text-[#0066FF] font-bold">Delivery Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
