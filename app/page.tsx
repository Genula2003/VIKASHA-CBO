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
  User,
  ArrowRight,
  Clock,
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
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

// Silky smooth momentum cubic-bezier easing curve
const smoothEase = [0.22, 1, 0.36, 1] as const;

// Institutional Governance 3 pillars definition
const governanceCards = [
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
];

export default function Home() {
  const router = useRouter();
  const [quickAccount, setQuickAccount] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showHowToPay, setShowHowToPay] = useState(false);
  const [showAccountHelp, setShowAccountHelp] = useState(false);

  // Institutional Governance mobile slideshow state
  const [govSlide, setGovSlide] = useState(0);
  const [govDirection, setGovDirection] = useState(1);
  const [isGovPaused, setIsGovPaused] = useState(false);

  const paginateGov = (newDirection: number) => {
    setGovDirection(newDirection);
    setGovSlide((prev) => (prev + newDirection + governanceCards.length) % governanceCards.length);
  };

  useEffect(() => {
    if (isGovPaused) return;
    const timer = setInterval(() => {
      paginateGov(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isGovPaused]);

  // Dynamic rotating words for hero section word animation
  const rotatingWords = [
    { text: "Excellence.", tag: "SLS 614 Quality Audit" },
    { text: "Purity.", tag: "Continuous Multi-Stage Sand Filtration" },
    { text: "Reliability.", tag: "24/7 Gravity-Fed Flow Line" },
    { text: "Integrity.", tag: "100% Audited Public Ledger" },
    { text: "Community.", tag: "Democratically Governed CBO" }
  ];
  const [wordIndex, setWordIndex] = useState(0);

  // Rotate hero words every 3.5 seconds smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3500);
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

        {/* Full-Width Nature Water Background Container */}
        <div className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[760px] w-full flex items-center pt-28 sm:pt-36 pb-36 sm:pb-44 lg:pb-52 overflow-hidden">

          {/* Background Nature Water Lake Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-nature-water.jpg"
              alt="Magammana Nature Water Reservoir"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {/* Scrims: Clean Navy Scrim on the left for text contrast, letting the sunburst, reservoir & greenery glow through */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#081B38]/85 via-[#081B38]/45 to-transparent" />
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
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: smoothEase }}
                className="flex items-center gap-3"
              >
                <span className="w-12 h-[1.5px] bg-slate-300" />
                <span className="text-xs uppercase tracking-[0.22em] text-slate-200 font-semibold font-mono">
                  COMMUNITY BASED ORGANIZATION &bull; WATER UTILITY
                </span>
              </motion.div>

              {/* Master Headline in Elegant Serif (3 Lines with Rotating Word) */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-white leading-[1.14] tracking-tight font-normal select-none">
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, delay: 0.1, ease: smoothEase }}
                  className="block"
                >
                  A Legacy of Trust
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, delay: 0.2, ease: smoothEase }}
                  className="block"
                >
                  Built on Sophisticated
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, delay: 0.3, ease: smoothEase }}
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
                        transition={{ duration: 0.65, ease: smoothEase }}
                        className="block italic font-normal font-serif text-white tracking-tight"
                      >
                        {rotatingWords[wordIndex].text}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.span>
              </h1>

              {/* Dynamic Rotating Quality Pillar Chip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
                className="pt-1"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081B38]/70 border border-cyan-400/40 text-cyan-200 text-xs font-mono font-semibold shadow-sm backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  STANDARDS PILLAR: {rotatingWords[wordIndex].tag}
                </span>
              </motion.div>

              {/* =================================================================== */}
              {/* METER ACCOUNT NUMBER ENTERING PART (FROSTED GLASS WIDGET) */}
              {/* =================================================================== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: smoothEase }}
                className="rounded-2xl p-[1px] bg-gradient-to-b from-white/40 via-white/15 to-transparent shadow-2xl max-w-xl w-full"
              >
                <div className="backdrop-blur-xl bg-[#081B38]/75 border border-white/20 rounded-2xl p-4 sm:p-5 text-white">

                  {/* Widget Header with Silver/White Accents */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono uppercase tracking-wider font-bold text-white flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
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
                          className="w-full h-12 pl-13 pr-4 rounded-xl bg-white text-[#081B38] placeholder:text-slate-400 font-mono text-base sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#081B38] border border-slate-200"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSearching}
                        className="h-12 px-6 rounded-xl bg-white hover:bg-slate-100 text-[#081B38] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-75 border border-slate-200 whitespace-nowrap"
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
                    <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-300 flex-wrap">
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
                        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[11px] sm:text-xs"
                      >
                        <HelpCircle size={14} className="text-slate-300" />
                        <span>Need help finding your account number?</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHowToPay(true)}
                        className="flex items-center gap-1.5 hover:text-white transition-colors font-medium cursor-pointer text-[11px] sm:text-xs"
                      >
                        <span>How to Pay?</span>
                        <Play size={12} className="text-slate-300" />
                      </button>
                    </div>
                  </form>

                </div>
              </motion.div>

              {/* Two Action Buttons (Navy Dark Blue & Frosted White/Silver) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.3, ease: smoothEase }}
                className="flex flex-wrap items-center gap-4 pt-1"
              >
                <Link
                  href="/pay"
                  className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#081B38] hover:bg-[#0c2b59] text-white text-xs sm:text-sm font-bold border border-slate-300/40 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Pay Water Bill</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="#services"
                  className="px-6 sm:px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/70 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                >
                  Discover Services
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. 3 OVERLAPPING CARDS (WHITE IS MAIN, NAVY DARK BLUE & SILVER THEME) */}
      {/* ========================================================================= */}
      <section className="hidden md:block relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-28 lg:-mt-36 mb-12">
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
      {/* 3. OUR SERVICES SECTION */}
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

          {/* Interactive Water Services Showcase */}
          <div className="pt-2">
            <WaterServicesShowcase />
          </div>

          {/* Cinematic Water Services Video Showcase */}
          <div className="pt-4 pb-2">
            <VideoShowcase />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. IMAGE SLIDESHOW SECTION */}
      {/* ========================================================================= */}
      <ImageSlideshow />

      {/* ========================================================================= */}
      {/* 5. EMERGENCY LEAK REPORTING CALLOUT (#leaks) */}
      {/* ========================================================================= */}
      <section id="leaks" className="py-12 sm:py-16 bg-white relative z-10 border-b border-slate-200">
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
      {/* 6. ABOUT CBO / INSTITUTIONAL GOVERNANCE SECTION (#governance & #about) */}
      {/* ========================================================================= */}
      <section id="about" className="py-14 sm:py-24 bg-slate-50/70 relative z-10 border-b border-slate-200">
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
              INSTITUTIONAL GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#081B38] tracking-tight font-serif">
              Community Owned, Democratically Run
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Vikasha CBO operates under the constitutional oversight of the Magammana General Assembly and the Department of Community Water Supply (DCWS).
            </p>
          </motion.div>

          {/* Desktop: 3 Governance Pillars Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {governanceCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.12, ease: smoothEase }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,27,56,0.12)] bg-white border border-slate-200/90 flex flex-col group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(8,27,56,0.18)] hover:border-slate-300"
              >
                <div className="flex flex-col h-full">
                  {/* Upper Image Section */}
                  <div className="h-44 sm:h-56 lg:h-64 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-xs uppercase">
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Lower Panel */}
                  <div className="bg-white p-5 sm:p-7 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#081B38] tracking-tight font-serif mb-2 group-hover:text-[#004EEB] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

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

          {/* Mobile: Interactive Responsive Touch Slideshow / Carousel */}
          <div
            className="block md:hidden relative"
            onTouchStart={() => setIsGovPaused(true)}
            onTouchEnd={() => setIsGovPaused(false)}
            onMouseEnter={() => setIsGovPaused(true)}
            onMouseLeave={() => setIsGovPaused(false)}
          >
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence initial={false} custom={govDirection} mode="wait">
                <motion.div
                  key={govSlide}
                  custom={govDirection}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 60 : -60,
                      opacity: 0,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                    },
                    exit: (dir: number) => ({
                      x: dir < 0 ? 60 : -60,
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: smoothEase }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_e, { offset }) => {
                    if (offset.x < -40) {
                      paginateGov(1);
                    } else if (offset.x > 40) {
                      paginateGov(-1);
                    }
                  }}
                  className="rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(8,27,56,0.12)] bg-white border border-slate-200/90 flex flex-col cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  <div className="flex flex-col">
                    {/* Upper Image Section */}
                    <div className="h-48 w-full overflow-hidden relative bg-slate-100">
                      <img
                        src={governanceCards[govSlide].image}
                        alt={governanceCards[govSlide].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-mono font-bold tracking-wider text-[#081B38] shadow-xs uppercase">
                          {governanceCards[govSlide].category}
                        </span>
                      </div>
                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#081B38]/85 backdrop-blur-md text-white font-mono text-[10px] font-bold">
                          {String(govSlide + 1).padStart(2, '0')} / {String(governanceCards.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Lower Panel */}
                    <div className="bg-white p-5 text-slate-900 border-t border-slate-100 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#081B38] tracking-tight font-serif mb-2">
                          {governanceCards[govSlide].title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {governanceCards[govSlide].desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#081B38]">
                        <span className="font-mono uppercase tracking-wider text-[11px]">
                          {governanceCards[govSlide].actionText}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-[#081B38] flex items-center justify-center">
                          {(() => {
                            const IconComponent = governanceCards[govSlide].icon;
                            return <IconComponent size={15} />;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Slideshow Controls: Prev / Next Buttons & Indicators */}
            <div className="flex items-center justify-between mt-4 px-1">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {governanceCards.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    type="button"
                    onClick={() => {
                      setGovDirection(dotIndex > govSlide ? 1 : -1);
                      setGovSlide(dotIndex);
                    }}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dotIndex === govSlide
                        ? "w-6 bg-[#081B38]"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => paginateGov(-1)}
                  aria-label="Previous governance slide"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#081B38] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => paginateGov(1)}
                  aria-label="Next governance slide"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#081B38] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SOVEREIGN INSTITUTIONAL FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#020e1e] text-white pt-6 sm:pt-16 pb-6 sm:pb-12 border-t border-slate-800 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: smoothEase }}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-12"
        >

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 sm:gap-8">
            <div className="col-span-2 md:col-span-2 space-y-2 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 p-0.5 sm:p-1 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
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
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">Vikasha CBO</h4>
                  <p className="text-[11px] sm:text-xs text-cyan-200/80">විකාශා ප්‍රජා මූල සංවිධානය &bull; මාගම්මන</p>
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 max-w-md leading-relaxed">
                National Water Supply &amp; Drainage Board / Department of Community Water Supply (DCWS) registered scheme ensuring uninterrupted safe drinking water for Magammana, Homagama.
              </p>
            </div>

            <div className="col-span-1 space-y-2 sm:space-y-3">
              <h5 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyan-300">Quick Access</h5>
              <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-300 font-medium">
                <li><Link href="/pay" className="hover:text-cyan-300 transition-colors duration-200">Online Bill Payment</Link></li>
                <li><Link href="/meter-reader" className="hover:text-cyan-300 transition-colors duration-200">Field Meter Reader App</Link></li>
                <li><Link href="/admin/dashboard" className="hover:text-cyan-300 transition-colors duration-200">Administrative Dashboard</Link></li>
                <li><Link href="/login" className="hover:text-cyan-300 transition-colors duration-200">Staff Portal Login</Link></li>
              </ul>
            </div>

            <div className="col-span-1 space-y-2 sm:space-y-3">
              <h5 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyan-300">Contact &amp; Emergency</h5>
              <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-300 font-medium">
                <p className="flex items-start sm:items-center gap-1.5 sm:gap-2"><MapPin size={12} className="text-cyan-400 shrink-0 mt-0.5 sm:mt-0" /> <span>Magammana, Homagama</span></p>
                <p className="flex items-start sm:items-center gap-1.5 sm:gap-2"><Mail size={12} className="text-cyan-400 shrink-0 mt-0.5 sm:mt-0" /> <span className="break-all">support@vikashacbo.com</span></p>
                <p className="flex items-start sm:items-center gap-1.5 sm:gap-2"><Phone size={12} className="text-emerald-400 shrink-0 mt-0.5 sm:mt-0" /> <span>011 289 4567</span></p>
                <p className="flex items-start sm:items-center gap-1.5 sm:gap-2"><Clock size={12} className="text-amber-400 shrink-0 mt-0.5 sm:mt-0" /> <span>Mon - Sat: 8AM - 5PM</span></p>
              </div>
            </div>
          </div>

          <div className="pt-4 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Vikasha CBO (Magammana Water Project). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-5 text-slate-300 text-[10.5px] sm:text-xs">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms &amp; Conditions</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors duration-200">Refund Policy</Link>
              <Link href="/delivery-policy" className="hover:text-white transition-colors duration-200">Delivery Policy</Link>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[10px] sm:text-[11px]">
                <Shield size={12} /> DCWS / NWSDB Regulated
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
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4.5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto my-auto"
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
                {[
                  {
                    step: "1",
                    title: "Enter Your Account Number",
                    desc: "Type your consumer account ID (e.g. 135) in the search field above and click 'View & Pay Bill'."
                  },
                  {
                    step: "2",
                    title: "Verify Bill Amount & Units",
                    desc: "Check your consumption details, current meter reading, and total outstanding due balance."
                  },
                  {
                    step: "3",
                    title: "Select Instant Gateway",
                    desc: "Pay securely with Visa, Mastercard, LankaQR mobile scan, or direct CEFT bank transfer."
                  },
                  {
                    step: "4",
                    title: "Instant Digital Receipt",
                    desc: "Download your official stamped PDF receipt instantly and receive an SMS notification."
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
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

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex justify-end">
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
              className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4.5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto my-auto"
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
                      Account No / ගිණුම් අංකය &larr;
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
