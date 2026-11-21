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
  Receipt,
  Search,
  ShieldCheck,
  Smartphone,
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

  const handleQuickChipClick = (acc: string) => {
    setAccountInput(acc);
    onSearch(acc);
  };

  return (
    <div
      className="relative w-full overflow-visible bg-[#071525] text-white pt-28 sm:pt-36 lg:pt-40 pb-36 sm:pb-44 lg:pb-52"
      aria-label="Water Billing Platform Overview"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC MOUNTAIN RESERVOIR PHOTOGRAPHY & TECHNICAL LAYER */}
      {/* ========================================================================= */}
      {/* Background Photographic Mountain Reservoir Layer (Uploaded by User) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/hero-cinematic-reservoir.jpg"
          alt="Magammana Mountain Water Reservoir & Hydrostatic Intake Station"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] lg:object-[center_40%]"
        />
        {/* Scrims: Clean Navy Scrim on the left for text contrast, letting the misty mountains, reservoir & intake tower glow on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7, 21, 37, 0.94) 0%, rgba(7, 21, 37, 0.82) 42%, rgba(7, 21, 37, 0.44) 75%, rgba(7, 21, 37, 0.22) 100%)",
          }}
        />
        {/* Top Navbar Scrim */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#071525]/90 via-[#071525]/40 to-transparent" />
        {/* Bottom Transition Scrim */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#071525] via-[#071525]/85 to-transparent" />
      </div>

      {/* Technical Grid Pattern with Vignette Fade */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col space-y-6 sm:space-y-8">
          {/* Small Badge: THE FUTURE OF WATER BILLING */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: smoothEase }}
              className="inline-flex items-center"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.045] border border-[rgba(255,255,255,0.12)] shadow-[0_0_20px_rgba(0,217,255,0.16)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.2em] uppercase text-white/90">
                  THE FUTURE OF WATER BILLING
                </span>
              </div>
            </motion.div>

            {/* Main Master Headline */}
            <div className="space-y-1">
              <motion.h1
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: smoothEase }}
                className="font-sans font-extrabold text-[38px] sm:text-5xl lg:text-[62px] xl:text-[68px] text-white leading-[1.08] tracking-tight select-none"
              >
                <span>Smarter </span>
                <span className="text-[#00D9FF] drop-shadow-[0_0_35px_rgba(0,217,255,0.38)]">
                  Water Billing
                </span>
                .
                <br />
                <span>Simpler Everyday Living.</span>
              </motion.h1>
            </div>

            {/* Supporting Paragraph */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: smoothEase }}
              className="text-[#A8BACB] text-base sm:text-lg lg:text-[18px] leading-relaxed font-normal max-w-xl"
            >
              Experience a smarter way to manage your water bills. View account details, track water
              consumption, and make secure payments through one seamless digital platform.
            </motion.p>

            {/* Primary and Secondary CTA Buttons */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease: smoothEase }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              {/* Primary CTA */}
              <Link
                href="/pay"
                className="group relative inline-flex items-center justify-center gap-2.5 h-13 sm:h-14 px-8 rounded-xl bg-[#00D9FF] hover:bg-[#2ae0ff] text-[#071525] font-extrabold text-sm sm:text-base tracking-tight shadow-[0_10px_25px_-5px_rgba(0,217,255,0.45)] hover:shadow-[0_15px_35px_-5px_rgba(0,217,255,0.65)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="Pay Your Water Bill online"
              >
                <span>Pay Your Water Bill</span>
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/pay"
                className="group inline-flex items-center justify-center gap-2 h-13 sm:h-14 px-7 rounded-xl bg-white/[0.045] hover:bg-white/[0.085] text-white font-semibold text-sm sm:text-base border border-[rgba(255,255,255,0.14)] hover:border-white/30 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="View Account Details and past bills"
              >
                <span>View Account Details</span>
                <ArrowUpRight
                  size={16}
                  className="text-[#00D9FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            {/* =================================================================== */}
            {/* QUICK BILL LOOKUP COMPACT GLASS MODULE */}
            {/* =================================================================== */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: smoothEase }}
              className="rounded-2xl p-[1px] bg-gradient-to-b from-white/20 via-white/[0.08] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xl w-full"
            >
              <div className="backdrop-blur-xl bg-[rgba(255,255,255,0.045)] border border-[rgba(255,255,255,0.12)] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
                    <Search size={14} className="text-[#00D9FF]" />
                    <span>QUICK ACCOUNT BILL LOOKUP</span>
                  </span>
                  <span className="text-[#A8BACB] font-mono text-[11px] hidden sm:inline">
                    Instant 24/7 E-Bill Access
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00D9FF]">
                        <User size={15} />
                      </div>
                      <input
                        type="text"
                        value={accountInput}
                        onChange={(e) => setAccountInput(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder="Enter Consumer Account # (e.g. 135)"
                        aria-label="Water Consumer Account Number"
                        className={`w-full h-12 pl-13 pr-4 rounded-xl bg-[#071525]/90 text-white placeholder:text-slate-400 font-mono text-sm font-semibold transition-all duration-200 border ${
                          isInputFocused
                            ? "border-[#00D9FF] ring-2 ring-[#00D9FF]/20 shadow-[0_0_15px_rgba(0,217,255,0.15)]"
                            : "border-white/15 hover:border-white/25"
                        } focus:outline-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSearching}
                      className="h-12 px-6 rounded-xl bg-white hover:bg-slate-100 text-[#071525] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-[#071525]" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard size={15} className="text-[#071525]" />
                          <span>Check Bill</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Sample Clickable Test Accounts */}
                  <div className="flex items-center gap-2 pt-0.5 text-xs text-[#A8BACB] flex-wrap">
                    <span className="text-[11px] font-mono text-[#A8BACB]/80">Quick test:</span>
                    {["135", "102", "189"].map((acc) => (
                      <button
                        key={acc}
                        type="button"
                        onClick={() => handleQuickChipClick(acc)}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.06] hover:bg-[#00D9FF] hover:text-[#071525] text-white/90 font-mono text-[11px] font-semibold border border-white/10 hover:border-[#00D9FF] transition-all cursor-pointer"
                        title={`Load test account #${acc}`}
                      >
                        #{acc}
                      </button>
                    ))}
                  </div>

                  {/* Helper Links */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A8BACB]">
                    <button
                      type="button"
                      onClick={onOpenAccountHelp}
                      className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[11px] sm:text-xs"
                    >
                      <HelpCircle size={13} className="text-[#00D9FF]" />
                      <span>Need help finding your account number?</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenHowToPay}
                      className="flex items-center gap-1.5 hover:text-white transition-colors font-medium cursor-pointer text-[11px] sm:text-xs"
                    >
                      <span>How to Pay?</span>
                      <Play size={11} className="text-[#00D9FF]" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* =================================================================== */}
            {/* MINIMAL TRUST INDICATOR ROW (EXACT REQUIREMENTS) */}
            {/* =================================================================== */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42, ease: smoothEase }}
              className="pt-2"
            >
              <div className="flex flex-wrap items-center gap-y-2 text-[#A8BACB] text-xs font-mono uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#00D9FF]" />
                  <span className="font-semibold text-white/90">Secure Digital Payments</span>
                </div>

                <span className="hidden sm:inline-block w-px h-3.5 bg-white/20 mx-3.5" />

                <div className="flex items-center gap-2">
                  <Smartphone size={15} className="text-[#00D9FF]" />
                  <span className="font-semibold text-white/90">Easy Account Access</span>
                </div>

                <span className="hidden sm:inline-block w-px h-3.5 bg-white/20 mx-3.5" />

                <div className="flex items-center gap-2">
                  <Receipt size={15} className="text-[#00D9FF]" />
                  <span className="font-semibold text-white/90">Digital Billing Records</span>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
