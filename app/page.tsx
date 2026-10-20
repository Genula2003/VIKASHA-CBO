"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ImageSlideshow from "@/components/ImageSlideshow";
import PageLoader from "@/components/PageLoader";
import VideoShowcase from "@/components/VideoShowcase";
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
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-white leading-[1.14] tracking-tight font-normal select-none">
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
                  className="inline-flex flex-wrap items-baseline gap-x-3"
                >
                  <span>Water</span>
                  <span className="inline-block relative overflow-hidden align-baseline h-[1.18em] min-w-[210px] sm:min-w-[280px] lg:min-w-[340px]">
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
                className="flex items-center gap-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-mono text-slate-200 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                  </span>
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">STANDARDS PILLAR:</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.25 }}
                      className="text-white font-semibold"
                    >
                      {rotatingWords[wordIndex].tag}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* =================================================================== */}
              {/* METER ACCOUNT NUMBER ENTERING PART (FROSTED GLASS WIDGET) */}
              {/* =================================================================== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
                className="rounded-2xl p-[1px] bg-gradient-to-b from-white/40 via-white/15 to-transparent shadow-2xl max-w-xl"
              >
                <div className="backdrop-blur-xl bg-[#081B38]/75 border border-white/20 rounded-2xl p-4 sm:p-5 text-white">

                  {/* Widget Header with Silver/White Accents */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-200 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      ENTER METER ACCOUNT NUMBER
                    </span>
                    <span className="text-slate-300 font-mono text-[11px] hidden sm:inline">
                      Instant 24/7 E-Bill Search
                    </span>
                  </div>

                  {/* Account Input & Search Button (White Main, Navy Dark Blue & Silver) */}
                  <form onSubmit={handleQuickSearch} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="relative flex-1">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#081B38]">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          value={quickAccount}
                          onChange={(e) => setQuickAccount(e.target.value)}
                          placeholder="e.g. 135 (or Consumer Account #)"
                          className="w-full h-12 pl-13 pr-4 rounded-xl bg-white text-[#081B38] placeholder:text-slate-400 font-mono text-sm font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#081B38] border border-slate-200"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSearching}
                        className="h-12 px-6 rounded-xl bg-white hover:bg-slate-100 text-[#081B38] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 border border-slate-200"
                      >
                        {isSearching ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-[#081B38]" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard size={16} className="text-[#081B38]" />
                            <span>View &amp; Pay Bill</span>
                            <ArrowRight size={15} />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quick Sample Clickable Accounts */}
                    <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-300">
                      <span className="text-[11px] text-slate-400 font-mono">Quick test:</span>
                      {["135", "102", "189"].map((acc) => (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => setQuickAccount(acc)}
                          className="px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white hover:text-[#081B38] text-white font-mono text-[11px] font-semibold border border-white/20 transition-all cursor-pointer"
                        >
                          #{acc}
                        </button>
                      ))}
                    </div>

                    {/* Modal Helpers with Silver Icons */}
                    <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                      <button
                        type="button"
                        onClick={() => setShowAccountHelp(true)}
                        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                      >
                        <HelpCircle size={14} className="text-slate-300" />
                        <span>Need help finding your account number?</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHowToPay(true)}
                        className="flex items-center gap-1.5 hover:text-white transition-colors font-medium cursor-pointer"
                      >
                        <span>How to Pay?</span>
                        <Play size={12} className="text-slate-300" />
                      </button>
                    </div>
                  </form>

                </div>
              </motion.div>

              {/* Two Action Buttons (Navy Dark Blue & Frosted White/Silver) */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  href="/pay"
                  className="px-8 py-3.5 rounded-xl bg-[#081B38] hover:bg-[#0c2b59] text-white text-xs sm:text-sm font-bold border border-slate-300/40 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Pay Water Bill</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="#services"
                  className="px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/70 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
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
      <section className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-32 lg:-mt-40 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                <div className="h-56 sm:h-64 lg:h-72 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                  {/* Floating Silver & Navy Tag on Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-sm uppercase">
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Lower White Panel (White is main, Navy Dark Blue title, Silver details) */}
                <div className="bg-white p-6 sm:p-7 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#081B38] tracking-tight font-serif mb-2.5 group-hover:text-[#004EEB] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  {/* Silver Divider & Navy Dark Blue Interactive Link */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-[#004EEB] transition-colors">
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
      <section id="services" className="pt-8 pb-20 bg-white relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Header Strip with Eyebrow and "View All Services ->" Pill Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081B38] tracking-tight font-serif">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>View All Services</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Cinematic Water Services Video Showcase */}
          <div className="pt-2 pb-2">
            <VideoShowcase />
          </div>

          {/* ===================================================================== */}
          {/* 6-CARD SERVICES MOSAIC GRID (MATCHING USER TEMPLATE) */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">

            {/* Row 1, Card 1: Water Supply Image */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.05, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-3xl overflow-hidden shadow-lg h-[320px] border border-slate-200"
            >
              <img
                src="/service-water-supply.webp"
                alt="Potable Water Distribution Network"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B38]/90 via-[#081B38]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-bold block mb-1">
                  INFRASTRUCTURE
                </span>
                <h4 className="text-lg font-bold text-white">Municipal Ring-Main Distribution</h4>
              </div>
            </motion.div>

            {/* Row 1, Card 2: Navy Text Card 01 */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-3xl bg-gradient-to-br from-[#081B38] via-[#0B2548] to-[#0A1E3C] p-7 text-white shadow-xl flex flex-col justify-between border border-white/10 group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold block">
                  SERVICE 01 &bull; POTABLE DISTRIBUTION
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Potable Water Distribution Grids
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineering continuous 24/7 municipal water supply to 12,500+ households with automated pressure balancing, zoned telemetry, and rapid leak dispatch.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/pay"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Row 1, Card 3: Smart Meter Image */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.25, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-3xl overflow-hidden shadow-lg h-[320px] border border-slate-200"
            >
              <img
                src="/service-meter-reading.webp"
                alt="Optical Smart Meter Reading"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B38]/90 via-[#081B38]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-bold block mb-1">
                  DIGITAL METERS
                </span>
                <h4 className="text-lg font-bold text-white">Precision Field Telemetry</h4>
              </div>
            </motion.div>

            {/* Row 2, Card 4: Navy Text Card 02 */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.1, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-3xl bg-gradient-to-br from-[#081B38] via-[#0B2548] to-[#0A1E3C] p-7 text-white shadow-xl flex flex-col justify-between border border-white/10 group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold block">
                  SERVICE 02 &bull; SMART AUDITING
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Digital Metering &amp; Arrears Audit
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Transparent optical &amp; mobile meter logging with instant consumption auditing, automated arrears reconciliation, and verified digital receipts.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/pay"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Row 2, Card 5: Water Quality Lab Image */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.2, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-3xl overflow-hidden shadow-lg h-[320px] border border-slate-200"
            >
              <img
                src="/service-water-quality.webp"
                alt="Water Quality Purification Lab"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B38]/90 via-[#081B38]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-bold block mb-1">
                  SLS 614 CERTIFIED
                </span>
                <h4 className="text-lg font-bold text-white">Purification &amp; Testing Facility</h4>
              </div>
            </motion.div>

            {/* Row 2, Card 6: Navy Text Card 03 */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.3, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-3xl bg-gradient-to-br from-[#081B38] via-[#0B2548] to-[#0A1E3C] p-7 text-white shadow-xl flex flex-col justify-between border border-white/10 group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold block">
                  SERVICE 03 &bull; WATER PURITY
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Purity &amp; SLS 614 Certification
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rigorous multi-stage sand filtration, deep aquifer extraction, and continuous chlorination compliant with National Drinking Water Standards.
                </p>
              </div>
              <div className="pt-6">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* 4 Interactive Clean White Bento Cards with Staggered Scroll Entrance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">

            {/* Card 1: Pay Water Bill */}
            <motion.div
              initial={{ opacity: 0, y: 38, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.08, ease: smoothEase }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
              className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 shadow-sm hover:border-[#0284c7] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-blue-100/90 border border-blue-200 flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform duration-300">
                  <ReceiptText size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0c1f38] tracking-tight">Pay Water Bill</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Pay your current or past bills securely online.
                  </p>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Link
                  href="/pay"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 group-hover:bg-[#0284c7] group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: View Bill History */}
            <motion.div
              initial={{ opacity: 0, y: 38, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.18, ease: smoothEase }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
              className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 shadow-sm hover:border-[#0284c7] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-cyan-100/90 border border-cyan-200 flex items-center justify-center text-cyan-700 group-hover:scale-110 transition-transform duration-300">
                  <Search size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0c1f38] tracking-tight">View Bill History</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Check and download your previous bills.
                  </p>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Link
                  href="/pay"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 group-hover:bg-[#0284c7] group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Usage Details */}
            <motion.div
              initial={{ opacity: 0, y: 38, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.28, ease: smoothEase }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
              className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 shadow-sm hover:border-[#0284c7] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-blue-100/90 border border-blue-200 flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0c1f38] tracking-tight">Usage Details</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Track your water consumption and usage history.
                  </p>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Link
                  href="/pay"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 group-hover:bg-[#0284c7] group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Card 4: Service Requests */}
            <motion.div
              initial={{ opacity: 0, y: 38, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.38, ease: smoothEase }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
              className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 shadow-sm hover:border-[#0284c7] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-indigo-100/90 border border-indigo-200 flex items-center justify-center text-indigo-700 group-hover:scale-110 transition-transform duration-300">
                  <Wrench size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0c1f38] tracking-tight">Service Requests</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Request new connections, complaints and more.
                  </p>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <a
                  href="#leaks"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 group-hover:bg-[#0284c7] group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <ArrowRight size={16} />
                </a>
              </div>
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
      <section id="leaks" className="py-16 sm:py-20 bg-white relative z-10 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: smoothEase }}
            className="rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-50/50 border border-amber-300/80 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-800">
                <AlertTriangle size={26} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-amber-950 tracking-tight">
                  Report a Road Water Leak or Pipe Damage
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/80 max-w-xl leading-relaxed">
                  Notice an unusual distribution burst or supply interruption? Alert our maintenance crew immediately for rapid mobilization across the Magammana sector.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:0112894567"
                className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Phone size={14} />
                <span>Hotline: 011 289 4567</span>
              </a>

              <a
                href="mailto:support@vikashacbo.com"
                className="px-6 py-3 rounded-full bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-950 font-semibold text-xs flex items-center gap-2 shadow-sm transition-all duration-300"
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
      <section id="about" className="py-20 sm:py-28 bg-slate-50/70 relative z-10 border-b border-slate-200">
        {/* Invisible anchor for #governance navigation link */}
        <span id="governance" className="absolute -top-24" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081B38] tracking-tight font-serif">
              Community Owned, Democratically Run
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Vikasha CBO operates under the constitutional oversight of the Magammana General Assembly and the Department of Community Water Supply (DCWS).
            </p>
          </motion.div>

          {/* 3 Previous Section Cards Updated to Content Card Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                  <div className="h-56 sm:h-64 lg:h-72 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                    {/* Floating Silver & Navy Tag on Image */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-sm uppercase">
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Lower White Panel (White is main, Navy Dark Blue title, Silver details) */}
                  <div className="bg-white p-6 sm:p-7 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#081B38] tracking-tight font-serif mb-2.5 group-hover:text-[#004EEB] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

                    {/* Silver Divider & Interactive Footer Badge */}
                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38] group-hover:text-[#004EEB] transition-colors">
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
      <footer className="bg-[#020e1e] text-white pt-16 pb-12 border-t border-slate-800 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: smoothEase }}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 p-1 flex items-center justify-center overflow-hidden shadow-inner">
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
                National Water Supply & Drainage Board / Department of Community Water Supply (DCWS) registered scheme ensuring uninterrupted safe drinking water for Magammana, Homagama.
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
                <p className="flex items-center gap-2"><MapPin size={13} className="text-cyan-400" /> Magammana, Homagama, Sri Lanka</p>
                <p className="flex items-center gap-2"><Mail size={13} className="text-cyan-400" /> support@vikashacbo.com</p>
                <p className="flex items-center gap-2"><Phone size={13} className="text-emerald-400" /> Hotline: 011 289 4567</p>
                <p className="flex items-center gap-2"><Clock size={13} className="text-amber-400" /> Mon - Sat: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Water Project). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-5 text-slate-300">
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setShowHowToPay(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Play size={22} className="ml-0.5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">How to Pay Your Bill Online</h3>
                  <p className="text-xs text-slate-500">Quick 4-step digital payment guide</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#04244d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Enter Your Account Number</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Type your 3 or 4-digit consumer account ID (e.g. 135) in the search field above and click &quot;View Bill&quot;.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#04244d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Verify Bill Amount &amp; Units</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Check your consumption details, current meter reading, and total outstanding due balance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-[#04244d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Select Instant Gateway</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Pay securely with Visa, Mastercard, LankaQR mobile scan, or direct bank payment transfer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Instant Digital Receipt</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Download your official stamped PDF receipt instantly and receive an SMS notification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowHowToPay(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#04244d] hover:bg-[#021835] text-white text-xs font-bold transition-all"
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setShowAccountHelp(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <HelpCircle size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Locating Your Account Number</h3>
                  <p className="text-xs text-slate-500">Printed on your monthly paper bill or SMS alert</p>
                </div>
              </div>

              {/* Visual Simulated Bill Snippet */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-cyan-400/70 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800">VIKASHA CBO &bull; WATER BILL</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-300">
                    MONTHLY STATEMENT
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Consumer Name:</span>
                    <span className="font-semibold text-slate-700">W. M. Perera</span>
                  </div>
                  <div className="bg-cyan-50 p-2 rounded-xl border border-cyan-400 animate-pulse">
                    <span className="text-cyan-800 block font-bold text-[10px] uppercase">
                      Account No / ගිණුම් අංකය &larr;
                    </span>
                    <span className="font-extrabold text-cyan-900 text-sm">135</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                Your Account Number is 3 or 4 digits long. If you do not have your physical paper bill, contact our Magammana community helpdesk at <a href="tel:0112894567" className="text-[#0284c7] font-bold underline">011 289 4567</a> with your NIC number.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAccountHelp(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#04244d] hover:bg-[#021835] text-white text-xs font-bold transition-all"
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
