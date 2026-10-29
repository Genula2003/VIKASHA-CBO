"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ImageSlideshow from "@/components/ImageSlideshow";
import PageLoader from "@/components/PageLoader";
import VideoShowcase from "@/components/VideoShowcase";
import WaterServicesShowcase from "@/components/WaterServicesShowcase";
import {
  User,
  ArrowRight,
  Clock,
  Droplet,
  Droplets,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Play,
  HelpCircle,
  FileCheck2,
  Building2,
  Shield,
  Loader2,
  X,
  FileText,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";

// Silky momentum cubic-bezier easing curve
const smoothEase = [0.22, 1, 0.36, 1] as const;

// Staggered motion container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

export default function Home() {
  const router = useRouter();
  const [quickAccount, setQuickAccount] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showHowToPay, setShowHowToPay] = useState(false);
  const [showAccountHelp, setShowAccountHelp] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    if (quickAccount.trim()) {
      router.push(`/pay?acc=${encodeURIComponent(quickAccount.trim())}`);
    } else {
      router.push("/pay");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">

      {/* ========================================================================= */}
      {/* 0. INITIAL PAGE WHITE THEME LANDING ANIMATION */}
      {/* ========================================================================= */}
      <PageLoader minDuration={850} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (NATURE WATER RESERVOIR & NEON GLASS QUICK PAY) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#03152d] text-white">

        {/* Top Navbar */}
        <Navbar />

        {/* Full-Width Reservoir Container with Rich Cinematic Lighting */}
        <div className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] w-full flex items-center pt-24 sm:pt-32 lg:pt-36 pb-20 sm:pb-32 lg:pb-44">

          {/* Background Nature Water Lake Photo with Multi-Layered Scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-reservoir-bg.jpg"
              alt="Magammana Nature Water Reservoir"
              className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[subtleZoom_20s_infinite_alternate_ease-in-out]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {/* Cinematic Scrims: Left dark navy backdrop for crystal clear readability; transparent right for sunlight & reservoir */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#03152d]/98 via-[#03152d]/85 sm:via-[#03152d]/60 to-[#03152d]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03152d] via-transparent to-[#03152d]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,192,247,0.15),transparent_65%)]" />
          </div>

          {/* Hero Content Area */}
          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl space-y-5 sm:space-y-6"
            >
              {/* Eyebrow Pill Badge */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] text-[11px] sm:text-xs font-mono font-bold tracking-wider text-sky-100">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
                    <Droplet size={11} className="fill-white" />
                  </div>
                  <span className="uppercase tracking-wider">DEMOCRATICALLY GOVERNED CBO &bull; MAGAMMANA</span>
                </div>
              </motion.div>

              {/* Master Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.12] sm:leading-[1.1] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] select-none"
              >
                <span className="block">A Legacy of Trust</span>
                <span className="block">Built on a Sophisticated</span>
                <span className="block bg-gradient-to-r from-[#00c0f7] via-[#38bdf8] to-[#60a5fa] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(0,192,247,0.45)]">
                  Water Community.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-slate-200/95 max-w-xl leading-relaxed drop-shadow-md font-normal"
              >
                Continuous SLS 614 certified drinking water, instant online e-bill settlements, and transparent community stewardship for every household in Magammana.
              </motion.p>

              {/* =================================================================== */}
              {/* CLEAN GLASSMORPHIC QUICK BILL PAY CARD */}
              {/* =================================================================== */}
              <motion.div
                variants={itemVariants}
                className="relative rounded-2xl sm:rounded-3xl p-[1.5px] bg-gradient-to-b from-sky-300/80 via-sky-500/40 to-blue-600/70 shadow-[0_20px_60px_rgba(2,18,44,0.7),0_0_35px_rgba(14,165,233,0.25)] max-w-xl w-full overflow-hidden group/card"
              >
                <div className="relative rounded-[22px] backdrop-blur-2xl bg-[#071933]/90 sm:bg-[#071933]/85 p-4 sm:p-6 text-white overflow-hidden border border-white/10">
                  
                  {/* Subtle Corner Glow Blooms */}
                  <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

                  {/* Header Row: Title & Live Pulse */}
                  <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-sky-400/30 to-blue-600/30 border border-sky-400/50 flex items-center justify-center text-sky-300 shadow-inner shrink-0">
                        <Droplets size={18} className="text-sky-300" />
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        Quick Bill Verification &amp; Payment
                      </h2>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-[11px] font-semibold shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                      <span>24/7 E-Bill Active</span>
                    </div>
                  </div>

                  {/* Form: White Pill Input + Royal Electric Blue Action Button */}
                  <form onSubmit={handleQuickSearch} className="relative z-10 space-y-3.5">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      
                      {/* Input Field: min 16px font-size to prevent mobile auto-zoom */}
                      <div className="relative flex-1 min-w-0 group/input">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 pointer-events-none transition-transform group-focus-within/input:scale-110">
                          <User size={15} />
                        </div>
                        <input
                          type="text"
                          value={quickAccount}
                          onChange={(e) => setQuickAccount(e.target.value)}
                          placeholder="Enter Account No. (e.g. 135)"
                          className="w-full h-12 sm:h-13 pl-11 sm:pl-12 pr-4 rounded-xl sm:rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-base sm:text-sm font-semibold border border-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-200"
                        />
                      </div>

                      {/* Primary Action Button */}
                      <button
                        type="submit"
                        disabled={isSearching}
                        className="h-12 sm:h-13 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0052e0] via-[#0066ff] to-[#0084ff] hover:from-[#0047cc] hover:to-[#0073e6] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,102,255,0.45)] hover:shadow-[0_12px_32px_rgba(0,102,255,0.65)] hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 border border-sky-300/40 transition-all duration-300 group/btn w-full sm:w-auto whitespace-nowrap"
                      >
                        {isSearching ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-white" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <FileText size={16} className="text-white drop-shadow-sm" />
                            <span>View &amp; Pay Bill</span>
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover/btn:translate-x-0.5 transition-transform">
                              <ArrowRight size={12} strokeWidth={2.5} />
                            </div>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quick Test Numbers */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="text-[11px] sm:text-xs font-medium text-slate-300">Quick Test:</span>
                      {["135", "102", "189"].map((acc) => {
                        const isSelected = quickAccount === acc;
                        return (
                          <button
                            key={acc}
                            type="button"
                            onClick={() => setQuickAccount(acc)}
                            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold border transition-all duration-200 cursor-pointer active:scale-95 ${
                              isSelected
                                ? "bg-sky-500/50 border-sky-300 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                                : "bg-[#062042]/80 hover:bg-sky-600/30 text-sky-200 hover:text-white border-sky-400/40 hover:border-sky-300"
                            }`}
                          >
                            #{acc}
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom Helper Links */}
                    <div className="pt-3 border-t border-sky-400/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setShowAccountHelp(true)}
                        className="flex items-center gap-1.5 text-slate-300 hover:text-sky-300 transition-colors cursor-pointer group/help text-left text-[11px] sm:text-xs"
                      >
                        <HelpCircle size={14} className="text-sky-400 group-hover/help:text-sky-300 transition-colors shrink-0" />
                        <span>Where is my account number?</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHowToPay(true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/60 hover:bg-sky-900/50 border border-sky-400/40 hover:border-sky-300 text-slate-200 hover:text-white font-medium text-[10px] sm:text-[11px] transition-all duration-200 cursor-pointer shrink-0"
                      >
                        <span>How to Pay Online</span>
                        <ChevronRight size={11} className="text-sky-300" />
                      </button>
                    </div>

                  </form>
                </div>
              </motion.div>

              {/* Floating Trust Pillars Bar */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-xl text-slate-200 text-xs"
              >
                {[
                  { icon: ShieldCheck, label: "SLS 614 Certified", sub: "Purity Standard" },
                  { icon: Clock, label: "24/7 Supply", sub: "Gravity Reservoir" },
                  { icon: Zap, label: "Zero Fee Pay", sub: "LankaQR / Cards" },
                  { icon: CheckCircle2, label: "Instant Receipt", sub: "Official Stamped" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/50 backdrop-blur-md border border-white/10"
                  >
                    <item.icon size={15} className="text-sky-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-[11px] leading-tight text-white truncate">{item.label}</p>
                      <p className="text-[9px] text-slate-400 leading-tight truncate">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

            </motion.div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. OVERLAPPING SPOTLIGHT CARDS */}
      {/* ========================================================================= */}
      <section className="relative z-30 max-w-[1360px] mx-auto px-4 sm:px-6 -mt-8 sm:-mt-16 lg:-mt-24 mb-12 sm:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {[
            {
              category: "Smart Telemetry",
              title: "SMART METERING",
              desc: "High-precision optical telemetry logging and automated consumption tracking across households.",
              image: "/card-smart-meter.webp",
              href: "/pay",
              dotColor: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
              chips: ["±0.01 m³ Precision", "Optical Logging"],
              cta: "Explore Metering"
            },
            {
              category: "Digital E-Billing",
              title: "ONLINE BILL PAY",
              desc: "Instant zero-surcharge settlement via LankaQR, Visa, Mastercard, and direct CEFT transfer.",
              image: "/card-ebill-pay.webp",
              href: "/pay",
              dotColor: "bg-blue-400 shadow-[0_0_8px_#60a5fa]",
              chips: ["Zero Surcharges", "Instant LankaQR / Card"],
              cta: "Pay Bill Online"
            },
            {
              category: "Water Quality",
              title: "WATER PURITY",
              desc: "Continuous deep-well filtration and automated chlorination compliant with SLS 614 standard.",
              image: "/card-water-purity.webp",
              href: "#services",
              dotColor: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
              chips: ["Multi-Stage Filtration", "SLS 614 Certified"],
              cta: "Verify Standards"
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative rounded-2xl sm:rounded-3xl p-[1.5px] bg-gradient-to-b from-sky-400/60 via-sky-500/25 to-blue-600/40 shadow-[0_18px_45px_rgba(2,18,44,0.4)] hover:shadow-[0_22px_55px_rgba(0,102,255,0.3)] transition-all duration-300 group flex flex-col"
            >
              <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-br from-[#0c2e5e] via-[#071f42] to-[#031127] backdrop-blur-2xl flex flex-col h-full border border-white/10">
                
                <Link href={card.href} className="flex flex-col h-full relative z-10">
                  {/* Upper Image Section */}
                  <div className="h-44 sm:h-52 lg:h-56 w-full overflow-hidden relative bg-[#04142b]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071f42] via-[#071f42]/30 to-transparent opacity-90" />
                    
                    {/* Floating Glass Pill */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                      <span className="px-3 py-1 rounded-full bg-[#031127]/85 backdrop-blur-md border border-sky-400/50 text-sky-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider shadow-md flex items-center gap-1.5 uppercase">
                        <span className={`w-1.5 h-1.5 rounded-full ${card.dotColor} animate-pulse`} />
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 text-white flex-1 flex flex-col justify-between space-y-3.5">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-1.5 group-hover:text-[#00c0f7] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal">
                        {card.desc}
                      </p>

                      {/* Micro Feature Chips */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {card.chips.map((chip, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#041833]/80 border border-sky-400/30 text-sky-200 font-mono text-[10px] font-semibold"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Divider & Action Link */}
                    <div className="pt-3.5 border-t border-sky-400/20 flex items-center justify-between text-xs font-bold text-sky-300 group-hover:text-white transition-colors">
                      <span className="font-mono uppercase tracking-wider text-[11px]">{card.cta}</span>
                      <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 group-hover:bg-[#0066ff] group-hover:border-sky-300 group-hover:text-white text-sky-200 flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(14,165,233,0.3)]">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR SERVICES SECTION */}
      {/* ========================================================================= */}
      <section id="services" className="pt-4 sm:pt-6 pb-16 sm:pb-24 bg-white relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.85, ease: smoothEase }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#081B38] font-mono text-xs uppercase tracking-widest font-bold">
                  OUR SERVICES
                </span>
                <span className="w-8 h-[2px] bg-[#081B38]" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#081B38] tracking-tight font-serif">
                Water Services at Your Fingertips
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.85, delay: 0.1, ease: smoothEase }}
            >
              <Link
                href="/pay"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-all duration-300 hover:scale-105 active:scale-95 w-fit"
              >
                <span>View All Services</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Services Mosaic Showcase */}
          <div>
            <WaterServicesShowcase />
          </div>

          {/* Auto-Playing Video Showcase */}
          <div className="pt-2">
            <VideoShowcase />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INFRASTRUCTURE & FACILITY SLIDESHOW */}
      {/* ========================================================================= */}
      <ImageSlideshow />

      {/* ========================================================================= */}
      {/* 5. EMERGENCY LEAK & PIPE DAMAGE HOTLINE */}
      {/* ========================================================================= */}
      <section id="leaks" className="py-12 sm:py-16 bg-white relative z-10 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-50/50 border border-amber-300/80 p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 shadow-sm"
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-800">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-amber-950 tracking-tight">
                  Report a Road Water Leak or Pipe Damage
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/80 max-w-xl leading-relaxed">
                  Notice an unusual distribution burst or supply interruption? Alert our maintenance crew immediately for rapid mobilization across the Magammana sector.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
              <a
                href="tel:0112894567"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-center"
              >
                <Phone size={14} />
                <span>Hotline: 011 289 4567</span>
              </a>

              <a
                href="mailto:support@vikashacbo.com"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-300 text-center"
              >
                <Mail size={14} />
                <span>support@vikashacbo.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INSTITUTIONAL GOVERNANCE & COMMUNITY TRUST */}
      {/* ========================================================================= */}
      <section id="about" className="py-14 sm:py-24 bg-slate-50/70 relative z-10 border-b border-slate-200">
        <span id="governance" className="absolute -top-24" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="max-w-2xl space-y-2.5"
          >
            <span className="text-[#081B38] font-mono text-xs uppercase tracking-widest font-semibold block">
              INSTITUTIONAL GOVERNANCE &bull; ප්‍රජා පාලනය සහ ව්‍යවස්ථාපිත අධීක්ෂණය
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#081B38] tracking-tight font-serif">
              Community Owned, Democratically Run
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Vikasha CBO operates under the constitutional oversight of the Magammana General Assembly and the Department of Community Water Supply (DCWS).
            </p>
          </motion.div>

          {/* 3 Governance Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                category: "Democracy & Oversight",
                title: "COMMUNITY GOVERNED",
                desc: "Managed democratically by elected resident committee members to maintain uninterrupted water pressure, transparent budgeting, and rapid maintenance.",
                image: "/gov-community-assembly.webp",
                actionText: "General Assembly",
                icon: Building2
              },
              {
                category: "SLS 614 Standard",
                title: "CERTIFIED WATER PURITY",
                desc: "Deep-well extraction, high-capacity sand filtration, and automated chlorination compliant with National Drinking Water Standards (SLS 614).",
                image: "/gov-water-purification.webp",
                actionText: "Laboratory Certified",
                icon: Droplets
              },
              {
                category: "Public Transparency",
                title: "100% DIGITAL RECONCILIATION",
                desc: "Every meter reading, billing calculation, and payment is logged in real-time, preventing billing discrepancies or unverified receipts.",
                image: "/gov-digital-reconciliation.webp",
                actionText: "DCWS Audited",
                icon: FileCheck2
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: smoothEase }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(8,27,56,0.08)] bg-white border border-slate-200/90 flex flex-col group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,27,56,0.15)] hover:border-slate-300"
              >
                <div className="flex flex-col h-full">
                  {/* Image */}
                  <div className="h-44 sm:h-56 lg:h-64 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-xs uppercase">
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="bg-white p-5 sm:p-6 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#081B38] tracking-tight font-serif mb-2 group-hover:text-[#004EEB] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-[#004EEB] transition-colors">
                      <span className="font-mono uppercase tracking-wider text-[11px]">{card.actionText}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#081B38] group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <card.icon size={15} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SOVEREIGN INSTITUTIONAL FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#020e1e] text-white pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-slate-800 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: smoothEase }}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4 sm:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 p-1 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                  <img
                    src="/logo.webp"
                    alt="Vikasha CBO Official Logo"
                    width={40}
                    height={40}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Vikasha CBO</h4>
                  <p className="text-xs text-cyan-200/80">විකාශා ප්‍රජා මූල සංවිධානය &bull; මාගම්මන</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                National Water Supply &amp; Drainage Board / Department of Community Water Supply (DCWS) registered scheme ensuring uninterrupted safe drinking water for Magammana, Homagama.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">Quick Access</h5>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li><Link href="/pay" className="hover:text-cyan-300 transition-colors duration-200">Online Bill Payment</Link></li>
                <li><Link href="/meter-reader" className="hover:text-cyan-300 transition-colors duration-200">Field Meter Reader App</Link></li>
                <li><Link href="/admin/dashboard" className="hover:text-cyan-300 transition-colors duration-200">Administrative Dashboard</Link></li>
                <li><Link href="/login" className="hover:text-cyan-300 transition-colors duration-200">Staff Portal Login</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">Contact &amp; Emergency</h5>
              <div className="space-y-2 text-xs text-slate-300 font-medium">
                <p className="flex items-center gap-2"><MapPin size={13} className="text-cyan-400 shrink-0" /> Magammana, Homagama, Sri Lanka</p>
                <p className="flex items-center gap-2"><Mail size={13} className="text-cyan-400 shrink-0" /> support@vikashacbo.com</p>
                <p className="flex items-center gap-2"><Phone size={13} className="text-emerald-400 shrink-0" /> Hotline: 011 289 4567</p>
                <p className="flex items-center gap-2"><Clock size={13} className="text-amber-400 shrink-0" /> Mon - Sat: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Water Project). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-slate-300">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms &amp; Conditions</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors duration-200">Refund Policy</Link>
              <Link href="/delivery-policy" className="hover:text-white transition-colors duration-200">Delivery Policy</Link>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                <Shield size={13} /> DCWS / NWSDB Regulated
              </span>
            </div>
          </div>

        </motion.div>
      </footer>

      {/* ========================================================================= */}
      {/* 8. INTERACTIVE MODAL: "HOW TO PAY?" STEP-BY-STEP GUIDE */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showHowToPay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHowToPay(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                type="button"
                onClick={() => setShowHowToPay(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-3 mb-5 pr-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                  <Play size={20} className="ml-0.5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">How to Pay Your Bill Online</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">Quick 4-step digital payment guide</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                {[
                  {
                    step: "1",
                    title: "Enter Your Account Number",
                    desc: "Type your consumer account ID (e.g. 135) in the search field and click 'View & Pay Bill'."
                  },
                  {
                    step: "2",
                    title: "Verify Bill Amount & Units",
                    desc: "Check your consumption details, current meter reading, and total outstanding due balance."
                  },
                  {
                    step: "3",
                    title: "Select Instant Gateway",
                    desc: "Pay securely with Visa, Mastercard, LankaQR mobile scan, or direct CEFT transfer."
                  },
                  {
                    step: "4",
                    title: "Instant Digital Receipt",
                    desc: "Download your official stamped PDF receipt instantly and receive an SMS notification."
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#081B38] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowHowToPay(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#081B38] hover:bg-[#06152d] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 9. INTERACTIVE MODAL: "WHERE IS MY ACCOUNT NUMBER?" HELPER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAccountHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAccountHelp(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                type="button"
                onClick={() => setShowAccountHelp(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-3 mb-5 pr-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Locating Your Account Number</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">Printed on your monthly paper bill or SMS alert</p>
                </div>
              </div>

              {/* Visual Simulated Bill Snippet */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-dashed border-sky-400/70 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">VIKASHA CBO &bull; WATER BILL</span>
                  <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold border border-sky-300 text-[10px]">
                    MONTHLY STATEMENT
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Consumer Name:</span>
                    <span className="font-semibold text-slate-700">W. M. Perera</span>
                  </div>
                  <div className="bg-sky-50 p-2 rounded-xl border border-sky-400">
                    <span className="text-sky-800 block font-bold text-[9px] uppercase">
                      Account No &larr;
                    </span>
                    <span className="font-extrabold text-sky-900 text-xs sm:text-sm">135</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                Your Account Number is 3 or 4 digits long. If you do not have your physical paper bill, contact our Magammana community helpdesk at <a href="tel:0112894567" className="text-[#0284c7] font-bold underline">011 289 4567</a> with your NIC number.
              </p>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAccountHelp(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#081B38] hover:bg-[#06152d] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
