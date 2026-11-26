"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function HeroSection({
  onSearch,
  isSearching,
  onOpenAccountHelp,
  onOpenHowToPay,
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
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
      {/* DELICATE WATER FLUID BACKGROUND: LIGHT GRID & WATER AMBIENT GLOWS        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Soft cyan water ambient glow behind water drop ripples on the right */}
        <div
          className="absolute -top-10 right-0 sm:right-[4%] w-[480px] sm:w-[620px] lg:w-[720px] h-[480px] sm:h-[620px] lg:h-[720px] rounded-full pointer-events-none blur-[120px] opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 162, 255, 0.18) 0%, rgba(72, 202, 228, 0.10) 45%, rgba(202, 240, 248, 0.04) 75%, transparent 90%)",
          }}
          aria-hidden="true"
        />

        {/* Soft flowing water wave glow on the bottom-left */}
        <div
          className="absolute bottom-0 -left-12 w-[460px] sm:w-[580px] h-[380px] sm:h-[440px] rounded-full pointer-events-none blur-[110px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 162, 255, 0.14) 0%, rgba(144, 224, 239, 0.08) 50%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle Fluid Water Wave Ribbons (matching mockup background) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          viewBox="0 0 1440 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M-50 480 C 250 560, 500 380, 850 440 C 1100 480, 1300 320, 1500 280 L 1500 650 L -50 650 Z"
            fill="url(#waveGrad1)"
          />
          <path
            d="M-50 400 C 300 320, 600 460, 950 360 C 1200 280, 1380 340, 1500 310"
            stroke="url(#waveStroke1)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M-50 520 C 350 440, 750 520, 1100 420 C 1300 360, 1420 400, 1500 390"
            stroke="url(#waveStroke2)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00a2ff" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#48cae4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0096c7" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="waveStroke1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00a2ff" />
              <stop offset="100%" stopColor="#48cae4" />
            </linearGradient>
            <linearGradient id="waveStroke2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#48cae4" />
              <stop offset="100%" stopColor="#0096c7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Crisp Light Technical Grid (32px pattern matching mockup) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 162, 255, 0.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 162, 255, 0.7) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER GRID                                                      */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">

          {/* =================================================================== */}
          {/* LEFT COLUMN: HEADLINE, ACCENT BAR, SUBTITLE, CTAs, BILL LOOKUP CARD */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-4 sm:space-y-4.5 order-1 lg:order-1">

            {/* Master Headline */}
            <div className="space-y-0.5">
              <h1 className="font-sans font-extrabold text-[36px] sm:text-[46px] lg:text-[52px] xl:text-[58px] text-[#081B38] leading-[1.08] tracking-tight select-none">
                <span>Smarter</span>
                <br />
                <span className="text-[#00a2ff]">Water Billing.</span>
                <br />
                <span>Simpler Everyday Living.</span>
              </h1>

              {/* Cyan Accent Bar */}
              <div className="w-14 sm:w-16 h-1.5 bg-[#00a2ff] rounded-full mt-2.5 mb-3" />
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
          {/* RIGHT COLUMN: WATER DROPLET WITH CONCENTRIC SURFACE RIPPLES         */}
          {/* =================================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative order-2 lg:order-2">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.94, y: 15 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1, y: 0 }
                  : {
                      opacity: 1,
                      scale: 1,
                      y: [0, -8, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.8, ease: smoothEase }
                  : {
                      opacity: { duration: 0.8, ease: smoothEase },
                      scale: { duration: 0.8, ease: smoothEase },
                      y: {
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              className="relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[580px] flex items-center justify-center py-2"
            >
              {/* Soft Radial Ambient Blue Glow behind water ripples */}
              <div
                className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full bg-radial from-[#00a2ff]/18 via-[#48cae4]/08 to-transparent blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Crystal Water Drop with Circular Surface Ripples Image */}
              <div className="relative w-full aspect-[988/1070] select-none">
                <Image
                  src="/hero-water-drop-ripples.png"
                  alt="Pure Water Drop with Ripples - Vikasha CBO Water Utility"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
