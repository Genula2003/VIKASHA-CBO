"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ImageSlideshow from "@/components/ImageSlideshow";
import PageLoader from "@/components/PageLoader";
import VideoShowcase from "@/components/VideoShowcase";
import WaterServicesShowcase from "@/components/WaterServicesShowcase";
import {
  CreditCard,
  Search,
  Receipt,
  ReceiptText,
  User,
  ArrowRight,
  ShieldCheck,
  Clock,
  Leaf,
  Droplet,
  Droplets,
  BarChart3,
  Wrench,
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
  Sparkles,
  CheckCircle2,
  Activity,
  Zap,
  Lock,
  Scale,
  Users,
  Award,
  FileText,
  ChevronRight,
  ExternalLink,
  Check
} from "lucide-react";

// Silky smooth momentum cubic-bezier easing curve
const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const router = useRouter();
  const [quickAccount, setQuickAccount] = useState("");
  const [activeHeroTab, setActiveHeroTab] = useState<"quick" | "enquiry" | "receipt">("quick");
  const [isSearching, setIsSearching] = useState(false);
  const [showHowToPay, setShowHowToPay] = useState(false);
  const [showAccountHelp, setShowAccountHelp] = useState(false);

  // Dynamic rotating words for hero section word animation
  const rotatingWords = [
    { text: "Excellence.", tag: "SLS 614 Quality Audit", color: "from-white via-cyan-100 to-sky-200" },
    { text: "Purity.", tag: "Continuous Multi-Stage Sand Filtration", color: "from-cyan-100 via-sky-200 to-blue-200" },
    { text: "Reliability.", tag: "24/7 Gravity-Fed Flow Line", color: "from-emerald-100 via-teal-200 to-cyan-200" },
    { text: "Integrity.", tag: "100% Audited Public Ledger", color: "from-slate-100 via-zinc-200 to-white" },
    { text: "Community.", tag: "Democratically Governed CBO", color: "from-amber-100 via-sky-100 to-white" }
  ];
  const [wordIndex, setWordIndex] = useState(0);


  // Rotate hero words every 3 seconds smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

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
      {/* 1. HERO SECTION (NATURE WATER LAKE & METER ACCOUNT SEARCH) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-visible bg-[#081B38] text-white">

        {/* Top Navbar */}
        <Navbar />

        {/* Full-Width Nature Water Background Container with Reduced Darkness */}
        <div className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[760px] w-full flex items-center pt-28 sm:pt-36 pb-36 sm:pb-44 lg:pb-52 overflow-hidden">

          {/* Background Nature Water Lake Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-nature-water.webp"
              alt="Magammana Nature Water Reservoir"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {/* Reduced-Darkness & Reduced-Blue Scrims: Clean Navy Scrim on the left for contrast, pure natural lake & greenery glowing through */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#081B38]/80 via-[#081B38]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081B38]/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_70%)]" />
          </div>

          {/* Left Content Area (Matching Template with Meter Account Input) */}
          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: smoothEase }}
              className="max-w-2xl space-y-6"
            >
              {/* Eyebrow with Silver Line */}
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1.5px] bg-slate-300" />
                <span className="text-xs uppercase tracking-[0.22em] text-slate-200 font-semibold font-mono">
                  COMMUNITY BASED ORGANIZATION &bull; WATER UTILITY
                </span>
              </div>

              {/* Master Headline in Elegant Serif with Staggered & Rotating Word Animations */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[58px] text-white leading-[1.18] sm:leading-[1.14] tracking-tight font-normal select-none">
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, delay: 0.12, ease: smoothEase }}
                  className="block"
                >
                  A Legacy of Trust
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, delay: 0.24, ease: smoothEase }}
                  className="block"
                >
                  Built on Sophisticated
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, delay: 0.36, ease: smoothEase }}
                  className="inline-flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3"
                >
                  <span>Water</span>
                  <span className="inline-block relative overflow-hidden align-baseline h-[1.18em] min-w-[170px] sm:min-w-[280px] lg:min-w-[340px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={wordIndex}
                        initial={{ y: "100%", opacity: 0, filter: "blur(8px)", rotateX: -30 }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)", rotateX: 0 }}
                        exit={{ y: "-100%", opacity: 0, filter: "blur(8px)", rotateX: 30 }}
                        transition={{ duration: 0.55, ease: smoothEase }}
                        className={`inline-block font-serif italic font-normal bg-gradient-to-r ${rotatingWords[wordIndex].color} bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(255,255,255,0.25)]`}
                      >
                        {rotatingWords[wordIndex].text}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.span>
              </h1>

              {/* Live Animated Verified Standards Micro-Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: smoothEase }}
                className="flex items-center gap-2 max-w-full"
              >
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-mono text-slate-200 shadow-sm max-w-full">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                  </span>
                  <span className="text-slate-400 uppercase tracking-wider text-[9px] sm:text-[10px] font-semibold shrink-0">STANDARDS PILLAR:</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.25 }}
                      className="text-white font-semibold truncate"
                    >
                      {rotatingWords[wordIndex].tag}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* =================================================================== */}
              {/* METER ACCOUNT NUMBER ENTERING PART (ULTRA-PREMIUM FROSTED GLASS WIDGET) */}
              {/* =================================================================== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
                className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-white/60 via-white/20 to-white/5 shadow-[0_25px_60px_rgba(4,18,40,0.6),0_0_40px_rgba(6,182,212,0.12)] max-w-xl overflow-hidden group/glass w-full"
              >
                {/* Specular Top Prismatic Highlight Sheen */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent pointer-events-none z-20" />

                <div className="relative rounded-[21px] sm:rounded-[23px] backdrop-blur-2xl bg-[#081B38]/65 border border-white/20 p-4 sm:p-6 text-white overflow-hidden">

                  {/* Ambient Light Blooms inside Glass */}
                  <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

                  {/* Widget Header with Cyan Beacon & Live Pill */}
                  <div className="relative z-10 flex items-center justify-between mb-3.5 text-xs">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                      </span>
                      <span className="font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] font-extrabold text-white text-[11px] sm:text-xs">
                        ENTER METER ACCOUNT NUMBER
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-200 font-mono text-[11px] font-semibold shadow-xs hidden sm:inline-flex">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Instant 24/7 E-Bill</span>
                    </div>
                  </div>

                  {/* Account Input & Search Button in Frosted Glass */}
                  <form onSubmit={handleQuickSearch} className="relative z-10 space-y-3 sm:space-y-3.5">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      {/* Frosted Glass Input Field */}
                      <div className="relative flex-1 group/input">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300 shadow-sm pointer-events-none transition-transform group-focus-within/input:scale-110">
                          <User size={15} />
                        </div>
                        <input
                          type="text"
                          value={quickAccount}
                          onChange={(e) => setQuickAccount(e.target.value)}
                          placeholder="e.g. 135 (or Consumer Account #)"
                          className="w-full h-12 sm:h-13 pl-12 sm:pl-13 pr-4 rounded-xl bg-white/[0.12] hover:bg-white/[0.16] focus:bg-[#081B38]/90 backdrop-blur-xl text-white placeholder:text-slate-300 font-mono text-xs sm:text-sm font-bold border border-white/25 focus:border-cyan-400/90 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)] focus:shadow-[0_0_25px_rgba(34,211,238,0.35),inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300"
                        />
                      </div>

                      {/* Electric Blue Frosted Glass Action Button */}
                      <button
                        type="submit"
                        disabled={isSearching}
                        className="h-12 sm:h-13 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-[#0057E7] via-[#0066FF] to-[#0080FF] hover:from-[#004EEB] hover:to-[#0070e0] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-2.5 shadow-[0_8px_24px_rgba(0,87,231,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_32px_rgba(0,87,231,0.65)] hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 border border-white/30 backdrop-blur-md transition-all duration-300 group/btn w-full sm:w-auto"
                      >
                        {isSearching ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-white" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard size={15} className="text-white drop-shadow-sm" />
                            <span className="tracking-wide">View &amp; Pay Bill</span>
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover/btn:translate-x-0.5 transition-transform">
                              <ArrowRight size={12} strokeWidth={3} />
                            </div>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quick Sample Clickable Accounts with Glass Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 text-xs text-slate-300">
                      <span className="text-[11px] text-slate-300/90 font-mono">Quick test:</span>
                      {["135", "102", "189"].map((acc) => {
                        const isSelected = quickAccount === acc;
                        return (
                          <button
                            key={acc}
                            type="button"
                            onClick={() => setQuickAccount(acc)}
                            className={`px-2.5 sm:px-3 py-1 rounded-lg font-mono text-[11px] font-bold border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
                              isSelected
                                ? "bg-cyan-500/35 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                                : "bg-white/[0.08] hover:bg-white/[0.18] text-white/90 border-white/20 hover:border-cyan-400/50 hover:text-white"
                            }`}
                          >
                            #{acc}
                          </button>
                        );
                      })}
                    </div>

                    {/* Modal Helpers with Glass Badges */}
                    <div className="pt-3 sm:pt-3.5 border-t border-white/15 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 text-xs text-slate-300">
                      <button
                        type="button"
                        onClick={() => setShowAccountHelp(true)}
                        className="flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-pointer group/help text-left"
                      >
                        <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-300 group-hover/help:text-cyan-300 group-hover/help:border-cyan-400/50 transition-colors shrink-0">
                          <HelpCircle size={12} />
                        </div>
                        <span className="text-[11px] sm:text-xs text-slate-300 group-hover/help:text-white transition-colors">
                          Need help finding your account number?
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHowToPay(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-[11px] sm:text-xs transition-all duration-200 hover:border-white/40 cursor-pointer shadow-xs shrink-0"
                      >
                        <span>How to Pay?</span>
                        <Play size={10} className="fill-white text-white" />
                      </button>
                    </div>
                  </form>

                </div>
              </motion.div>

              {/* Two Action Buttons (Navy Dark Blue & Frosted White/Silver) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
                <Link
                  href="/pay"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#081B38] hover:bg-[#0c2b59] text-white text-xs sm:text-sm font-bold border border-slate-300/40 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-center"
                >
                  <span>Pay Water Bill</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="#services"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/70 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                >
                  Discover Services
                </Link>
              </div>
            </motion.div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3 OVERLAPPING CARDS (WHITE IS MAIN, NAVY DARK BLUE & SILVER THEME) */}
      {/* ========================================================================= */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-28 lg:-mt-40 mb-10 sm:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {[
            {
              category: "Smart Telemetry",
              title: "SMART METERING",
              desc: "High-precision optical telemetry logging and automated consumption tracking.",
              image: "/card-smart-meter.webp",
              href: "/pay"
            },
            {
              category: "Digital E-Billing",
              title: "ONLINE BILL PAY",
              desc: "Instant zero-surcharge settlement via LankaQR, Visa, Mastercard, and CEFT.",
              image: "/card-ebill-pay.webp",
              href: "/pay"
            },
            {
              category: "Water Quality",
              title: "WATER PURITY",
              desc: "Continuous deep-well filtration and automated chlorination compliant with SLS 614.",
              image: "/card-water-purity.webp",
              href: "#services"
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: 0.15 + i * 0.12, ease: smoothEase }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(8,27,56,0.12)] bg-white border border-slate-200/90 flex flex-col group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(8,27,56,0.18)] hover:border-slate-300"
            >
              <Link href={card.href} className="flex flex-col h-full">
                {/* Upper Image Section (~60%) */}
                <div className="h-48 sm:h-64 lg:h-72 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                  {/* Floating Silver & Navy Tag on Image */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-sm uppercase">
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Lower White Panel (White is main, Navy Dark Blue title, Silver details) */}
                <div className="bg-white p-5 sm:p-7 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-[#081B38] tracking-tight font-serif mb-2 sm:mb-2.5 group-hover:text-[#004EEB] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  {/* Silver Divider & Navy Dark Blue Interactive Link */}
                  <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-[#004EEB] transition-colors">
                    <span className="font-mono uppercase tracking-wider text-[11px]">Explore Service</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#081B38] group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "OUR SERVICES — Water Services at Your Fingertips" (MATCHING SCREENSHOT) */}
      {/* ========================================================================= */}
      <section id="services" className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-white relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

          {/* Header Strip with Eyebrow and "View All Services ->" Pill Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: smoothEase }}
              className="space-y-1.5"
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
              initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
            >
              <Link
                href="/pay"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 w-fit"
              >
                <span>View All Services</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* ===================================================================== */}
          {/* 6-CARD SERVICES MOSAIC GRID (GLASS CARDS) */}
          {/* ===================================================================== */}
          <div className="pt-2">
            <WaterServicesShowcase />
          </div>

          {/* Cinematic Water Services Video Showcase */}
          <div className="pt-4 pb-2">
            <VideoShowcase />
          </div>

          {/* 4 Bespoke Consumer Utility Action Cards (Human-Crafted, Non-Generic Architecture) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">

            {/* Card 1: Pay Water Bill */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, delay: 0.08, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_12px_32px_rgba(8,27,56,0.06)] hover:shadow-[0_22px_50px_rgba(0,78,235,0.14)] hover:border-[#0057E7]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle ambient light glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-blue-400/10 blur-2xl pointer-events-none group-hover:bg-blue-400/20 transition-all duration-500" />

              <Link href="/pay" className="flex flex-col justify-between h-full">
                <div>
                  {/* Top Bar: Eyebrow Tag & Layered Gradient Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-50 text-[#0057E7] border border-blue-200/60 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0057E7] animate-pulse" />
                      Instant Pay
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-[#0057E7] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(0,87,231,0.32)] group-hover:scale-110 transition-transform duration-300">
                      <ReceiptText size={20} />
                    </div>
                  </div>

                  {/* Title & Authentic Copy */}
                  <h3 className="text-lg font-bold text-[#081B38] tracking-tight group-hover:text-[#0057E7] transition-colors">
                    Pay Water Bill
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                    Settle monthly tariffs securely via LankaQR, Visa, Mastercard, or direct CEFT with zero surcharges.
                  </p>

                  {/* Trust & Guarantee Micro-Chips */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <Lock size={10} className="text-emerald-600" /> 256-Bit SSL
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <CheckCircle2 size={10} className="text-blue-600" /> Instant PDF Receipt
                    </span>
                  </div>
                </div>

                {/* Bottom Interactive Trigger */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-[#0057E7] transition-colors">
                  <span className="font-mono uppercase tracking-wider text-[11px]">Pay Bill Now</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#0057E7] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 2: View Bill History */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, delay: 0.16, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_12px_32px_rgba(8,27,56,0.06)] hover:shadow-[0_22px_50px_rgba(6,182,212,0.14)] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle ambient light glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none group-hover:bg-cyan-400/20 transition-all duration-500" />

              <Link href="/pay" className="flex flex-col justify-between h-full">
                <div>
                  {/* Top Bar: Eyebrow Tag & Layered Gradient Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-50 text-cyan-700 border border-cyan-200/60 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      E-Statements
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white flex items-center justify-center shadow-[0_6px_16px_rgba(6,182,212,0.32)] group-hover:scale-110 transition-transform duration-300">
                      <Search size={20} />
                    </div>
                  </div>

                  {/* Title & Authentic Copy */}
                  <h3 className="text-lg font-bold text-[#081B38] tracking-tight group-hover:text-cyan-700 transition-colors">
                    Bill &amp; Audit History
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                    Inspect past optical meter readings, track arrears reconciliations, and retrieve certified public ledgers.
                  </p>

                  {/* Micro-Features */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <FileText size={10} className="text-cyan-600" /> 12-Month Archive
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <CheckCircle2 size={10} className="text-emerald-600" /> Optical Photo Proof
                    </span>
                  </div>
                </div>

                {/* Bottom Interactive Trigger */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-cyan-700 transition-colors">
                  <span className="font-mono uppercase tracking-wider text-[11px]">Search Records</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-cyan-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 3: Usage Details & Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, delay: 0.24, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_12px_32px_rgba(8,27,56,0.06)] hover:shadow-[0_22px_50px_rgba(99,102,241,0.14)] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle ambient light glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none group-hover:bg-indigo-400/20 transition-all duration-500" />

              <Link href="/pay" className="flex flex-col justify-between h-full">
                <div>
                  {/* Top Bar: Eyebrow Tag & Layered Gradient Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      Telemetry Hub
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white flex items-center justify-center shadow-[0_6px_16px_rgba(99,102,241,0.32)] group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 size={20} />
                    </div>
                  </div>

                  {/* Title & Authentic Copy */}
                  <h3 className="text-lg font-bold text-[#081B38] tracking-tight group-hover:text-indigo-700 transition-colors">
                    Usage &amp; Consumption
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                    Track household cubic meter flow patterns, compare billing periods, and receive automated leak warning alerts.
                  </p>

                  {/* Micro Sparkline & Tariff Chips */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-end gap-1 h-5 px-1">
                      {[30, 55, 40, 80, 60, 95].map((val, idx) => (
                        <div
                          key={idx}
                          style={{ height: `${val}%` }}
                          className="w-1.5 bg-indigo-400 rounded-t-xs opacity-75 group-hover:opacity-100 transition-opacity"
                        />
                      ))}
                    </div>
                    <span className="font-mono text-slate-600 font-semibold text-[10px] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      14.2 m³ / Mo Avg
                    </span>
                  </div>
                </div>

                {/* Bottom Interactive Trigger */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-indigo-700 transition-colors">
                  <span className="font-mono uppercase tracking-wider text-[11px]">Track Usage</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 4: Service Requests & Citizen Helpdesk */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, delay: 0.32, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_12px_32px_rgba(8,27,56,0.06)] hover:shadow-[0_22px_50px_rgba(16,185,129,0.14)] hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle ambient light glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none group-hover:bg-emerald-400/20 transition-all duration-500" />

              <a href="#about" className="flex flex-col justify-between h-full">
                <div>
                  {/* Top Bar: Eyebrow Tag & Layered Gradient Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      24/7 Citizen Desk
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-[0_6px_16px_rgba(16,185,129,0.32)] group-hover:scale-110 transition-transform duration-300">
                      <Wrench size={20} />
                    </div>
                  </div>

                  {/* Title & Authentic Copy */}
                  <h3 className="text-lg font-bold text-[#081B38] tracking-tight group-hover:text-emerald-700 transition-colors">
                    Service Requests
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                    Apply for new water connections, request meter calibration, report pipe leaks, or dispatch rapid on-call technicians.
                  </p>

                  {/* SLA & Hotline Chips */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <Zap size={10} className="text-amber-500" /> Rapid Dispatch &lt; 45m
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      <Clock size={10} className="text-emerald-600" /> 24/7 Hotline
                    </span>
                  </div>
                </div>

                {/* Bottom Interactive Trigger */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-emerald-700 transition-colors">
                  <span className="font-mono uppercase tracking-wider text-[11px]">Submit Request</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. IMAGE SLIDESHOW SECTION (AUTO 5 SECONDS, CLEAN LIGHT THEME) */}
      {/* ========================================================================= */}
      <ImageSlideshow />

      {/* ========================================================================= */}
      {/* 4. EMERGENCY LEAK REPORTING CALLOUT (#leaks) */}
      {/* ========================================================================= */}
      <section id="leaks" className="py-12 sm:py-20 bg-white relative z-10 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: smoothEase }}
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
      {/* 5. ABOUT CBO / INSTITUTIONAL GOVERNANCE SECTION (#governance & #about) */}
      {/* ========================================================================= */}
      <section id="about" className="py-14 sm:py-24 bg-slate-50/70 relative z-10 border-b border-slate-200">
        {/* Invisible anchor for #governance navigation link */}
        <span id="governance" className="absolute -top-24" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
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

          {/* 3 Previous Section Cards Updated to Content Card Architecture */}
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
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.12, ease: smoothEase }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,27,56,0.12)] bg-white border border-slate-200/90 flex flex-col group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(8,27,56,0.18)] hover:border-slate-300"
              >
                <div className="flex flex-col h-full">
                  {/* Upper Image Section (~60%) */}
                  <div className="h-48 sm:h-64 lg:h-72 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                    {/* Floating Silver & Navy Tag on Image */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-sm uppercase">
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Lower White Panel (White is main, Navy Dark Blue title, Silver details) */}
                  <div className="bg-white p-5 sm:p-7 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#081B38] tracking-tight font-serif mb-2 sm:mb-2.5 group-hover:text-[#004EEB] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

                    {/* Silver Divider & Interactive Footer Badge */}
                    <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-[#004EEB] transition-colors">
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
      {/* 6. SOVEREIGN INSTITUTIONAL FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#020e1e] text-white pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-slate-800 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: smoothEase }}
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
      {/* 7. INTERACTIVE MODAL: "HOW TO PAY?" STEP-BY-STEP GUIDE */}
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
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                type="button"
                onClick={() => setShowHowToPay(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-3 mb-5 sm:mb-6 pr-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                  <Play size={20} className="ml-0.5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">How to Pay Your Bill Online</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">Quick 4-step digital payment guide</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#04244d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">Enter Your Account Number</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Type your 3 or 4-digit consumer account ID (e.g. 135) in the search field above and click &quot;View Bill&quot;.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#04244d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">Verify Bill Amount &amp; Units</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Check your consumption details, current meter reading, and total outstanding due balance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#04244d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">Select Instant Gateway</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Pay securely with Visa, Mastercard, LankaQR mobile scan, or direct bank payment transfer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">Instant Digital Receipt</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Download your official stamped PDF receipt instantly and receive an SMS notification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowHowToPay(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#04244d] hover:bg-[#021835] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 8. INTERACTIVE MODAL: "WHERE IS MY ACCOUNT NUMBER?" HELPER */}
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
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto my-auto"
            >
              <button
                type="button"
                onClick={() => setShowAccountHelp(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-3 mb-5 sm:mb-6 pr-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Locating Your Account Number</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">Printed on your monthly paper bill or SMS alert</p>
                </div>
              </div>

              {/* Visual Simulated Bill Snippet */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-dashed border-cyan-400/70 space-y-2.5 sm:space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs">VIKASHA CBO &bull; WATER BILL</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-300 text-[10px]">
                    MONTHLY STATEMENT
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Consumer Name:</span>
                    <span className="font-semibold text-slate-700">W. M. Perera</span>
                  </div>
                  <div className="bg-cyan-50 p-1.5 sm:p-2 rounded-xl border border-cyan-400 animate-pulse">
                    <span className="text-cyan-800 block font-bold text-[9px] uppercase">
                      Account No &larr;
                    </span>
                    <span className="font-extrabold text-cyan-900 text-xs sm:text-sm">135</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                Your Account Number is 3 or 4 digits long. If you do not have your physical paper bill, contact our Magammana community helpdesk at <a href="tel:0112894567" className="text-[#0284c7] font-bold underline">011 289 4567</a> with your NIC number.
              </p>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAccountHelp(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#04244d] hover:bg-[#021835] text-white text-xs font-bold transition-all cursor-pointer"
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
