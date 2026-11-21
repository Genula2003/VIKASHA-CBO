"use client";

import { useEffect, useRef, useState } from "react";
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
  Lock,
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
    <section
      className="relative w-full overflow-hidden bg-[#071525] text-white pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-36"
      aria-label="Water Billing Platform Overview"
    >
      {/* ========================================================================= */}
      {/* 1. SOPHISTICATED TECHNICAL BACKGROUND LAYER */}
      {/* ========================================================================= */}
      {/* Technical Grid Pattern with Vignette Fade */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
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

      {/* Primary Cyan Radial Ambient Illumination behind the 3D Dashboard */}
      <div
        className="absolute top-1/4 right-[5%] sm:right-[10%] w-[380px] sm:w-[540px] lg:w-[680px] h-[380px] sm:h-[540px] lg:h-[680px] rounded-full pointer-events-none blur-[100px] sm:blur-[140px] -z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 217, 255, 0.18) 0%, rgba(0, 217, 255, 0.05) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Secondary Soft Ambient Glow on the Left */}
      <div
        className="absolute -top-24 -left-24 w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full pointer-events-none blur-[120px] -z-0"
        style={{
          background: "radial-gradient(circle, rgba(0, 78, 235, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Minimal Abstract Water Flow Vector Geometry */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-100,250 C300,180 550,420 900,280 C1200,160 1350,340 1600,290"
          stroke="rgba(0, 217, 255, 0.22)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M-50,380 C320,320 620,540 1000,410 C1280,310 1420,460 1650,420"
          stroke="rgba(0, 217, 255, 0.15)"
          strokeWidth="1"
        />
        <path
          d="M0,520 C380,480 680,680 1080,560 C1360,470 1480,600 1700,580"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />
      </svg>

      {/* Bottom Gradient Transition to Next Section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 sm:h-36 pointer-events-none bg-gradient-to-t from-[#071525] via-[#071525]/80 to-transparent"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. SPLIT-SCREEN HERO CONTENT */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: BRANDING, HEADLINE, CTAs & LOOKUP (Approx 52%) */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 max-w-2xl">
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

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: FLOATING 3D BILLING DASHBOARD (Approx 48%) */}
          {/* ===================================================================== */}
          <div
            ref={containerRef}
            className="lg:col-span-5 relative w-full flex items-center justify-center py-6 sm:py-10"
            style={{ perspective: "1200px" }}
          >
            {/* Card Composition Container with Smooth Transform */}
            <motion.div
              ref={cardGroupRef}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: smoothEase }}
              className="relative w-full max-w-[460px] sm:max-w-[500px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Backlight Ambient Glow Ring */}
              <div
                className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-[#00D9FF]/25 via-transparent to-[#00D9FF]/10 blur-2xl -z-10"
                aria-hidden="true"
              />

              {/* =================================================================== */}
              {/* MAIN GLASS CARD — WATER ACCOUNT OVERVIEW */}
              {/* =================================================================== */}
              <div
                className="relative rounded-[28px] p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(0,217,255,0.12)] backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_35px_85px_-15px_rgba(0,0,0,0.85),0_0_65px_rgba(0,217,255,0.2)]"
                style={{
                  transform: "translateZ(0px)",
                }}
              >
                <div className="rounded-[27px] bg-[rgba(255,255,255,0.045)] border border-[rgba(255,255,255,0.12)] p-6 sm:p-7 space-y-5 text-white">
                  {/* Card Top Strip: Brand & Live Status */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/15 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.25)]">
                        <Droplets size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                          VIKASHA CBO WATER UTILITY
                        </div>
                        <div className="text-[11px] text-[#A8BACB]">Residential Meter Service</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ACTIVE</span>
                    </div>
                  </div>

                  {/* Account Number & Billing Period */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A8BACB]">ACCOUNT NUMBER</span>
                    <span className="text-white font-bold tracking-wider bg-white/[0.06] px-2.5 py-0.5 rounded border border-white/10">
                      ACC •••• 4892
                    </span>
                  </div>

                  {/* Primary Bill Amount & Status Badge */}
                  <div className="space-y-1.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#A8BACB]">
                      <span>CURRENT BILL DUE</span>
                      <span className="text-amber-300 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Pending
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white">
                        Rs. 2,450<span className="text-xl sm:text-2xl text-white/70">.00</span>
                      </div>
                      <span className="text-xs font-mono text-[#A8BACB]">Period: Nov 2026</span>
                    </div>
                  </div>

                  {/* Consumption Metrics & Breakdown */}
                  <div className="grid grid-cols-2 gap-3 pt-0.5">
                    <div className="p-3 rounded-xl bg-white/[0.025] border border-white/5 space-y-1">
                      <div className="text-[10.5px] font-mono text-[#A8BACB] uppercase">
                        Water Consumption
                      </div>
                      <div className="text-xl font-bold font-sans text-white flex items-baseline gap-1.5">
                        <span>18 m³</span>
                        <span className="text-[11px] text-emerald-400 font-mono font-normal flex items-center">
                          <TrendingDown size={11} className="mr-0.5" />
                          -12%
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.025] border border-white/5 space-y-1">
                      <div className="text-[10.5px] font-mono text-[#A8BACB] uppercase">
                        Water Quality
                      </div>
                      <div className="text-sm font-bold font-mono text-[#00D9FF] flex items-center gap-1.5 pt-0.5">
                        <Zap size={13} />
                        <span>SLS 614 Certified</span>
                      </div>
                    </div>
                  </div>

                  {/* Minimal Cyan Consumption Chart (6-Month Historical Sparkline) */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A8BACB]">CONSUMPTION TREND (M³)</span>
                      <span className="text-[#00D9FF] font-semibold">18 m³ Current</span>
                    </div>

                    {/* SVG Sparkline Graph */}
                    <div className="relative h-18 sm:h-20 w-full overflow-hidden rounded-xl bg-black/30 border border-white/5 p-2 flex items-end">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 320 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Background Grid Lines */}
                        <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                        {/* Area Fill Under Curve */}
                        <path
                          d="M0,50 Q40,35 64,45 T128,30 T192,55 T256,40 T320,52 L320,80 L0,80 Z"
                          fill="url(#chartGradient)"
                        />

                        {/* Main Cyan Trend Line */}
                        <path
                          d="M0,50 Q40,35 64,45 T128,30 T192,55 T256,40 T320,52"
                          stroke="#00D9FF"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Historical Data Points */}
                        {[
                          { cx: 0, cy: 50 },
                          { cx: 64, cy: 45 },
                          { cx: 128, cy: 30 },
                          { cx: 192, cy: 55 },
                          { cx: 256, cy: 40 },
                        ].map((pt, i) => (
                          <circle
                            key={i}
                            cx={pt.cx}
                            cy={pt.cy}
                            r="3"
                            fill="#071525"
                            stroke="#00D9FF"
                            strokeWidth="1.5"
                          />
                        ))}

                        {/* Active Current Month Point with Ripple */}
                        <circle cx="320" cy="52" r="7" fill="rgba(0,217,255,0.3)" />
                        <circle cx="320" cy="52" r="4" fill="#00D9FF" stroke="#FFFFFF" strokeWidth="1.5" />
                      </svg>
                    </div>

                    {/* Month Labels */}
                    <div className="flex justify-between text-[10px] font-mono text-[#A8BACB] px-1">
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
                className="absolute -top-7 -right-4 sm:-right-8 z-20 rounded-2xl p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-[heroFloatSlow_6s_ease-in-out_infinite]"
                style={{
                  transform: "translateZ(38px)",
                }}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#071525]/85 border border-[rgba(255,255,255,0.12)]">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-sm shrink-0">
                    <CreditCard size={17} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A8BACB] uppercase">Payment Status</div>
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
                className="absolute -bottom-6 -left-4 sm:-left-8 z-20 rounded-2xl p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-[heroFloatReverse_7s_ease-in-out_infinite]"
                style={{
                  transform: "translateZ(50px)",
                }}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#071525]/85 border border-[rgba(255,255,255,0.12)]">
                  <div className="w-9 h-9 rounded-xl bg-[#00D9FF]/15 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] shadow-sm shrink-0">
                    <Droplets size={17} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A8BACB] uppercase">Monthly Usage</div>
                    <div className="text-xs font-bold text-white">
                      18 m³ <span className="font-normal text-[#A8BACB] text-[11px]">(Efficient)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* FLOATING CARD 3 — DIGITAL BILLING (BOTTOM RIGHT LAYER) */}
              {/* =================================================================== */}
              <div
                className="hidden sm:block absolute -bottom-10 right-6 z-10 rounded-2xl p-[1px] bg-gradient-to-b from-white/25 via-white/5 to-transparent shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-[heroFloatSlow_8s_ease-in-out_infinite]"
                style={{
                  transform: "translateZ(26px)",
                  animationDelay: "-3s",
                }}
              >
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#071525]/80 border border-[rgba(255,255,255,0.1)]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#00D9FF] shrink-0">
                    <FileText size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white font-semibold">Digital Bills</div>
                    <div className="text-[10.5px] text-[#A8BACB]">View billing records</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
