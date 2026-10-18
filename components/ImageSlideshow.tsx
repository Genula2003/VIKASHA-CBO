"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, ShieldCheck, ArrowRight, Pause, Play } from "lucide-react";

interface FocusItem {
  id: number;
  badge: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  location: string;
  metric: string;
}

const focusItems: FocusItem[] = [
  {
    id: 1,
    badge: "PRESSURE GRID",
    tag: "INFRASTRUCTURE 01 • HYDRAULIC NETWORK",
    title: "High-Pressure Booster Station & Ring-Main Valves",
    location: "Magammana Intake Booster 01",
    metric: "0.5 Bar Min • SLS 614",
    description: "Industrial centrifugal pumps and heavy-duty ring-main pressure pipelines engineered to maintain uniform hydrostatic pressure across all residential sectors without seasonal drops.",
    image: "/focus-pipes-gallery.jpg",
    alt: "Industrial Water Pipeline Gallery and Pressure Valves"
  },
  {
    id: 2,
    badge: "NATURAL CATCHMENT",
    tag: "INFRASTRUCTURE 02 • MOUNTAIN AQUIFER",
    title: "Protected Natural Mountain Catchment Basin",
    location: "Magammana Catchment Reserve",
    metric: "Highland Spring Aquifer",
    description: "Pristine mountain watershed preserved under community conservation covenants, guaranteeing continuous natural gravity-fed aquifer recharge even during prolonged dry spells.",
    image: "/focus-canal-scenic.jpg",
    alt: "Scenic Mountain Water Canal and Catchment Reservoir"
  },
  {
    id: 3,
    badge: "PURIFICATION PLANT",
    tag: "INFRASTRUCTURE 03 • WATER PURITY",
    title: "Multi-Stage Silica Sand & Carbon Filtration Works",
    location: "Central Treatment Works",
    metric: "SLS 614 Certified Purity",
    description: "Deep-well mountain water undergoes continuous multi-stage silica filtration and automated proportional chlorine dosing matching SLS 614 National Drinking Water standards.",
    image: "/gov-water-purification.jpg",
    alt: "Industrial Water Purification and Filtration Tanks"
  },
  {
    id: 4,
    badge: "STORAGE RESERVOIR",
    tag: "INFRASTRUCTURE 04 • GRAVITY RESERVES",
    title: "High-Capacity Elevated Mountain Reservoir",
    location: "Summit Sector Reservoir",
    metric: "48-Hour Gravity Reserve",
    description: "Reinforced concrete elevated mountain storage ensuring 24/7 pressurized gravity flow and uninterrupted community emergency reserves for all connected households.",
    image: "/water_reservoir_hero.jpg",
    alt: "Elevated Water Storage Reservoir"
  },
  {
    id: 5,
    badge: "DIGITAL TELEMETRY",
    tag: "INFRASTRUCTURE 05 • SMART METERING",
    title: "Precision Smart Meter Logging & Telemetry",
    location: "Sector-Wide Metering Grid",
    metric: "100% Audited Ledger",
    description: "Optical mobile meter logging with digital timestamping, automated arrears reconciliation, and instantaneous online settlements with zero convenience fees.",
    image: "/card-smart-meter.jpg",
    alt: "Optical Smart Meter Telemetry and Digital Logging"
  },
  {
    id: 6,
    badge: "QUALITY CONTROL",
    tag: "INFRASTRUCTURE 06 • LAB SAFETY",
    title: "Continuous Water Quality & Residual Chlorine Testing",
    location: "Municipal Quality Laboratory",
    metric: "0.00 NTU Clarity Target",
    description: "Independent periodic microbiological culture testing, turbidity validation, and real-time residual chlorine calibration ensuring safe, crystalline water at every tap.",
    image: "/water_quality_lab.jpg",
    alt: "Certified Water Testing Laboratory with Quality Inspection"
  }
];

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [cardWidth, setCardWidth] = useState(540);
  const [cardHeight, setCardHeight] = useState(380);
  const gap = 24;

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Responsive card dimension measurement
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const w = window.innerWidth;
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
        if (w < 640) {
          setCardWidth(Math.min(w - 48, 360));
          setCardHeight(360);
        } else if (w < 1024) {
          setCardWidth(460);
          setCardHeight(370);
        } else {
          setCardWidth(540);
          setCardHeight(380);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Preload all slideshow images for zero lag
  useEffect(() => {
    focusItems.forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, []);

  // Next Slide Handler
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % focusItems.length);
  }, []);

  // Prev Slide Handler
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + focusItems.length) % focusItems.length);
  }, []);

  // Auto-slide smoothly every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  // Exact centered offset calculation
  const cardTotalWidth = cardWidth + gap;
  const trackOffset = (containerWidth / 2) - (currentIndex * cardTotalWidth + cardWidth / 2);

  const currentItem = focusItems[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F1F5F9] via-[#E6EDF5] to-[#F1F5F9] relative z-10 border-t border-b border-slate-200/90 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#081B38_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] bg-gradient-to-br from-cyan-400/10 via-sky-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[520px] h-[520px] bg-gradient-to-tl from-[#081B38]/8 via-slate-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grand Card Container */}
        <div className="bg-gradient-to-b from-white via-white to-slate-50/70 rounded-[32px] sm:rounded-[44px] shadow-[0_24px_70px_rgba(8,27,56,0.06),0_1px_3px_rgba(8,27,56,0.03)] py-12 sm:py-18 relative overflow-hidden border border-slate-200/90">
          
          {/* Ambient Top Glow & Sheen */}
          <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-cyan-50/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />

          {/* Centered Eyebrow Badge */}
          <div className="flex items-center justify-center gap-2 mb-3.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#081B38] text-[11px] font-mono font-bold shadow-sm uppercase tracking-wider">
              <Sparkles size={13} className="text-[#0066FF]" />
              <span>FOCUS AREAS &bull; ජල සම්පාදන යටිතල පහසුකම්</span>
            </div>
          </div>

          {/* Centered Master Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#081B38] tracking-tight text-center leading-[1.2] max-w-4xl mx-auto px-4 font-serif relative z-10">
            Engineering Resilient Water Infrastructure
            <br className="hidden sm:inline" />
            {" "}For Community Generations
          </h2>

          {/* Centered Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm text-center max-w-2xl mx-auto mt-3.5 px-6 leading-relaxed font-normal relative z-10">
            Explore the physical engineering, advanced filtration systems, optical telemetry grids, and community reservoirs powering Magammana&apos;s 24/7 drinking water supply.
          </p>

          {/* Continuous Hardware-Accelerated Sliding Track Container */}
          <div
            ref={containerRef}
            className="relative mt-8 sm:mt-12 overflow-hidden py-4 select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Edge Blur & Fade Gradients */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

            {/* Sliding Track with Smooth Centered Offset */}
            <div
              className="flex items-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(${trackOffset}px)`,
                gap: `${gap}px`
              }}
            >
              {focusItems.map((item, idx) => {
                const isActive = idx === currentIndex;

                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`
                    }}
                    className={`flex-shrink-0 rounded-[28px] overflow-hidden cursor-pointer transition-all duration-700 select-none relative group ${
                      isActive
                        ? "scale-100 opacity-100 shadow-[0_20px_50px_rgba(8,27,56,0.22)] border-2 border-[#0066FF] ring-4 ring-[#0066FF]/10 z-10"
                        : "scale-[0.93] opacity-60 hover:opacity-85 hover:scale-[0.96] shadow-[0_10px_30px_rgba(8,27,56,0.08)] border border-slate-200"
                    }`}
                  >
                    {/* Background Infrastructure Photo */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Rich Directional Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081B38] via-[#081B38]/50 to-[#081B38]/15" />

                    {/* Top Floating Glass Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      {/* Left Badge: Category */}
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-sm uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        {item.badge}
                      </span>

                      {/* Right Badge: SLS Metric */}
                      <span className="px-2.5 py-1 rounded-full bg-[#081B38]/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cyan-200 font-semibold shadow-sm">
                        {item.metric}
                      </span>
                    </div>

                    {/* Bottom Content Panel with Glass Backdrop */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-10 text-white space-y-2 bg-gradient-to-t from-[#081B38] via-[#081B38]/90 to-transparent">
                      {/* Location Tag */}
                      <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] font-mono uppercase tracking-wider font-semibold">
                        <MapPin size={12} className="text-cyan-400" />
                        <span>{item.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold font-serif text-white tracking-tight leading-snug line-clamp-1 group-hover:text-cyan-100 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal line-clamp-2">
                        {item.description}
                      </p>

                      {/* Bottom Micro Action */}
                      <div className="pt-2 flex items-center justify-between text-xs text-cyan-300 font-mono font-semibold border-t border-white/10">
                        <span>{item.tag}</span>
                        <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#0066FF] text-white flex items-center justify-center transition-all duration-300">
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Navigation & Live 5s Progress Bar */}
          <div className="max-w-xl mx-auto px-4 mt-6 sm:mt-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Slide Counter (e.g. 01 / 06) */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#081B38]">
              <span className="text-sm sm:text-base font-black text-[#0066FF]">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">
                {String(focusItems.length).padStart(2, "0")}
              </span>
            </div>

            {/* Center: Interactive Pills & Auto-Slide Progress Bar */}
            <div className="flex items-center gap-2">
              {focusItems.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? "w-8 bg-[#0066FF] shadow-sm shadow-blue-500/40" 
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Right: Previous & Next Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#081B38] hover:text-white text-[#081B38] border border-slate-200/90 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Previous Slide"
                title="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#081B38] border border-slate-200/90 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer text-xs"
                aria-label={isPaused ? "Resume auto-slide" : "Pause auto-slide"}
                title={isPaused ? "Resume auto-slide" : "Pause auto-slide"}
              >
                {isPaused ? <Play size={14} className="fill-current" /> : <Pause size={14} className="fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#081B38] hover:text-white text-[#081B38] border border-slate-200/90 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Next Slide"
                title="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

          {/* Live 5-Second Timer Progress Bar at Bottom of Card */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-100 overflow-hidden">
            <div
              key={`${currentIndex}-${isPaused}`}
              className={`h-full bg-gradient-to-r from-[#0066FF] to-cyan-400 ${
                isPaused ? "w-0 opacity-40" : "animate-progress"
              }`}
              style={{
                animationDuration: "5000ms",
                animationTimingFunction: "linear",
                animationFillMode: "forwards"
              }}
            />
          </div>

        </div>

      </div>

      {/* Embedded CSS for smooth progress animation */}
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
