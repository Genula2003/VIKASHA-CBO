"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  Shield,
  CreditCard,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Droplets,
  Scale,
  FileCheck2,
  MapPin,
  Clock
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [quickAccount, setQuickAccount] = useState("");
  const [selectedLang, setSelectedLang] = useState<"EN" | "SI" | "TA">("EN");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickAccount.trim()) {
      router.push(`/pay?acc=${encodeURIComponent(quickAccount.trim())}`);
    } else {
      router.push("/pay");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0A1120] font-sans selection:bg-[#004EEB] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOP OFFICIAL MASTHEAD (h-9 full-width Sovereign Navy) */}
      {/* ========================================================================= */}
      <header className="h-9 bg-[#0A1120] text-white text-[11px] font-medium border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          
          {/* Left: Sri Lanka Government Crest Emblem + Official Scheme Label */}
          <div className="flex items-center gap-2.5 truncate">
            {/* Minimalist Monochrome Emblem */}
            <svg 
              className="w-3.5 h-3.5 text-stone-300 shrink-0" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-[#E2E0D8] font-normal tracking-wide truncate">
              Department of Community Water Supply &bull; DCWS Registered Scheme (Magammana)
            </span>
          </div>

          {/* Right: Tabular Hotline, Support Email & Language Switcher */}
          <div className="hidden sm:flex items-center gap-4 text-[#D0D5DD] shrink-0">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Phone size={11} className="text-[#98A2B3]" /> 
              011 289 4567
            </span>
            <span className="text-[#344054]">&bull;</span>
            <a 
              href="mailto:support@vikashacbo.com" 
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail size={11} className="text-[#98A2B3]" /> 
              support@vikashacbo.com
            </a>
            <span className="text-[#344054]">&bull;</span>
            
            {/* Language Selector */}
            <div className="inline-flex items-center border border-[#344054] rounded bg-[#0A1120] text-[10px] font-mono">
              <button 
                onClick={() => setSelectedLang("EN")}
                className={`px-1.5 py-0.5 transition-colors ${selectedLang === "EN" ? "bg-white/20 text-white font-bold" : "text-[#98A2B3] hover:text-white"}`}
              >
                EN
              </button>
              <span className="text-[#344054]">|</span>
              <button 
                onClick={() => setSelectedLang("SI")}
                className={`px-1.5 py-0.5 transition-colors ${selectedLang === "SI" ? "bg-white/20 text-white font-bold" : "text-[#98A2B3] hover:text-white"}`}
              >
                සිං
              </button>
              <span className="text-[#344054]">|</span>
              <button 
                onClick={() => setSelectedLang("TA")}
                className={`px-1.5 py-0.5 transition-colors ${selectedLang === "TA" ? "bg-white/20 text-white font-bold" : "text-[#98A2B3] hover:text-white"}`}
              >
                த
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN NAVBAR (h-20 architectural full-width with 1px border) */}
      {/* ========================================================================= */}
      <nav className="h-20 bg-[#F7F7F4]/90 backdrop-blur-md border-b border-[#E2E0D8] sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo Lockup: Sharp 1-Color Geometric Emblem + Institutional Hierarchy */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Crisp 1-Color Sovereign Emblem */}
            <div className="w-10 h-10 rounded-lg bg-[#0A1120] text-white flex items-center justify-center shrink-0 border border-[#0A1120] group-hover:bg-[#004EEB] transition-colors">
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                <path d="M12 11a3 3 0 0 0-3 3" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-bold text-[#0A1120] tracking-tight leading-none">
                  Vikasha CBO
                </span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F0EFEA] text-[#475467] border border-[#E2E0D8] tracking-wider uppercase">
                  MAGAMMANA
                </span>
              </div>
              <p className="text-[12px] font-medium text-[#475467] mt-1 leading-none tracking-normal">
                මාගම්මන ප්‍රජා ජල සම්පාදන ව්‍යාපෘතිය
              </p>
            </div>
          </Link>

          {/* Nav Links: Sovereign slate, no floating pills */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#475467]">
            <Link href="/" className="text-[#0A1120] font-semibold border-b border-[#0A1120] pb-0.5">
              Home
            </Link>
            <Link href="/pay" className="hover:text-[#0A1120] transition-colors">
              Pay Water Bill
            </Link>
            <Link href="#tariffs" className="hover:text-[#0A1120] transition-colors">
              Tariff Slabs
            </Link>
            <Link href="#leaks" className="hover:text-[#0A1120] transition-colors">
              Report Leak
            </Link>
            <Link href="#about" className="hover:text-[#0A1120] transition-colors">
              About CBO
            </Link>
          </div>

          {/* Action Buttons: Clean GOV / Stripe hierarchy */}
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-[#D0D5DD] text-[#0A1120] text-xs font-semibold hover:bg-[#F0EFEA] transition-colors"
            >
              Staff Login
            </Link>
            <Link 
              href="/pay" 
              className="inline-flex items-center justify-center px-4.5 py-2 rounded-lg bg-[#004EEB] text-white text-xs font-semibold hover:bg-[#003CC7] transition-colors"
            >
              Pay Bill Online
            </Link>
          </div>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. HERO & CIVIC BENTO SECTION */}
      {/* ========================================================================= */}
      <section className="border-b border-[#E2E0D8] bg-[#F7F7F4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: HERO HEADLINE & PURE CERAMIC BANKING TERMINAL (7 COLS) */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Overline Badge (Rectangular Pill with solid dot) */}
            <div className="inline-flex items-center gap-2 rounded-md bg-[#EFECE6] border border-[#E2E0D8] px-3 py-1 text-xs font-medium text-[#0A1120]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0" />
              <span>DCWS Registered Public Utility &bull; Homagama Division</span>
            </div>

            {/* Headline: Sovereign Navy, zero text gradients */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold text-[#0A1120] tracking-[-0.03em] leading-[1.06]">
                Clean water for our community, transparent &amp; digital.
              </h1>
              <p className="text-base sm:text-lg text-[#475467] leading-relaxed max-w-xl font-normal">
                Official online operations terminal for Vikasha Community Based Organisation (CBO). 
                Serving 340+ families across Ranmal Uyana, Kothalawela, Batahena, Saman Uyana &amp; Magammana.
              </p>
            </div>

            {/* Instant Water Bill Check & Pay: Pure Ceramic White Banking Module */}
            <div className="max-w-xl p-1.5 bg-[#EFECE6]/70 rounded-2xl border border-[#E2E0D8]">
              <div className="bg-[#FFFFFF] rounded-xl border border-[#D0D5DD] p-6 shadow-[0_2px_8px_rgba(10,17,32,0.04)] space-y-4">
                
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#004EEB]" />
                    <span className="text-sm font-semibold text-[#0A1120]">
                      Instant Water Bill Check &amp; Pay
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-medium text-[#667085] bg-[#F7F7F4] px-2 py-0.5 rounded border border-[#E2E0D8] tracking-wider uppercase">
                    NO LOGIN REQUIRED
                  </span>
                </div>

                {/* Form Input & Action */}
                <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={quickAccount}
                      onChange={(e) => setQuickAccount(e.target.value)}
                      placeholder="Enter Water Account # (e.g. 135)"
                      className="w-full h-12 px-4 rounded-lg border border-[#D0D5DD] text-[#0A1120] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#004EEB] focus:ring-2 focus:ring-[#004EEB]/15 font-mono text-sm bg-white transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-[#98A2B3]">
                      #ACC
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="h-12 px-6 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Pay Now</span>
                    <ArrowRight size={15} />
                  </button>
                </form>

                {/* Trust Footer: Hairline separated */}
                <div className="pt-3 border-t border-[#F0EFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#667085] font-medium">
                  <div className="flex items-center gap-1.5">
                    <CreditCard size={13} className="text-[#98A2B3]" />
                    <span>Accepted: Visa &bull; Mastercard &bull; LANKAQR &bull; Sampath Vishwa</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[#065F46] font-semibold">
                    <Shield size={12} className="text-[#059669]" />
                    <span>256-Bit SSL Official Gateway</span>
                  </div>
                </div>

              </div>
            </div>

            {/* System Portal Links (No Emoji Icons, 1.5px stroke Lucide) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl pt-1">
              <Link
                href="/pay"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2E0D8] hover:border-[#004EEB] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Receipt size={16} strokeWidth={1.5} className="text-[#0A1120]" />
                  <span className="text-xs font-semibold text-[#0A1120]">Consumer Pay Portal</span>
                </div>
                <ArrowUpRight size={14} className="text-[#98A2B3] group-hover:text-[#004EEB] transition-colors" />
              </Link>

              <Link
                href="/meter-reader"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2E0D8] hover:border-[#004EEB] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Droplets size={16} strokeWidth={1.5} className="text-[#0A1120]" />
                  <span className="text-xs font-semibold text-[#0A1120]">Field Reader App</span>
                </div>
                <ArrowUpRight size={14} className="text-[#98A2B3] group-hover:text-[#004EEB] transition-colors" />
              </Link>

              <Link
                href="/admin/dashboard"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2E0D8] hover:border-[#004EEB] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 size={16} strokeWidth={1.5} className="text-[#0A1120]" />
                  <span className="text-xs font-semibold text-[#0A1120]">CBO Committee</span>
                </div>
                <ArrowUpRight size={14} className="text-[#98A2B3] group-hover:text-[#004EEB] transition-colors" />
              </Link>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: ARCHITECTURAL STONE & CERAMIC BENTO (5 COLS) */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Bento Container */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E0D8] overflow-hidden shadow-[0_4px_20px_rgba(10,17,32,0.03)]">
              
              {/* Framed Editorial Documentary Photo Header */}
              <div className="relative h-48 w-full bg-[#E2E0D8] overflow-hidden">
                <img
                  src="/magammana_water_scheme.jpg"
                  alt="Magammana Community Water Scheme Filtration & Treatment Reservoir"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120]/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-[#0A1120]/75 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-md border border-white/10 tracking-wide">
                  MAGAMMANA SCHEME &bull; HOMAGAMA
                </div>
              </div>

              {/* Scheme Header */}
              <div className="p-6 border-b border-[#E2E0D8] space-y-1">
                <h2 className="text-lg font-semibold text-[#0A1120] tracking-tight">
                  Magammana Community Water Scheme
                </h2>
                <p className="text-xs text-[#667085] font-medium">
                  මාගම්මන ප්‍රජා පානීය ජල යෝජනා ක්‍රමය
                </p>
              </div>

              {/* 2x2 Hairline Telemetry Grid (Exposed Grid using 1px gaps) */}
              <div className="grid grid-cols-2 bg-[#E2E0D8] gap-[1px] border-b border-[#E2E0D8]">
                
                {/* Cell 1: Registered Meters */}
                <div className="bg-[#FFFFFF] p-5 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block">
                    REGISTERED METERS
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#0A1120] tabular-nums font-mono">
                      341
                    </span>
                    <span className="inline-block bg-[#ECFDF5] text-[#065F46] text-[11px] font-medium px-2 py-0.5 rounded border border-[#A7F3D0]">
                      100% Active
                    </span>
                  </div>
                </div>

                {/* Cell 2: Service Territory */}
                <div className="bg-[#FFFFFF] p-5 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block">
                    SERVICE TERRITORY
                  </span>
                  <div className="text-2xl font-bold text-[#0A1120] tabular-nums font-mono">
                    9 Zones
                  </div>
                  <p className="text-xs text-[#667085] font-medium leading-none">
                    Homagama Region
                  </p>
                </div>

                {/* Cell 3: Tariff Standard */}
                <div className="bg-[#FFFFFF] p-5 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block">
                    TARIFF STANDARD
                  </span>
                  <div className="text-xl font-bold text-[#0A1120] tabular-nums font-mono">
                    NWSDB 2026
                  </div>
                  <p className="text-xs text-[#667085] font-medium leading-none">
                    10 Progressive Slabs
                  </p>
                </div>

                {/* Cell 4: Water Quality */}
                <div className="bg-[#FFFFFF] p-5 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block">
                    WATER QUALITY
                  </span>
                  <div className="text-xl font-bold text-[#065F46]">
                    Purified
                  </div>
                  <p className="text-xs text-[#667085] font-medium leading-none">
                    Regular Lab Tested
                  </p>
                </div>

              </div>

              {/* Covered Roads & Divisions Footer */}
              <div className="p-5 bg-[#F7F7F4] space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block">
                  COVERED ROADS &amp; DIVISIONS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Ranmal Uyana",
                    "Kothalawela Road",
                    "Batahena",
                    "Saman Uyana",
                    "Temple Road",
                    "Hospital Road",
                    "Subharathi Mawatha",
                    "Main Road"
                  ].map((road) => (
                    <span 
                      key={road}
                      className="bg-white border border-[#E2E0D8] text-[#0A1120] text-xs px-2.5 py-1 rounded font-medium shadow-[0_1px_2px_rgba(10,17,32,0.02)]"
                    >
                      {road}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Emergency Leak Callout (Terracotta Ochre, No Neon) */}
            <div id="leaks" className="rounded-xl p-4 bg-[#FFF7ED] border border-[#FED7AA] border-l-4 border-l-[#EA580C] space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} className="text-[#EA580C] shrink-0" />
                <h3 className="font-semibold text-sm text-[#9A3412]">
                  Report a Road Water Leak or Pipe Damage
                </h3>
              </div>
              <p className="text-xs text-[#7C2D12] leading-relaxed">
                Notice an unusual distribution burst or supply interruption? Alert our maintenance crew immediately for rapid mobilization.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="tel:0112894567"
                  className="bg-white border border-[#FED7AA] text-[#9A3412] hover:bg-[#FFF7ED] font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Phone size={12} />
                  <span>011 289 4567</span>
                </a>
                <a
                  href="mailto:support@vikashacbo.com"
                  className="bg-white border border-[#FED7AA] text-[#9A3412] hover:bg-[#FFF7ED] font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Mail size={12} />
                  <span>support@vikashacbo.com</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TARIFF SCHEDULE & BILLING SLABS (Architectural Swiss Table Cards) */}
      {/* ========================================================================= */}
      <section id="tariffs" className="py-16 sm:py-20 bg-[#F7F7F4] border-b border-[#E2E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          {/* Section Header */}
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block">
              OFFICIAL TARIFF SCHEDULE &bull; ගාස්තු ක්‍රමවේදය
            </span>
            <h2 className="text-3xl font-semibold text-[#0A1120] tracking-tight">
              Fair, Transparent, Community-Audited Billing
            </h2>
            <p className="text-sm text-[#475467] leading-relaxed font-normal">
              Vikasha CBO operates under the National Water Supply &amp; Drainage Board progressive tariff structure, ensuring water conservation and lifeline accessibility for all domestic consumers.
            </p>
          </div>

          {/* Slabs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Slab 1 */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E0D8] space-y-3">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] inline-block">
                01 - 05 UNITS
              </span>
              <h3 className="font-semibold text-sm text-[#0A1120]">First 05 Units</h3>
              <div className="text-2xl font-bold text-[#0A1120] font-mono">
                LKR 60.00 <span className="text-xs font-normal text-[#667085]">/ unit</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                Basic lifeline domestic consumption block subsidised for household wellbeing.
              </p>
            </div>

            {/* Slab 2 */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E0D8] space-y-3">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F0EFEA] text-[#475467] border border-[#E2E0D8] inline-block">
                06 - 10 UNITS
              </span>
              <h3 className="font-semibold text-sm text-[#0A1120]">Next 05 Units</h3>
              <div className="text-2xl font-bold text-[#0A1120] font-mono">
                LKR 80.00 <span className="text-xs font-normal text-[#667085]">/ unit</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                Standard household allowance tier for essential daily sanitation needs.
              </p>
            </div>

            {/* Slab 3 */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E0D8] space-y-3">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F0EFEA] text-[#475467] border border-[#E2E0D8] inline-block">
                11 - 15 UNITS
              </span>
              <h3 className="font-semibold text-sm text-[#0A1120]">Next 05 Units</h3>
              <div className="text-2xl font-bold text-[#0A1120] font-mono">
                LKR 100.00 <span className="text-xs font-normal text-[#667085]">/ unit</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                Intermediate consumption slab balancing community operational overheads.
              </p>
            </div>

            {/* Slab 4 */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E0D8] space-y-3">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA] inline-block">
                16 - 20+ UNITS
              </span>
              <h3 className="font-semibold text-sm text-[#0A1120]">Upper Usage Slabs</h3>
              <div className="text-2xl font-bold text-[#0A1120] font-mono">
                LKR 110 - 200 <span className="text-xs font-normal text-[#667085]">/ unit</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                Progressive conservation rate structure discouraging excessive resource waste.
              </p>
            </div>

          </div>

          {/* Fixed Charges Strip */}
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E0D8] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-[#0A1120]">
                Fixed Monthly Charges &amp; Statutory Value Added Tax (VAT)
              </h4>
              <p className="text-xs text-[#667085] max-w-2xl leading-relaxed">
                A progressive fixed service charge (LKR 275 - 400) covers physical meter dial maintenance, pipeline pressure regulation, and pump house operation, plus statutory 15% VAT.
              </p>
            </div>
            <Link
              href="/pay"
              className="px-5 py-2.5 rounded-lg bg-[#004EEB] hover:bg-[#003CC7] text-white text-xs font-semibold transition-colors shrink-0"
            >
              Verify My Bill Online &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ABOUT CBO / CIVIC GOVERNANCE SECTION */}
      {/* ========================================================================= */}
      <section id="about" className="py-16 sm:py-20 bg-[#FFFFFF] border-b border-[#E2E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block">
              INSTITUTIONAL GOVERNANCE &bull; ප්‍රජා පාලනය
            </span>
            <h2 className="text-3xl font-semibold text-[#0A1120] tracking-tight">
              Community Owned, Democratically Run
            </h2>
            <p className="text-sm text-[#475467] leading-relaxed font-normal">
              Vikasha CBO operates under the constitutional oversight of the Magammana General Assembly and the Department of Community Water Supply (DCWS).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl border border-[#E2E0D8] bg-[#F7F7F4] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E0D8] text-[#0A1120] flex items-center justify-center">
                <Users size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-base text-[#0A1120]">Community Governed</h3>
              <p className="text-xs text-[#475467] leading-relaxed font-normal">
                Managed democratically by elected resident committee members to maintain uninterrupted water pressure, transparent budgeting, and rapid maintenance.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E0D8] bg-[#F7F7F4] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E0D8] text-[#0A1120] flex items-center justify-center">
                <Droplets size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-base text-[#0A1120]">Certified Water Purity</h3>
              <p className="text-xs text-[#475467] leading-relaxed font-normal">
                Natural deep-well extraction, sand filtration, and automated chlorination compliant with the National Drinking Water Quality Standards (SLS 614).
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E0D8] bg-[#F7F7F4] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E0D8] text-[#0A1120] flex items-center justify-center">
                <FileCheck2 size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-base text-[#0A1120]">100% Digital Reconciliation</h3>
              <p className="text-xs text-[#475467] leading-relaxed font-normal">
                Every meter reading, calculation slab, and rupee collected is logged in real-time, preventing billing discrepancies or unverified cash receipts.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SOVEREIGN INSTITUTIONAL FOOTER (Clean Sovereign Navy #0A1120) */}
      {/* ========================================================================= */}
      <footer className="bg-[#0A1120] text-white pt-16 pb-12 border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#004EEB] text-white flex items-center justify-center shrink-0">
                  <svg 
                    className="w-5 h-5 text-white" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    <path d="M12 11a3 3 0 0 0-3 3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Vikasha CBO</h4>
                  <p className="text-xs text-[#98A2B3]">විකාශා ප්‍රජා මූල සංවිධානය &bull; මාගම්මන</p>
                </div>
              </div>
              <p className="text-xs text-[#98A2B3] max-w-md leading-relaxed font-normal">
                Magammana Community Water Supply &amp; Sanitation Project. Established under the Department of Community Water Supply (DCWS) to guarantee equitable drinking water access across the Homagama municipal sector.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#98A2B3]">Quick Access</h5>
              <ul className="space-y-2 text-xs text-[#D0D5DD] font-medium">
                <li><Link href="/pay" className="hover:text-white transition-colors">Online Bill Payment</Link></li>
                <li><Link href="/meter-reader" className="hover:text-white transition-colors">Field Meter Reader App</Link></li>
                <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">Administrative Dashboard</Link></li>
                <li><Link href="/admin/bills" className="hover:text-white transition-colors">Municipal Billing Ledger</Link></li>
                <li><Link href="/admin/arrears" className="hover:text-white transition-colors">Arrears &amp; Red Notices</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#98A2B3]">Contact &amp; Emergency</h5>
              <div className="space-y-2 text-xs text-[#D0D5DD] font-medium">
                <p className="flex items-center gap-2"><MapPin size={13} className="text-[#004EEB]" /> Magammana, Homagama, Sri Lanka</p>
                <p className="flex items-center gap-2"><Mail size={13} className="text-[#98A2B3]" /> support@vikashacbo.com</p>
                <p className="flex items-center gap-2"><Phone size={13} className="text-[#059669]" /> Hotline: 011 289 4567</p>
                <p className="flex items-center gap-2"><Clock size={13} className="text-[#D97706]" /> Mon - Sat: 8:00 AM - 5:00 PM</p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#98A2B3]">
            <div>
              &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Community Water Project). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[#D0D5DD]">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
              <Link href="/delivery-policy" className="hover:text-white transition-colors">Delivery Policy</Link>
              <span className="inline-flex items-center gap-1.5 text-[#34D399] font-medium text-[11px]">
                <Shield size={13} /> DCWS / NWSDB Regulated
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
