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

  return (
    <div
      className="relative w-full overflow-hidden bg-white text-slate-900 pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28"
      aria-label="Water Billing Platform Overview"
    >
      {/* Delicate Water Ambient Glow & Grid Pattern in Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft radial cyan/sky blue ambient glow behind the water drop on the left */}
        <div
          className="absolute -top-10 left-[5%] lg:left-[8%] w-[420px] sm:w-[560px] lg:w-[680px] h-[420px] sm:h-[560px] lg:h-[680px] rounded-full pointer-events-none blur-[120px] sm:blur-[140px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 180, 216, 0.22) 0%, rgba(72, 202, 228, 0.12) 40%, rgba(202, 240, 248, 0.05) 70%, transparent 85%)",
          }}
          aria-hidden="true"
        />

        {/* Soft radial blue accent on the right */}
        <div
          className="absolute bottom-0 right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[140px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 119, 182, 0.12) 0%, rgba(144, 224, 239, 0.08) 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Light Technical Grid Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(8, 27, 56, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(8, 27, 56, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

          {/* =================================================================== */}
          {/* LEFT COLUMN: CRYSTAL 3D WATER DROPLET IMAGE */}
          {/* =================================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative order-1 lg:order-1">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1, y: 0 }
                  : {
                      opacity: 1,
                      scale: 1,
                      y: [0, -12, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.8, ease: smoothEase }
                  : {
                      opacity: { duration: 0.8, ease: smoothEase },
                      scale: { duration: 0.8, ease: smoothEase },
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] flex items-center justify-center py-2"
            >
              {/* Luminous water aura behind drop */}
              <div
                className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-[#00b4d8]/20 via-[#48cae4]/15 to-transparent blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Water Drop Image */}
              <div className="relative w-full aspect-[1024/682] select-none filter drop-shadow-[0_25px_45px_rgba(0,140,200,0.22)]">
                <Image
                  src="/water-drop.png"
                  alt="Pure Water Drop - Vikasha CBO Water Utility"
                  fill
                  priority
                  sizes="(max-width: 768px) 340px, (max-width: 1200px) 420px, 460px"
                  className="object-contain"
                />
              </div>

              {/* Subtle Hydro Refraction Pill Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: smoothEase }}
                className="absolute -bottom-2 sm:bottom-0 right-2 sm:right-6 bg-white/90 backdrop-blur-md border border-cyan-200/80 rounded-full px-3.5 py-1.5 shadow-[0_8px_20px_rgba(0,180,216,0.18)] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-wider text-slate-800 uppercase">
                  SLS 614 Purity
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT COLUMN: HEADLINE, CTAs & QUICK BILL LOOKUP FORM */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-4 sm:space-y-5 order-2 lg:order-2">
            {/* Small Badge: THE FUTURE OF WATER BILLING */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: smoothEase }}
              className="inline-flex items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 shadow-[0_2px_10px_rgba(0,180,216,0.12)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-cyan-900">
                  THE FUTURE OF WATER BILLING
                </span>
              </div>
            </motion.div>

            {/* Main Master Headline */}
            <div className="space-y-1">
              <motion.h1
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08, ease: smoothEase }}
                className="font-sans font-extrabold text-[32px] sm:text-4xl lg:text-[42px] xl:text-[46px] text-[#081B38] leading-[1.14] tracking-tight select-none"
              >
                <span>Smarter </span>
                <span className="bg-gradient-to-r from-cyan-600 via-[#0096c7] to-[#081B38] bg-clip-text text-transparent">
                  Water Billing
                </span>
                .
                <br />
                <span>Simpler Everyday Living.</span>
              </motion.h1>
            </div>

            {/* Supporting Paragraph */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: smoothEase }}
              className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl"
            >
              Experience a smarter way to manage your water bills. View account details, track water
              consumption, and make secure payments through one seamless digital platform.
            </motion.p>

            {/* Primary and Secondary CTA Buttons */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: smoothEase }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0.5"
            >
              {/* Primary CTA */}
              <Link
                href="/pay"
                className="group relative inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-[#0077b6] hover:from-cyan-500 hover:to-[#0096c7] text-white font-extrabold text-sm tracking-tight shadow-[0_8px_20px_-4px_rgba(0,180,216,0.4)] hover:shadow-[0_12px_28px_-4px_rgba(0,180,216,0.6)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="Pay Your Water Bill online"
              >
                <span>Pay Your Water Bill</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/pay"
                className="group inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#081B38] font-semibold text-sm border border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="View Account Details and past bills"
              >
                <span>View Account Details</span>
                <ArrowUpRight
                  size={15}
                  className="text-cyan-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            {/* =================================================================== */}
            {/* QUICK BILL LOOKUP COMPACT CARD (WHITE THEME) */}
            {/* =================================================================== */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease: smoothEase }}
              className="rounded-2xl p-[1px] bg-gradient-to-b from-cyan-200/60 via-slate-200/80 to-slate-200/40 shadow-[0_15px_35px_-5px_rgba(8,27,56,0.08)] max-w-xl w-full"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-3.5 sm:p-4">
                <div className="flex items-center justify-between mb-2.5 text-xs">
                  <span className="font-mono uppercase tracking-wider font-bold text-[#081B38] flex items-center gap-2">
                    <Search size={13} className="text-cyan-600" />
                    <span className="text-[11px] sm:text-xs">QUICK ACCOUNT BILL LOOKUP</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[10px] sm:text-[11px] hidden sm:inline">
                    Instant 24/7 E-Bill Access
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-cyan-600">
                        <User size={14} />
                      </div>
                      <input
                        type="text"
                        value={accountInput}
                        onChange={(e) => setAccountInput(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder="Enter Consumer Account # (e.g. 135)"
                        aria-label="Water Consumer Account Number"
                        className={`w-full h-10 sm:h-11 pl-11 pr-3 rounded-xl bg-slate-50/80 text-slate-900 placeholder:text-slate-400 font-mono text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                          isInputFocused
                            ? "border-cyan-500 ring-2 ring-cyan-500/20 shadow-[0_0_15px_rgba(0,180,216,0.15)] bg-white"
                            : "border-slate-200 hover:border-slate-300"
                        } focus:outline-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSearching}
                      className="h-10 sm:h-11 px-5 rounded-xl bg-[#081B38] hover:bg-[#0b2548] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 size={15} className="animate-spin text-white" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard size={14} className="text-cyan-400" />
                          <span>Check Bill</span>
                          <ArrowRight size={13} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Helper Links */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-500">
                    <button
                      type="button"
                      onClick={onOpenAccountHelp}
                      className="flex items-center gap-1.5 hover:text-[#081B38] transition-colors cursor-pointer text-[10.5px] sm:text-[11px]"
                    >
                      <HelpCircle size={12} className="text-cyan-600" />
                      <span>Need help finding your account number?</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenHowToPay}
                      className="flex items-center gap-1.5 hover:text-[#081B38] transition-colors font-medium cursor-pointer text-[10.5px] sm:text-[11px]"
                    >
                      <span>How to Pay?</span>
                      <Play size={10} className="text-cyan-600" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* =================================================================== */}
            {/* MINIMAL TRUST INDICATOR ROW */}
            {/* =================================================================== */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: smoothEase }}
              className="pt-1"
            >
              <div className="flex flex-wrap items-center gap-y-1.5 text-slate-600 text-[11px] font-mono uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-cyan-600" />
                  <span className="font-semibold text-slate-800">Secure Digital Payments</span>
                </div>

                <span className="hidden sm:inline-block w-px h-3 bg-slate-300 mx-3" />

                <div className="flex items-center gap-1.5">
                  <Smartphone size={14} className="text-cyan-600" />
                  <span className="font-semibold text-slate-800">Easy Account Access</span>
                </div>

                <span className="hidden sm:inline-block w-px h-3 bg-slate-300 mx-3" />

                <div className="flex items-center gap-1.5">
                  <Receipt size={14} className="text-cyan-600" />
                  <span className="font-semibold text-slate-800">Digital Billing Records</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
