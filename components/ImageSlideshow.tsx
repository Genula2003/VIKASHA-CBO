"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FocusItem {
  id: number;
  type: "text" | "image";
  badge?: string;
  tag?: string;
  title: string;
  description?: string;
  image?: string;
  alt?: string;
  location?: string;
  metric?: string;
}

const focusItems: FocusItem[] = [
  {
    id: 1,
    type: "image",
    image: "/focus-pipes-gallery.jpg",
    badge: "PRESSURE GRID",
    title: "High-Pressure Booster Station & Ring-Main Valves",
    location: "Magammana Intake Booster 01",
    alt: "Industrial Water Pipeline Gallery and Pressure Valves"
  },
  {
    id: 2,
    type: "text",
    tag: "INFRASTRUCTURE 01 • WATER PURITY",
    title: "AUTOMATED CHLORINATION & PURITY STANDARDS",
    description:
      "Deep-well mountain aquifer water undergoes multi-stage silica sand filtration and continuous proportional chlorine dosing compliant with SLS 614 National Drinking Water standards.",
    metric: "SLS 614 Certified"
  },
  {
    id: 3,
    type: "image",
    image: "/focus-canal-scenic.jpg",
    badge: "NATURAL CATCHMENT",
    title: "Protected Natural Mountain Catchment Basin",
    location: "Magammana Catchment Reserve",
    alt: "Scenic Mountain Water Canal and Catchment Reservoir"
  },
  {
    id: 4,
    type: "text",
    tag: "INFRASTRUCTURE 02 • DISTRIBUTION",
    title: "GRAVITY-FED RING-MAIN DISTRIBUTION GRID",
    description:
      "Engineered heavy-duty ring-main pressure pipelines designed to maintain a minimum 0.5 Bar pressure across all residential sectors without seasonal supply interruptions.",
    metric: "24/7 Gravity Pressure"
  },
  {
    id: 5,
    type: "image",
    image: "/gov-water-purification.jpg",
    badge: "FILTRATION PLANT",
    title: "Multi-Stage Sand & Carbon Filtration Works",
    location: "Central Treatment Works",
    alt: "Industrial Water Purification and Filtration Tanks"
  },
  {
    id: 6,
    type: "text",
    tag: "INFRASTRUCTURE 03 • DIGITAL TELEMETRY",
    title: "PRECISION SMART METER LOGGING & TELEMETRY",
    description:
      "Optical mobile meter logging with digital timestamping, automated arrears reconciliation, and instantaneous online settlements with zero convenience fees.",
    metric: "100% Audited Ledger"
  },
  {
    id: 7,
    type: "image",
    image: "/water_reservoir_hero.jpg",
    badge: "STORAGE RESERVOIR",
    title: "High-Capacity Elevated Mountain Reservoir",
    location: "Summit Sector Reservoir",
    alt: "Elevated Water Storage Reservoir"
  },
  {
    id: 8,
    type: "text",
    tag: "INFRASTRUCTURE 04 • GOVERNANCE",
    title: "COMMUNITY-OWNED & DCWS SUPERVISED",
    description:
      "Operated democratically under the constitutional oversight of the Magammana General Assembly with published quarterly statements and emergency infrastructure reserves.",
    metric: "DCWS Registered Scheme"
  }
];

export default function ImageSlideshow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(480);
  const [cardHeight, setCardHeight] = useState(350);
  const [gap, setGap] = useState(24);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive card dimension update
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const w = window.innerWidth;
        if (w < 640) {
          setCardWidth(290);
          setCardHeight(300);
          setGap(16);
        } else if (w < 1024) {
          setCardWidth(380);
          setCardHeight(320);
          setGap(20);
        } else {
          setCardWidth(480);
          setCardHeight(350);
          setGap(24);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Preload images
  useEffect(() => {
    focusItems.forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, []);

  // Single loop width in pixels
  const singleLoopWidth = focusItems.length * (cardWidth + gap);

  // Initial peeking offset: so Card 1 peeks slightly on the left just like the reference screenshot
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollLeft === 0) {
      el.scrollLeft = 80;
    }
  }, []);

  // Continuous silky-smooth infinite auto-scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const scrollSpeed = 0.65; // ~39px per second: calm, elegant, continuous glide

    const step = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && !isInteractingRef.current && el) {
        el.scrollLeft += (scrollSpeed * delta) / 16.67;

        // Seamless wrap when past single loop width
        if (el.scrollLeft >= singleLoopWidth * 2) {
          el.scrollLeft -= singleLoopWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += singleLoopWidth;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, singleLoopWidth]);

  // Handle manual navigation arrows (< and >)
  const handleNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    el.scrollBy({ left: cardWidth + gap, behavior: "smooth" });

    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 700);
  }, [cardWidth, gap]);

  const handlePrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    el.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });

    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 700);
  }, [cardWidth, gap]);

  // Quadruple items to guarantee infinite seamless wrapping buffer
  const displayItems = [...focusItems, ...focusItems, ...focusItems, ...focusItems];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F1F5F9] via-[#E6EDF5] to-[#F1F5F9] relative z-10 border-t border-b border-slate-200/90 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#081B38_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] bg-gradient-to-br from-cyan-400/10 via-sky-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[520px] h-[520px] bg-gradient-to-tl from-[#081B38]/8 via-slate-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grand Card Container (Architectural White Card Matching Reference Screenshot) */}
        <div className="bg-gradient-to-b from-white via-white to-slate-50/70 rounded-[32px] sm:rounded-[44px] shadow-[0_24px_70px_rgba(8,27,56,0.06),0_1px_3px_rgba(8,27,56,0.03)] py-14 sm:py-20 relative overflow-hidden border border-slate-200/90">
          
          {/* Ambient Top Glow & Sheen */}
          <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-cyan-50/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />

          {/* Centered Eyebrow Badge: Geometric Icon + FOCUS AREAS */}
          <div className="flex items-center justify-center gap-2 mb-3.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#081B38] text-[11px] font-mono font-bold shadow-sm uppercase tracking-wider">
              <svg
                className="w-3.5 h-3.5 text-[#081B38]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5-2.1 2.1m-8.8 8.8-2.1 2.1m0-13 2.1 2.1m8.8 8.8 2.1 2.1" />
              </svg>
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

          {/* Continuous Infinite Horizontal Carousel Track */}
          <div
            className="relative mt-10 sm:mt-14 overflow-hidden py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => {
              isInteractingRef.current = true;
            }}
            onTouchEnd={() => {
              if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
              resumeTimeoutRef.current = setTimeout(() => {
                isInteractingRef.current = false;
              }, 1200);
            }}
          >
            {/* Soft Edge Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

            <div
              ref={scrollRef}
              className="flex items-center overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none cursor-grab active:cursor-grabbing px-4"
              style={{ gap: `${gap}px` }}
            >
              {displayItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`
                  }}
                  className="flex-shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(8,27,56,0.08)] border border-slate-200/90 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,27,56,0.16)] hover:-translate-y-1.5 group select-none"
                >
                  {item.type === "image" ? (
                    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title || "Water Infrastructure"}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Directional navy scrim for crystal clear readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081B38]/95 via-[#081B38]/30 to-transparent" />
                      
                      {/* Floating Glass Pill Badge on Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#081B38] shadow-sm uppercase flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                          {item.badge}
                        </span>
                      </div>

                      {/* Bottom Title & Location Info */}
                      <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-semibold block">
                          {item.location}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-tight leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#081B38] via-[#0B2548] to-[#0A1F3D] text-white p-7 sm:p-9 flex flex-col justify-between border border-white/10 relative overflow-hidden">
                      {/* Ambient radial water glow in background */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                      {/* Upper Content Area */}
                      <div className="space-y-3.5 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-bold">
                            {item.tag}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-cyan-200">
                            Core Sector
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-wider uppercase text-white leading-snug whitespace-pre-line font-sans">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>

                      {/* Lower Footer with Silver Line & Metric Badge */}
                      <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs relative z-10">
                        <span className="font-mono text-xs font-semibold text-cyan-200 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          {item.metric}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#081B38] text-white flex items-center justify-center transition-all duration-300 border border-white/20">
                          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Centered Navigation Controls (Matching Reference Screenshot) */}
          <div className="flex items-center justify-center gap-3 mt-8 sm:mt-10 relative z-10">
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-[#081B38] hover:text-white text-[#081B38] border border-slate-200/90 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-[#081B38] hover:text-white text-[#081B38] border border-slate-200/90 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Next Slide"
              title="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
