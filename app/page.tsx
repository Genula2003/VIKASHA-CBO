"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">

      {/* ========================================================================= */}
      {/* 0. INITIAL PAGE WHITE THEME LANDING ANIMATION */}
      {/* ========================================================================= */}
      <PageLoader minDuration={850} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (PREMIUM DIGITAL WATER SERVICES PLATFORM) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-visible bg-[#071525] text-white">

        {/* Top Navbar */}
        <Navbar />

        {/* Cinematic Water Infrastructure Hero with 3D Floating Dashboard */}
        <HeroSection
          onSearch={(accountNum) => {
            setIsSearching(true);
            const targetAcc = accountNum || "";
            if (targetAcc && targetAcc.trim()) {
              router.push(`/pay?acc=${encodeURIComponent(targetAcc.trim())}`);
            } else {
              router.push("/pay");
            }
          }}
          isSearching={isSearching}
          onOpenAccountHelp={() => setShowAccountHelp(true)}
          onOpenHowToPay={() => setShowHowToPay(true)}
        />

      </section>

      {/* ========================================================================= */}
      {/* 2. 3 HERO-MATCHING FEATURE CARDS (CLEAN WHITE THEME AS PER SPECIFICATION) */}
      {/* ========================================================================= */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 lg:-mt-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              category: "SMART TELEMETRY",
              title: "SMART METERING",
              desc: "High-precision optical telemetry logging and automated consumption tracking.",
              image: "/card-smart-meter.webp",
              href: "/pay"
            },
            {
              category: "DIGITAL E-BILLING",
              title: "ONLINE BILL PAY",
              desc: "Instant zero-surcharge settlement via LankaQR, Visa, Mastercard, and CEFT.",
              image: "/card-ebill-pay.webp",
              href: "/pay"
            },
            {
              category: "WATER QUALITY",
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
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,27,56,0.08),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_65px_rgba(8,27,56,0.15)] bg-white border border-slate-100 flex flex-col group transition-all duration-300"
            >
              <Link
                href={card.href}
                className="flex flex-col h-full"
              >
                {/* Upper Image Section */}
                <div className="h-52 sm:h-60 lg:h-64 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Top Gradient for Badge Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-black/10" />

                  {/* Floating Pristine White/Glass Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-widest text-[#081B38] shadow-sm uppercase">
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Lower White Panel Matching Image 3 */}
                <div className="bg-white p-6 sm:p-7 text-slate-900 border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#081B38] tracking-tight mb-2.5 group-hover:text-[#0057E7] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  {/* Action Footer with Explore Service and Rounded Icon Arrow */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#081B38] group-hover:text-[#0057E7] transition-colors">
                    <span className="uppercase tracking-wider text-[11px]">Explore Service</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#081B38] text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
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
