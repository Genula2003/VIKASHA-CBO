"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowRight,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import Link from "next/link";

interface FocusItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  location: string;
  metric: string;
  specs: string[];
  description: string;
  badge?: string;
}

const focusItems: FocusItem[] = [
  {
    id: "reservoir",
    name: "MAGAMMANA RESERVOIR",
    subtitle: "Reinforced elevated mountain storage ensuring 24/7 continuous community water pressure",
    category: "GRAVITY STORAGE • 48-HR BUFFER",
    badge: "PRIMARY HUB",
    image: "/water_reservoir_hero.webp",
    location: "Summit Sector Ridge, Magammana",
    metric: "48-Hour Gravity Reserve • 0.5 Bar Min",
    description: "Engineered reinforced concrete elevated mountain reservoir providing hydrostatic gravity pressure to all connected households, ensuring uninterrupted community water supply even during power grid outages.",
    specs: [
      "Elevated high-capacity hydrostatic pressure head",
      "48-hour continuous emergency community storage",
      "Dual intake chamber with sediment purge valves",
      "Protected mountain perimeter with watershed covenants"
    ]
  },
  {
    id: "filtration",
    name: "Silica Purification Works",
    subtitle: "Multi-stage SLS 614 certified silica and activated carbon water filtration works",
    category: "PURIFICATION PLANT • SLS 614",
    badge: "SLS 614 CERTIFIED",
    image: "/gov-water-purification.webp",
    location: "Magammana Central Treatment Works",
    metric: "SLS 614 Certified • 0.00 NTU Purity",
    description: "Deep-well mountain water undergoes continuous multi-stage silica filtration, activated carbon absorption, and automated proportional chlorine dosing meeting Sri Lanka National Drinking Water standards.",
    specs: [
      "Multi-stage high-capacity silica sand filtration beds",
      "Activated carbon organic pollutant absorption",
      "Automated proportional sodium hypochlorite dosing",
      "24/7 continuous residual chlorine monitoring (0.2–0.5 ppm)"
    ]
  },
  {
    id: "telemetry",
    name: "SMART METER TELEMETRY",
    subtitle: "Precision optical meter logging with instant real-time audit ledger reconciliation",
    category: "DIGITAL TELEMETRY • SMART GRID",
    badge: "DIGITAL GRID",
    image: "/card-smart-meter.webp",
    location: "Sector-Wide Metering Infrastructure",
    metric: "100% Audited Ledger • Zero Delay",
    description: "Optical mobile smart meter reading app equipped with digital timestamping, automated slab tariff calculations, photographic proof of reading, and zero-convenience-fee online bill settlement.",
    specs: [
      "Precision optical reader with photographic verification",
      "Automated tier-based tariff calculation per NWSDB guidelines",
      "Instantaneous online ledger settlement via LankaQR / Cards",
      "Transparent monthly billing history with SMS telemetry"
    ]
  },
  {
    id: "booster",
    name: "High-Pressure Booster Grid",
    subtitle: "Centrifugal booster pumps and heavy-duty ring-main pressure distribution network",
    category: "PRESSURE GRID • HYDRAULIC NETWORK",
    badge: "PRESSURE NETWORK",
    image: "/focus-pipes-gallery.webp",
    location: "Magammana Intake Booster 01",
    metric: "0.5 Bar Min • SLS 614",
    description: "Industrial centrifugal pumps and heavy-duty ring-main pressure pipelines engineered to maintain uniform hydrostatic pressure across all residential sectors without seasonal drops.",
    specs: [
      "Centrifugal booster pumps with automated variable speed control",
      "Heavy-duty ring-main ductile iron distribution pipelines",
      "Pressure-relief manifolds and surge dampeners",
      "Sector isolation gate valves for maintenance without outages"
    ]
  },
  {
    id: "catchment",
    name: "PRISTINE MOUNTAIN CATCHMENT",
    subtitle: "Protected natural mountain watershed with continuous gravity-fed aquifer recharge",
    category: "NATURAL CATCHMENT • AQUIFER",
    badge: "NATURAL AQUIFER",
    image: "/focus-canal-scenic.webp",
    location: "Magammana Catchment Reserve",
    metric: "Highland Spring Aquifer",
    description: "Pristine mountain watershed preserved under community conservation covenants, guaranteeing continuous natural gravity-fed aquifer recharge even during prolonged dry spells.",
    specs: [
      "Covenant-protected mountain watershed perimeter",
      "Natural gravel and stone pre-sedimentation cascade",
      "Subterranean aquifer recharge channels",
      "Continuous gravity-assisted intake flow with zero pumping energy"
    ]
  },
  {
    id: "laboratory",
    name: "Quality Control Laboratory",
    subtitle: "Continuous certified microbiological testing and real-time residual chlorine calibration",
    category: "LAB SAFETY • SLS 614 CERTIFIED",
    badge: "LAB SAFETY",
    image: "/water_quality_lab.webp",
    location: "Magammana Quality Testing Laboratory",
    metric: "0.00 NTU Clarity Target • SLS 614",
    description: "Independent periodic microbiological culture testing, turbidity validation, and real-time residual chlorine calibration ensuring safe, crystalline water at every tap.",
    specs: [
      "Daily spectrophotometric residual chlorine calibration",
      "High-precision nephelometric turbidity monitoring (target < 0.5 NTU)",
      "Periodic microbial culture incubation (E. coli / Total Coliforms)",
      "Audited test logs certified by community health inspectors"
    ]
  }
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<FocusItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 4-Second Auto-Rotation Timer (Pauses on user hover or when modal is open)
  useEffect(() => {
    if (isPaused || selectedPillar) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % focusItems.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, selectedPillar]);

  // Lock body scroll when modal is open so background never scrolls
  useEffect(() => {
    if (selectedPillar) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedPillar]);

  // ESC key listener to close modal smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPillar(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Active items for 3-card presentation
  const leftIndex = (currentIndex - 1 + focusItems.length) % focusItems.length;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % focusItems.length;

  const leftItem = focusItems[leftIndex];
  const centerItem = focusItems[centerIndex];
  const rightItem = focusItems[rightIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + focusItems.length) % focusItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % focusItems.length);
  };

  return (
    <section id="infrastructure" className="py-20 sm:py-28 bg-[#071525] relative z-0 border-t border-b border-white/10 text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered Eyebrow Badge */}
        <div className="flex items-center justify-center gap-2 mb-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.045] border border-[rgba(255,255,255,0.12)] text-[#00D9FF] text-[11px] font-mono font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,217,255,0.16)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
            </span>
            <span>CORE INFRASTRUCTURE &bull; යටිතල පහසුකම් පද්ධතිය</span>
          </div>
        </div>

        {/* Centered Master Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight text-center leading-[1.2] max-w-4xl mx-auto px-4 font-sans">
          Engineering Resilient Water Infrastructure
          <br className="hidden sm:inline" />
          {" "}For Community Generations
        </h2>

        {/* Centered Subtitle */}
        <p className="text-[#A8BACB] text-xs sm:text-sm text-center max-w-2xl mx-auto mt-3.5 px-6 leading-relaxed font-normal">
          Explore the physical engineering, advanced filtration systems, elevated community storage, and optical telemetry grids powering Magammana&apos;s 24/7 drinking water supply.
        </p>

        {/* ============================================================== */}
        {/* 3-CARD ROTATING SLIDESHOW CAROUSEL */}
        {/* ============================================================== */}
        <div
          className="relative max-w-6xl mx-auto mt-12 sm:mt-16 px-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quick Nav Chevrons (Desktop Left & Right Arrows) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#071525]/90 border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.6)] text-white hover:text-[#00D9FF] hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#071525]/90 border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.6)] text-white hover:text-[#00D9FF] hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* ============================================================== */}
            {/* 1. LEFT CARD (Companion Card) */}
            {/* ============================================================== */}
            <div
              onClick={() => setCurrentIndex(leftIndex)}
              className="hidden md:flex flex-col items-center text-center rounded-[32px] sm:rounded-[38px] bg-[#071525]/95 border border-white/10 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#00D9FF]/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(0,217,255,0.15)] transition-all duration-500 cursor-pointer group relative overflow-hidden select-none"
            >
              {/* Circular Image Portal - Smooth Click-to-Show Specs */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPillar(leftItem);
                }}
                title="Click image to view specifications"
                className="w-44 h-44 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-[#00D9FF]/30 via-white/10 to-transparent shadow-[0_8px_25px_rgba(0,0,0,0.5)] mb-5 relative transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-inner relative bg-[#071525]">
                  <img
                    key={leftItem.id}
                    src={leftItem.image}
                    alt={leftItem.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Subtle Hover Lens Badge */}
                  <div className="absolute inset-0 bg-[#071525]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-[#00D9FF] text-[#071525] flex items-center justify-center shadow-md">
                      <Maximize2 size={14} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold tracking-[0.14em] uppercase text-white font-sans text-xs sm:text-sm group-hover:text-[#00D9FF] transition-colors line-clamp-1">
                {leftItem.name}
              </h3>

              {/* Subtitle */}
              <p className="text-[#A8BACB] text-xs sm:text-[13px] leading-relaxed max-w-[240px] mt-2 mb-6 font-normal line-clamp-2">
                {leftItem.subtitle}
              </p>

              {/* Pill Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPillar(leftItem);
                }}
                className="rounded-full bg-white/[0.08] hover:bg-[#00D9FF] text-white hover:text-[#071525] border border-white/15 hover:border-[#00D9FF] font-medium text-xs px-6 py-2.5 inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore</span>
                <span className="text-sm leading-none">&rarr;</span>
              </button>
            </div>

            {/* ============================================================== */}
            {/* 2. CENTER CARD (Elevated Hero with Smooth Progress & Clickable Image) */}
            {/* ============================================================== */}
            <div
              className="flex flex-col items-center text-center rounded-[28px] sm:rounded-[42px] bg-gradient-to-b from-[#0b1c30] via-[#071525] to-[#05101c] border-2 border-[#00D9FF]/40 p-5 sm:p-10 md:py-14 md:-my-5 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(0,217,255,0.2)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(0,217,255,0.3)] transition-all duration-500 z-10 relative overflow-hidden group select-none"
            >
              {/* Top Badge */}
              <span className="absolute top-3.5 sm:top-5 px-3 py-1 rounded-full bg-[#00D9FF]/15 border border-[#00D9FF]/40 text-[10px] font-mono font-bold tracking-wider text-[#00D9FF] uppercase shadow-xs">
                {centerItem.badge || "FEATURED INFRASTRUCTURE"}
              </span>

              {/* Circular Image Portal - Smooth Click-to-Show Specs */}
              <div
                onClick={() => setSelectedPillar(centerItem)}
                title="Click image to explore detailed specifications smoothly"
                className="w-38 h-38 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-1.5 sm:p-2 bg-gradient-to-tr from-[#00D9FF]/40 via-sky-400/25 to-cyan-300/35 shadow-[0_0_35px_rgba(0,217,255,0.3)] mb-4 sm:mb-7 mt-2 sm:mt-3 relative transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-inner relative bg-[#071525]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={centerItem.id}
                      src={centerItem.image}
                      alt={centerItem.name}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.45 }}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </AnimatePresence>

                  {/* Smooth View Hover Overlay */}
                  <div className="absolute inset-0 bg-[#071525]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-[#00D9FF] text-[#071525] text-[11px] font-bold shadow-lg flex items-center gap-1.5">
                      <Maximize2 size={13} className="text-[#071525]" />
                      <span>View Specifications</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle with Smooth Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={centerItem.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center"
                >
                  <h3 className="font-bold tracking-[0.14em] uppercase text-white font-sans text-xs sm:text-base group-hover:text-[#00D9FF] transition-colors">
                    {centerItem.name}
                  </h3>

                  <p className="text-[#A8BACB] text-xs sm:text-sm leading-relaxed max-w-[280px] mt-2 mb-6 sm:mb-7 font-normal">
                    {centerItem.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Elevated Vibrant Button */}
              <button
                type="button"
                onClick={() => setSelectedPillar(centerItem)}
                className="rounded-full bg-[#00D9FF] hover:bg-[#2ae0ff] text-[#071525] font-extrabold text-xs sm:text-sm px-7 sm:px-8 py-3 sm:py-3.5 inline-flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore</span>
                <span className="text-sm leading-none">&rarr;</span>
              </button>

              {/* Sleek 4-Second Auto-Slide Progress Bar */}
              <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden mt-5 sm:mt-6" title="Auto-rotates every 4 seconds">
                <div
                  key={`${currentIndex}-${isPaused}`}
                  className={`h-full bg-[#00D9FF] ${isPaused ? "w-0 opacity-40" : "animate-progress"}`}
                  style={{
                    animationDuration: "4000ms",
                    animationTimingFunction: "linear",
                    animationFillMode: "forwards"
                  }}
                />
              </div>

              {/* Mobile Prev/Next Controls */}
              <div className="flex md:hidden items-center justify-between w-full mt-5 px-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-full border border-white/15 text-xs font-semibold text-white bg-[#071525]/90 shadow-xs flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-full border border-white/15 text-xs font-semibold text-white bg-[#071525]/90 shadow-xs flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* 3. RIGHT CARD (Companion Card) */}
            {/* ============================================================== */}
            <div
              onClick={() => setCurrentIndex(rightIndex)}
              className="hidden md:flex flex-col items-center text-center rounded-[32px] sm:rounded-[38px] bg-[#071525]/95 border border-white/10 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#00D9FF]/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(0,217,255,0.15)] transition-all duration-500 cursor-pointer group relative overflow-hidden select-none"
            >
              {/* Circular Image Portal - Smooth Click-to-Show Specs */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPillar(rightItem);
                }}
                title="Click image to view specifications"
                className="w-44 h-44 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-[#00D9FF]/30 via-white/10 to-transparent shadow-[0_8px_25px_rgba(0,0,0,0.5)] mb-5 relative transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-inner relative bg-[#071525]">
                  <img
                    key={rightItem.id}
                    src={rightItem.image}
                    alt={rightItem.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Subtle Hover Lens Badge */}
                  <div className="absolute inset-0 bg-[#071525]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-[#00D9FF] text-[#071525] flex items-center justify-center shadow-md">
                      <Maximize2 size={14} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold tracking-[0.14em] uppercase text-white font-sans text-xs sm:text-sm group-hover:text-[#00D9FF] transition-colors line-clamp-1">
                {rightItem.name}
              </h3>

              {/* Subtitle */}
              <p className="text-[#A8BACB] text-xs sm:text-[13px] leading-relaxed max-w-[240px] mt-2 mb-6 font-normal line-clamp-2">
                {rightItem.subtitle}
              </p>

              {/* Pill Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPillar(rightItem);
                }}
                className="rounded-full bg-white/[0.08] hover:bg-[#00D9FF] text-white hover:text-[#071525] border border-white/15 hover:border-[#00D9FF] font-medium text-xs px-6 py-2.5 inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore</span>
                <span className="text-sm leading-none">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist 6-Pill Indicators Below (Click to jump smoothly) */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {focusItems.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-8 bg-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.6)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Switch to ${item.name}`}
                title={item.name}
              />
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 100% BUG-FREE PORTAL MODAL DIALOG (MOUNTED DIRECTLY TO DOCUMENT.BODY) */}
      {/* Renders at z-[999999] so sibling sections like #leaks NEVER overlap it */}
      {/* ========================================================================= */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedPillar && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
              {/* Full-Screen Dark Glass Backdrop with Smooth Fade */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedPillar(null)}
                className="fixed inset-0 bg-[#081B38]/80 backdrop-blur-md"
              />

              {/* Centered Modal Card with Smooth Spring Scale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.32, ease: smoothEase }}
                className="relative w-full max-w-2xl bg-[#071525]/95 backdrop-blur-2xl rounded-2xl sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(0,217,255,0.15)] border border-[rgba(255,255,255,0.15)] overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] text-white"
              >
                {/* Modal Header Photo */}
                <div className="relative h-44 sm:h-72 w-full bg-[#071525] overflow-hidden shrink-0">
                  <img
                    src={selectedPillar.image}
                    alt={selectedPillar.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071525] via-[#071525]/60 to-transparent" />

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedPillar(null)}
                    className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#071525]/80 hover:bg-[#071525] text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer z-10"
                    aria-label="Close modal"
                  >
                    <X size={17} />
                  </button>

                  {/* Modal Title & Category */}
                  <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 right-4 sm:right-6 text-white">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#00D9FF]/15 backdrop-blur-md text-[9px] sm:text-[10px] font-mono tracking-wider uppercase border border-[#00D9FF]/40 text-[#00D9FF] font-bold">
                      {selectedPillar.category}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-bold font-sans mt-1.5 sm:mt-2 tracking-tight">
                      {selectedPillar.name}
                    </h3>
                    <p className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#A8BACB] font-medium mt-1">
                      <MapPin size={12} className="text-[#00D9FF] shrink-0" />
                      <span className="truncate">{selectedPillar.location}</span>
                    </p>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-8 overflow-y-auto space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#A8BACB] font-bold mb-1.5">
                      Engineering Specifications
                    </h4>
                    <p className="text-sm text-[#A8BACB] leading-relaxed font-normal">
                      {selectedPillar.description}
                    </p>
                  </div>

                  {/* Specifications Checklist */}
                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 space-y-2.5">
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#00D9FF]" />
                      <span>Technical Architecture &bull; {selectedPillar.metric}</span>
                    </div>
                    <ul className="space-y-2 pt-1 text-xs text-[#A8BACB] font-medium">
                      {selectedPillar.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#00D9FF] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPillar(null)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/15 text-[#A8BACB] hover:text-white hover:border-white/30 text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer text-center"
                    >
                      Close Window
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Link
                        href="/pay"
                        onClick={() => setSelectedPillar(null)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#00D9FF] hover:bg-[#2ae0ff] text-[#071525] text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(0,217,255,0.4)] text-center inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Quick Pay Portal</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Embedded CSS for smooth progress hairline animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation-name: progress;
        }
      `}</style>
    </section>
  );
}
