"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  HelpCircle,
  Loader2,
  Play,
  Search,
  User,
} from "lucide-react";

interface HeroSectionProps {
  onSearch: (accountNumber: string) => void;
  isSearching: boolean;
  onOpenAccountHelp: () => void;
  onOpenHowToPay: () => void;
}

export default function HeroSection({
  onSearch,
  isSearching,
  onOpenAccountHelp,
  onOpenHowToPay,
}: HeroSectionProps) {
  const [accountInput, setAccountInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(accountInput);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-white text-slate-900 pt-28 sm:pt-36 lg:pt-38 pb-16 sm:pb-20 lg:pb-24"
      aria-label="Water Billing Platform Overview"
    >
      {/* ========================================================================= */}
      {/* HERO SECTION BACKGROUND: REAL WATER DROPLET ARTWORK & TECHNICAL GRID      */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Full-bleed fluid water background image */}
        <Image
          src="/hero-water-bg.webp"
          alt="Vikasha CBO Water Utility Background"
          fill
          priority
          quality={95}
          className="object-cover object-right lg:object-center pointer-events-none"
        />

        {/* Crisp Light Technical Grid (32px pattern matching mockup) */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 162, 255, 0.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 162, 255, 0.7) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        {/* Soft white gradient protection for mobile text contrast */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-white/95 via-white/70 to-transparent lg:hidden"
          aria-hidden="true"
        />
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER GRID                                                      */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-start">

          {/* =================================================================== */}
          {/* LEFT COLUMN: HEADLINE, ACCENT BAR, SUBTITLE, CTAs, BILL LOOKUP CARD */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-4 sm:space-y-4.5 order-1 lg:order-1 pt-2 sm:pt-4">

            {/* Master Headline */}
            <div className="space-y-0.5">
              <h1 className="font-sans font-extrabold text-[36px] sm:text-[46px] lg:text-[54px] xl:text-[62px] text-[#081B38] leading-[1.08] tracking-tight select-none">
                <span>Smarter</span>
                <br />
                <span className="text-[#00a2ff]">Water Billing.</span>
                <br />
                <span>Simpler Everyday Living.</span>
              </h1>

              {/* Cyan Accent Bar */}
              <div className="w-14 sm:w-16 h-1.5 bg-[#00a2ff] rounded-full mt-3 mb-3.5" />
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
              View your bill, track water usage, and make secure
              <br className="hidden sm:inline" /> payments anytime, anywhere.
            </p>

            {/* Primary & Secondary Pill CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary Pill Button */}
              <Link
                href="/pay"
                className="group inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-[#00a2ff] hover:bg-[#0090e6] text-white font-bold text-sm tracking-tight shadow-[0_8px_20px_rgba(0,162,255,0.35)] hover:shadow-[0_12px_28px_rgba(0,162,255,0.5)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="Pay Your Water Bill online"
              >
                <span>Pay Your Water Bill</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary Pill Button */}
              <Link
                href="/pay"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="View Account Details and past bills"
              >
                <span>View Account Details</span>
                <ArrowUpRight
                  size={15}
                  className="text-slate-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* =================================================================== */}
            {/* QUICK ACCOUNT BILL LOOKUP CARD                                      */}
            {/* =================================================================== */}
            <div className="mt-3 sm:mt-4 max-w-xl w-full rounded-2xl bg-white border border-slate-200/90 shadow-[0_16px_40px_rgba(0,120,220,0.08)] p-4 sm:p-5">
              {/* Card Header Strip */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono uppercase tracking-wider font-bold text-[#081B38] flex items-center gap-2">
                  <Search size={14} className="text-[#00a2ff]" />
                  <span className="text-[11.5px] sm:text-xs">QUICK ACCOUNT BILL LOOKUP</span>
                </span>
                <span className="text-slate-400 font-mono text-[10.5px] sm:text-xs">
                  Instant 24/7 E-Bill Access
                </span>
              </div>

              {/* Form Input & Action Button */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00a2ff] pointer-events-none">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={accountInput}
                      onChange={(e) => setAccountInput(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="Enter Consumer Account # (e.g. 135)"
                      aria-label="Water Consumer Account Number"
                      className={`w-full h-11 sm:h-12 pl-10 pr-3 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 font-mono text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                        isInputFocused
                          ? "border-[#00a2ff] ring-2 ring-[#00a2ff]/20 bg-white"
                          : "border-slate-200 hover:border-slate-300"
                      } focus:outline-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="h-11 sm:h-12 px-6 rounded-xl bg-[#081B38] hover:bg-[#0c2447] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 size={15} className="animate-spin text-white" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={15} className="text-[#00a2ff]" />
                        <span>Check Bill</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {/* Helper Links Footer */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-500">
                  <button
                    type="button"
                    onClick={onOpenAccountHelp}
                    className="flex items-center gap-1.5 hover:text-[#081B38] transition-colors cursor-pointer text-[11px] sm:text-xs"
                  >
                    <HelpCircle size={13} className="text-[#00a2ff]" />
                    <span>Need help finding your account number?</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenHowToPay}
                    className="flex items-center gap-1.5 hover:text-[#081B38] transition-colors font-medium cursor-pointer text-[11px] sm:text-xs"
                  >
                    <span>How to Pay?</span>
                    <Play size={10} className="text-[#00a2ff] fill-[#00a2ff]" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT COLUMN: OPEN SPACING FOR BACKGROUND WATER DROPLET ARTWORK      */}
          {/* =================================================================== */}
          <div
            className="lg:col-span-5 xl:col-span-5 hidden lg:block min-h-[440px] pointer-events-none"
            aria-hidden="true"
          />

        </div>
      </div>
    </div>
  );
}
