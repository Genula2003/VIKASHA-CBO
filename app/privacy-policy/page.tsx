import Link from 'next/link'
import { Droplet, ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Lock, FileText, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Vikasha CBO',
  description: 'Official privacy policy for consumer data, billing records, and online payment processing under Vikasha CBO (Magammana).',
}

export default function PrivacyPolicyPage() {
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
            Personal Data Protection Act (PDPA) &bull; PayHere Compliance
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B132B] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Last Updated: 13th October 2026 &bull; Published by Vikasha Community Based Organisation (විකාශා ප්‍රජා මූල සංවිධානය)
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-sm md:text-[15px] leading-relaxed text-gray-700 space-y-6">
          <p>
            At <strong>Vikasha Community Based Organisation (CBO)</strong>, we are committed to safeguarding the privacy, confidentiality, and security of our community residents, consumers, and website visitors. This <strong>Privacy Policy</strong> sets out our policies regarding the collection, use, disclosure, and protection of personal data in accordance with the <em>Sri Lanka Personal Data Protection Act No. 9 of 2022 (PDPA)</em> and Central Bank of Sri Lanka (CBSL) e-commerce regulations.
          </p>

          {/* Section 1 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">1</span>
              Information We Collect
            </h2>
            <p>
              To maintain municipal utility service, calculate metered tariffs, and process payments, we collect and store:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Consumer &amp; Property Identifiers:</strong> Water account number (e.g. #135), account holder&apos;s legal name, and physical service address in Magammana (e.g. Ranmal Uyana, Kothalawela Road, Batahena).
              </li>
              <li>
                <strong>Contact Information:</strong> Resident mobile phone number and optional email address for dispatching monthly billing notices, SMS reminders, and payment receipts.
              </li>
              <li>
                <strong>Meter Reading &amp; Consumption Data:</strong> Baseline meter index, previous and current meter readings (in m³ / units), consumption history, and reading dates recorded by field officers.
              </li>
              <li>
                <strong>Transaction &amp; Audit Logs:</strong> Payment reference numbers (Transaction ID), bill reference number, amount paid, payment method type, and timestamp.
              </li>
            </ul>
          </div>

          {/* Section 2: Payment Security Highlight */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 md:p-8 text-[#0B132B] space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800 font-black text-base">
              <ShieldCheck size={20} className="text-emerald-600" />
              Payment Card Security &amp; Zero Storage Guarantee
            </div>
            <p className="text-sm text-emerald-950/80 leading-relaxed font-medium">
              <strong>Vikasha CBO does NOT collect, store, or process full credit card numbers, debit card numbers, or CVV/CVC security codes on our servers.</strong> All online payment transactions are processed through <strong>PayHere</strong>, a PCI-DSS certified payment aggregator licensed and regulated by the Central Bank of Sri Lanka (CBSL). Transactions use end-to-end 256-bit TLS 1.3 encryption and mandatory 3D-Secure OTP verification through your issuing bank.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">2</span>
              How We Use Your Information
            </h2>
            <p>
              Your personal data is used solely for the legitimate operational purposes of the community water supply project:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>To calculate and generate progressive monthly water tariffs compliant with official NWSDB slabs.</li>
              <li>To issue electronic invoices, PDF bills, and verified payment receipts.</li>
              <li>To notify residents of emergency water pipe repairs, planned supply interruptions, or unexpected bursts in the Magammana distribution network.</li>
              <li>To audit revenue, reconcile financial records, and compile mandatory annual reports for the General Assembly and the Department of Community Water Supply (DCWS).</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">3</span>
              Information Sharing &amp; Third Parties
            </h2>
            <p>
              We treat consumer data as strictly confidential. We <strong>never sell, lease, or monetize</strong> consumer information. Information is disclosed only under these circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Licensed Payment Gateway:</strong> Transaction amounts and account numbers are shared securely with PayHere to complete payment authorization.
              </li>
              <li>
                <strong>Regulatory &amp; Legal Compliance:</strong> Disclosure to government authorities or statutory courts if required by Sri Lankan law or regulatory mandates under the National Water Supply &amp; Drainage Board Act.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">4</span>
              Data Protection &amp; Technical Security
            </h2>
            <p>
              We implement comprehensive security controls to protect community records:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Transport Layer Security (TLS 1.3) encryption across all public and administrative interfaces.</li>
              <li>Strict rate-limiting and input sanitization to prevent unauthorized automated account scraping.</li>
              <li>Masked telephone numbers (e.g. <code>077 ••• •589</code>) on public inquiry screens to protect consumer privacy.</li>
              <li>Role-based access control restricting administrative operations to authorized CBO executive committee officers.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">5</span>
              Consumer Rights Under Sri Lankan Law
            </h2>
            <p>
              Under the Personal Data Protection Act No. 9 of 2022, community consumers have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Verify the accuracy of their registered household account information and request corrections (e.g., updated contact mobile or ownership transfer).</li>
              <li>Inspect their past meter reading logbook and billing history at the CBO community office.</li>
              <li>File inquiries or grievances regarding data handling directly with our data protection officer.</li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white space-y-4 shadow-xl">
            <h3 className="text-base sm:text-lg font-black text-white">Privacy Officer &amp; Inquiries</h3>
            <p className="text-xs text-gray-300">
              If you have any questions regarding your data privacy, please contact:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2.5 break-all">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                <span>support@vikashacbo.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-400 shrink-0" />
                <span>011 289 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0" />
                <span>Magammana, Homagama, Sri Lanka</span>
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
            <Link href="/privacy-policy" className="text-[#0066FF] font-bold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0B132B] transition-colors">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="hover:text-[#0B132B] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
