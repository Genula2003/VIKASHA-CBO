"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Droplets,
  FileText,
  HelpCircle,
  Loader2,
  Play,
  Receipt,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingDown,
  User,
  Zap,
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

  // 3D Tilt interaction refs (GPU-accelerated via requestAnimationFrame without triggering React state re-renders)
  const containerRef = useRef<HTMLDivElement>(null);
  const cardGroupRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const currentRot = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Check if device supports fine hover pointer
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize between -1 and 1
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Subtle tilt: max 5-6 degrees
      targetRot.current.x = -normY * 5.5;
      targetRot.current.y = normX * 6.5;
    };

    const handleMouseLeave = () => {
      targetRot.current.x = 0;
      targetRot.current.y = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove, { passive: true });
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // Smooth lerp loop
    const animate = () => {
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.08;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.08;

      if (cardGroupRef.current) {
        cardGroupRef.current.style.transform = `perspective(1200px) rotateX(${currentRot.current.x.toFixed(
          2
        )}deg) rotateY(${currentRot.current.y.toFixed(2)}deg)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [shouldReduceMotion]);

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
      className="relative w-full overflow-visible bg-[#071525] text-white pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-32"
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
        {/* Scrims: Clean Navy Scrim on the left for text contrast, letting the misty mountains & reservoir glow on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7, 21, 37, 0.96) 0%, rgba(7, 21, 37, 0.88) 42%, rgba(7, 21, 37, 0.52) 75%, rgba(7, 21, 37, 0.28) 100%)",
          }}
        />
        {/* Top Navbar Scrim */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#071525]/90 via-[#071525]/40 to-transparent" />
        {/* Bottom Transition Scrim */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071525] via-[#071525]/85 to-transparent" />
      </div>

      {/* Primary Cyan Radial Ambient Illumination behind the 3D Glass Dashboard */}
      <div
        className="absolute top-1/2 right-[5%] lg:right-[8%] -translate-y-1/2 w-[380px] sm:w-[520px] lg:w-[620px] h-[380px] sm:h-[520px] lg:h-[620px] rounded-full pointer-events-none blur-[100px] sm:blur-[130px] z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 217, 255, 0.16) 0%, rgba(0, 102, 255, 0.08) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

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
      {/* 2. HERO CONTENT (TWO-COLUMN RESPONSIVE GRID) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: HEADLINE, CTAs & QUICK BILL LOOKUP FORM */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col space-y-4 sm:space-y-5">
            {/* Small Badge: THE FUTURE OF WATER BILLING */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: smoothEase }}
              className="inline-flex items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.045] border border-[rgba(255,255,255,0.12)] shadow-[0_0_15px_rgba(0,217,255,0.14)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-white/90">
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
                className="font-sans font-extrabold text-[32px] sm:text-4xl lg:text-[44px] xl:text-[48px] text-white leading-[1.12] tracking-tight select-none"
              >
                <span>Smarter </span>
                <span className="text-[#00D9FF] drop-shadow-[0_0_30px_rgba(0,217,255,0.35)]">
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
              className="text-[#A8BACB] text-sm sm:text-base leading-relaxed font-normal max-w-xl"
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
                className="group relative inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-xl bg-[#00D9FF] hover:bg-[#2ae0ff] text-[#071525] font-extrabold text-sm tracking-tight shadow-[0_8px_20px_-4px_rgba(0,217,255,0.4)] hover:shadow-[0_12px_28px_-4px_rgba(0,217,255,0.6)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
                className="group inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 rounded-xl bg-white/[0.045] hover:bg-white/[0.085] text-white font-semibold text-sm border border-[rgba(255,255,255,0.14)] hover:border-white/30 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="View Account Details and past bills"
              >
                <span>View Account Details</span>
                <ArrowUpRight
                  size={15}
                  className="text-[#00D9FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            {/* =================================================================== */}
            {/* QUICK BILL LOOKUP COMPACT GLASS MODULE */}
            {/* =================================================================== */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease: smoothEase }}
              className="rounded-2xl p-[1px] bg-gradient-to-b from-white/20 via-white/[0.08] to-transparent shadow-[0_15px_40px_rgba(0,0,0,0.45)] max-w-xl w-full"
            >
              <div className="backdrop-blur-xl bg-[rgba(255,255,255,0.045)] border border-[rgba(255,255,255,0.12)] rounded-2xl p-3.5 sm:p-4">
                <div className="flex items-center justify-between mb-2.5 text-xs">
                  <span className="font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
                    <Search size={13} className="text-[#00D9FF]" />
                    <span className="text-[11px] sm:text-xs">QUICK ACCOUNT BILL LOOKUP</span>
                  </span>
                  <span className="text-[#A8BACB] font-mono text-[10px] sm:text-[11px] hidden sm:inline">
                    Instant 24/7 E-Bill Access
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00D9FF]">
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
                        className={`w-full h-10 sm:h-11 pl-11 pr-3 rounded-xl bg-[#071525]/90 text-white placeholder:text-slate-400 font-mono text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                          isInputFocused
                            ? "border-[#00D9FF] ring-2 ring-[#00D9FF]/20 shadow-[0_0_15px_rgba(0,217,255,0.15)]"
                            : "border-white/15 hover:border-white/25"
                        } focus:outline-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSearching}
                      className="h-10 sm:h-11 px-5 rounded-xl bg-white hover:bg-slate-100 text-[#071525] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 size={15} className="animate-spin text-[#071525]" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard size={14} className="text-[#071525]" />
                          <span>Check Bill</span>
                          <ArrowRight size={13} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Sample Clickable Test Accounts */}
                  <div className="flex items-center gap-2 pt-0.5 text-xs text-[#A8BACB] flex-wrap">
                    <span className="text-[10.5px] font-mono text-[#A8BACB]/80">Quick test:</span>
                    {["135", "102", "189"].map((acc) => (
                      <button
                        key={acc}
                        type="button"
                        onClick={() => handleQuickChipClick(acc)}
                        className="px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-[#00D9FF] hover:text-[#071525] text-white/90 font-mono text-[10.5px] font-semibold border border-white/10 hover:border-[#00D9FF] transition-all cursor-pointer"
                        title={`Load test account #${acc}`}
                      >
                        #{acc}
                      </button>
                    ))}
                  </div>

                  {/* Helper Links */}
                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#A8BACB]">
                    <button
                      type="button"
                      onClick={onOpenAccountHelp}
                      className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[10.5px] sm:text-[11px]"
                    >
                      <HelpCircle size={12} className="text-[#00D9FF]" />
                      <span>Need help finding your account number?</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenHowToPay}
                      className="flex items-center gap-1.5 hover:text-white transition-colors font-medium cursor-pointer text-[10.5px] sm:text-[11px]"
                    >
                      <span>How to Pay?</span>
                      <Play size={10} className="text-[#00D9FF]" />
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
              <div className="flex flex-wrap items-center gap-y-1.5 text-[#A8BACB] text-[11px] font-mono uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#00D9FF]" />
                  <span className="font-semibold text-white/90">Secure Digital Payments</span>
                </div>

                <span className="hidden sm:inline-block w-px h-3 bg-white/20 mx-3" />

                <div className="flex items-center gap-1.5">
                  <Smartphone size={14} className="text-[#00D9FF]" />
                  <span className="font-semibold text-white/90">Easy Account Access</span>
                </div>

                <span className="hidden sm:inline-block w-px h-3 bg-white/20 mx-3" />

                <div className="flex items-center gap-1.5">
                  <Receipt size={14} className="text-[#00D9FF]" />
                  <span className="font-semibold text-white/90">Digital Billing Records</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: 3D FLOATING WEB UI GLASSMORPHISM UTILITY DASHBOARD */}
          {/* --------------------------------------------------------------------- */}
          <div
            ref={containerRef}
            className="lg:col-span-5 xl:col-span-6 flex items-center justify-center relative py-6 lg:py-0 select-none"
            style={{ perspective: 1200 }}
          >
            <motion.div
              ref={cardGroupRef}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.25, ease: smoothEase }}
              className="relative w-full max-w-[460px] sm:max-w-[490px] transition-transform duration-100 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* =================================================================== */}
              {/* MAIN GLASSMORPHISM BILLING UTILITY PANEL */}
              {/* =================================================================== */}
              <div
                className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/35 via-white/12 to-white/5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_45px_rgba(0,217,255,0.18)] backdrop-blur-2xl"
                style={{
                  transform: "translateZ(0px)",
                }}
              >
                <div className="rounded-3xl bg-[#071525]/55 backdrop-blur-2xl p-5 sm:p-6 border border-white/20 space-y-4 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25)]">

                  {/* Header Row: Utility Title, Water Droplet Icon & Active Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#00D9FF]/15 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.3)] shrink-0">
                        <Droplets size={19} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-white">
                          VIKASHA CBO WATER UTILITY
                        </div>
                        <div className="text-[10.5px] sm:text-[11px] text-[#A8BACB] font-mono">
                          Residential Meter Service
                        </div>
                      </div>
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 text-[10px] sm:text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ACTIVE</span>
                    </div>
                  </div>

                  {/* Account Number Strip */}
                  <div className="flex items-center justify-between text-xs py-0.5">
                    <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider text-[#A8BACB]">
                      ACCOUNT NUMBER
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-white font-mono text-xs font-semibold tracking-wider">
                      ACC •••• 4892
                    </span>
                  </div>

                  {/* Current Bill Due Card */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.045] border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8BACB] uppercase tracking-wider">CURRENT BILL DUE</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Pending
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                        Rs. 2,450<span className="text-lg font-bold text-white/80">.00</span>
                      </div>
                      <span className="text-[11px] sm:text-xs text-[#A8BACB] font-mono">
                        Period: Nov 2026
                      </span>
                    </div>
                  </div>

                  {/* Two Mini Metrics (Consumption & SLS Water Quality) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.035] border border-white/10 backdrop-blur-sm">
                      <div className="text-[10px] font-mono text-[#A8BACB] uppercase">WATER CONSUMPTION</div>
                      <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mt-0.5">
                        <span>18 m³</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center">
                          <TrendingDown size={11} className="mr-0.5" />
                          -12%
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.035] border border-white/10 backdrop-blur-sm">
                      <div className="text-[10px] font-mono text-[#A8BACB] uppercase">WATER QUALITY</div>
                      <div className="text-xs sm:text-[13px] font-bold text-[#00D9FF] flex items-center gap-1 mt-1">
                        <Zap size={12} className="shrink-0" />
                        <span className="truncate">SLS 614 Certified</span>
                      </div>
                    </div>
                  </div>

                  {/* Consumption Trend Mini Wave Chart */}
                  <div className="p-3 rounded-xl bg-[#061220]/75 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-[#A8BACB] uppercase">CONSUMPTION TREND (M³)</span>
                      <span className="text-[#00D9FF] font-semibold">18 m³ Current</span>
                    </div>

                    {/* Glowing Cyan Trend SVG Chart */}
                    <div className="w-full h-16 relative">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 340 70"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="chartGradientHero" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="chartLineGradHero" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#00D9FF" />
                            <stop offset="60%" stopColor="#00D9FF" />
                            <stop offset="100%" stopColor="#38bdf8" />
                          </linearGradient>
                          <filter id="glowHero" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Filled Area under Curve */}
                        <path
                          d="M 10 46 C 45 42, 65 48, 95 38 C 130 25, 150 56, 185 52 C 220 48, 245 18, 280 20 C 305 22, 320 44, 330 46 L 330 68 L 10 68 Z"
                          fill="url(#chartGradientHero)"
                        />

                        {/* Main Glowing Curve Line */}
                        <path
                          d="M 10 46 C 45 42, 65 48, 95 38 C 130 25, 150 56, 185 52 C 220 48, 245 18, 280 20 C 305 22, 320 44, 330 46"
                          fill="none"
                          stroke="url(#chartLineGradHero)"
                          strokeWidth="2.5"
                          filter="url(#glowHero)"
                        />

                        {/* Individual Data Points */}
                        <circle cx="10" cy="46" r="3" fill="#071525" stroke="#00D9FF" strokeWidth="2" />
                        <circle cx="95" cy="38" r="3" fill="#071525" stroke="#00D9FF" strokeWidth="2" />
                        <circle cx="185" cy="52" r="3" fill="#071525" stroke="#00D9FF" strokeWidth="2" />
                        <circle cx="280" cy="20" r="3" fill="#071525" stroke="#00D9FF" strokeWidth="2" />
                        <circle cx="330" cy="46" r="4" fill="#00D9FF" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Chart Month Labels */}
                    <div className="flex justify-between text-[10px] font-mono text-[#A8BACB] pt-0.5">
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span className="text-[#00D9FF] font-bold">Nov (18m³)</span>
                    </div>
                  </div>

                  {/* Sample Data Disclaimer Badge */}
                  <div className="pt-2 text-center text-[10px] font-mono text-[#A8BACB]/70 border-t border-white/5">
                    * Sample account preview for illustrative demonstration
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* FLOATING CARD 1 — PAYMENT STATUS (TOP RIGHT LAYER) */}
              {/* =================================================================== */}
              <div
                className="absolute -top-6 -right-3 sm:-right-6 z-20 rounded-2xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent shadow-[0_20px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl animate-[heroFloatSlow_6s_ease-in-out_infinite]"
                style={{
                  transform: "translateZ(38px)",
                }}
              >
                <div className="flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-[#071525]/85 border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/35 flex items-center justify-center text-emerald-400 shadow-sm shrink-0">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <div className="text-[9.5px] sm:text-[10px] font-mono text-[#A8BACB] uppercase">Payment Status</div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Secure Payments</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* FLOATING CARD 2 — WATER CONSUMPTION (BOTTOM LEFT LAYER) */}
              {/* =================================================================== */}
              <div
                className="absolute -bottom-5 -left-3 sm:-left-6 z-20 rounded-2xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent shadow-[0_20px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl animate-[heroFloatReverse_7s_ease-in-out_infinite]"
                style={{
                  transform: "translateZ(50px)",
                }}
              >
                <div className="flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-[#071525]/85 border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#00D9FF]/15 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] shadow-sm shrink-0">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <div className="text-[9.5px] sm:text-[10px] font-mono text-[#A8BACB] uppercase">Monthly Usage</div>
                    <div className="text-xs font-bold text-white">
                      18 m³ <span className="font-normal text-[#A8BACB] text-[10.5px]">(Efficient)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* FLOATING CARD 3 — DIGITAL BILLING (BOTTOM RIGHT LAYER) */}
              {/* =================================================================== */}
              <div
                className="hidden sm:block absolute -bottom-8 right-5 z-10 rounded-2xl p-[1px] bg-gradient-to-b from-white/25 via-white/5 to-transparent shadow-[0_15px_35px_rgba(0,0,0,0.55)] backdrop-blur-xl animate-[heroFloatSlow_8s_ease-in-out_infinite]"
                style={{
                  transform: "translateZ(26px)",
                  animationDelay: "-3s",
                }}
              >
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#071525]/80 border border-[rgba(255,255,255,0.12)] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00D9FF] shrink-0">
                    <FileText size={14} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white font-semibold">Digital Bills</div>
                    <div className="text-[10px] text-[#A8BACB]">View billing records</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
