import Link from 'next/link'
import { Droplet, ArrowLeft, ShieldCheck, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Vikasha CBO',
  description: 'Official refund and cancellation policy for water utility bill payments and community connections under Vikasha CBO (Magammana).',
}

export default function RefundPolicyPage() {
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
            PayHere &bull; Regulatory Compliance &bull; DCWS Standards
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0B132B] tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Last Updated: 13th October 2026 &bull; Published by Vikasha Community Based Organisation (විකාශා ප්‍රජා මූල සංවිධානය)
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-slate max-w-none text-sm md:text-[15px] leading-relaxed text-gray-700 space-y-6">
          <p>
            Thank you for using the official digital payment portal of <strong>Vikasha Community Based Organisation (CBO)</strong>, serving the Magammana Community Water Supply Project in Homagama, Sri Lanka. We are dedicated to delivering equitable, continuous drinking water and ensuring seamless, transparent online billing for all community residents.
          </p>
          <p>
            This <strong>Refund and Cancellation Policy</strong> explains the terms and procedures governing refunds for utility bill payments, overpayments, billing disputes, and service fees processed via our website and our authorized payment gateway provider, <strong>PayHere</strong>.
          </p>

          {/* Section 1 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">1</span>
              Duplicate Payments &amp; Overpayments
            </h2>
            <p>
              In the event that an online payment is processed multiple times for the same monthly water bill due to network delays, accidental multiple submissions, or gateway issues:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Automatic Account Credit (Recommended):</strong> The excess or duplicate amount paid will automatically be credited against your consumer account and deducted from your next month&apos;s water bill.
              </li>
              <li>
                <strong>Direct Bank Refund:</strong> If you prefer an immediate monetary refund, you may submit a formal request to our treasury office at <a href="mailto:support@vikashacbo.com" className="text-[#0066FF] font-bold underline">support@vikashacbo.com</a>. Upon verification, the duplicate sum will be refunded directly to your original payment method.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">2</span>
              Disputed Meter Readings &amp; Billing Corrections
            </h2>
            <p>
              If you believe your water bill was calculated incorrectly due to an inaccurate meter reading, meter malfunction, or post-meter underground leak:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                You must notify Vikasha CBO within <strong>14 calendar days</strong> of bill issuance.
              </li>
              <li>
                A field officer will be dispatched to conduct a physical verification of your water meter dial at your Magammana premises.
              </li>
              <li>
                If an error is confirmed, Vikasha CBO will issue an official credit adjustment note. If the bill has already been paid online, the difference will be credited toward your next cycle or refunded in full.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">3</span>
              Non-Refundable Charges
            </h2>
            <p>
              Certain utility charges are statutory or service-based and are strictly non-refundable once initiated:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Statutory government taxes (including 15% VAT) that have already been remitted to municipal authorities.</li>
              <li>Physical connection and labor installation fees for new household pipe connections once work has commenced.</li>
              <li>Reconnection fees applied following a lawful disconnection due to prolonged non-payment.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">4</span>
              Refund Processing Timeline
            </h2>
            <p>
              Approved refunds will be processed within <strong>3 to 7 business days</strong> following review by the CBO management committee.
            </p>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-1">
              <p className="font-bold text-[#0B132B]">Important Note on Bank Processing:</p>
              <p>
                Once initiated by PayHere, the credit reflection time depends on your issuing bank (Commercial Bank, Sampath Bank, BOC, People&apos;s Bank, HNB, etc.), which may take an additional 2 to 5 banking working days.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg md:text-xl font-black text-[#0B132B] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-black">5</span>
              How to Request a Refund
            </h2>
            <p>
              To request a refund or raise a payment discrepancy inquiry, please contact our community desk with the following details:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <span className="text-gray-400 font-bold block">1. Water Account Number</span>
                <span className="font-mono font-bold text-[#0B132B]">e.g. Account #135</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <span className="text-gray-400 font-bold block">2. PayHere Transaction ID</span>
                <span className="font-mono font-bold text-[#0B132B]">TXN-2026-XXXXX</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <span className="text-gray-400 font-bold block">3. Date &amp; Amount Paid</span>
                <span className="font-bold text-[#0B132B]">Exact Amount in LKR</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <span className="text-gray-400 font-bold block">4. Reason for Request</span>
                <span className="font-bold text-[#0B132B]">Duplicate charge, reading dispute, etc.</span>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl p-8 text-white space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-white">Contact Our Treasury &amp; Support Desk</h3>
            <p className="text-xs text-gray-300">
              For any questions regarding our refund policy, please reach out to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-cyan-400" />
                <span>support@vikashacbo.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-400" />
                <span>Hotline: 011 289 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-amber-400" />
                <span>Magammana, Homagama</span>
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
            <Link href="/terms" className="hover:text-[#0B132B] transition-colors">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="text-[#0066FF] font-bold">Refund Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
