"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplet,
  Phone,
  BarChart3,
  Receipt,
  FlaskConical,
  ShieldCheck,
  ArrowRight,
  Wifi,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from "lucide-react";

// Silky smooth momentum cubic-bezier easing curve
const smoothEase = [0.22, 1, 0.36, 1] as const;

interface ServiceCard {
  id: string;
  number: string;
  badge: {
    label: string;
    icon: React.ReactNode;
    colorClasses: string;
  };
  title: string[];
  description: string;
  button: {
    bgClass: string;
    textClass: string;
    arrowBgClass: string;
    arrowColorClass: string;
  };
  image: string;
  theme: "dark" | "light";
  extraVisual?: React.ReactNode;
}

const allServices: ServiceCard[] = [
  // CARD 01: Municipal Ring-Main Distribution (Dark Navy)
  {
    id: "01",
    number: "01",
    badge: {
      label: "INFRASTRUCTURE",
      icon: <Droplet size={13} className="fill-white text-white" />,
      colorClasses: "bg-[#0080ff] text-white shadow-[0_0_10px_rgba(0,128,255,0.6)]"
    },
    title: ["Municipal", "Ring-Main", "Distribution"],
    description: "Reliable and efficient ring-main distribution systems ensuring uninterrupted water supply to communities.",
    button: {
      bgClass: "bg-[#0084ff] hover:bg-[#0070e0]",
      textClass: "text-white",
      arrowBgClass: "bg-white/20",
      arrowColorClass: "text-white"
    },
    image: "/focus-pipes-gallery.webp",
    theme: "dark"
  },

  // CARD 02: Potable Water Distribution Grids (White Theme)
  {
    id: "02",
    number: "02",
    badge: {
      label: "SERVICE",
      icon: <Phone size={13} className="fill-[#0057E7] text-[#0057E7]" />,
      colorClasses: "bg-sky-100 text-[#0057E7]"
    },
    title: ["Potable Water", "Distribution Grids"],
    description: "Engineering continuous 24/7 municipal water supply to 12,500+ households with automated pressure balancing, zoned telemetry, and rapid leak dispatch.",
    button: {
      bgClass: "bg-[#081B38] hover:bg-[#0c2b59]",
      textClass: "text-white",
      arrowBgClass: "bg-white/15",
      arrowColorClass: "text-white"
    },
    image: "/water_treatment_plant.webp",
    theme: "light"
  },

  // CARD 03: Precision Field Telemetry (Dark Midnight Blue)
  {
    id: "03",
    number: "03",
    badge: {
      label: "DIGITAL METERS",
      icon: <BarChart3 size={13} />,
      colorClasses: "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    },
    title: ["Precision", "Field Telemetry"],
    description: "Real-time monitoring, accurate metering, and smart data analytics for efficient water management.",
    button: {
      bgClass: "bg-white hover:bg-slate-100",
      textClass: "text-[#081B38]",
      arrowBgClass: "bg-[#0057E7]",
      arrowColorClass: "text-white"
    },
    image: "/service-meter-reading.webp",
    theme: "dark",
    extraVisual: (
      <div className="absolute top-4 right-8 pointer-events-none opacity-85">
        <Wifi size={34} className="text-[#0080ff] drop-shadow-[0_0_12px_rgba(0,128,255,0.9)] animate-pulse" />
      </div>
    )
  },

  // CARD 04: Digital Metering & Arrears Audit (White Theme)
  {
    id: "04",
    number: "04",
    badge: {
      label: "SERVICE 02",
      icon: <Receipt size={13} />,
      colorClasses: "bg-blue-100 text-[#0057E7]"
    },
    title: ["Digital Metering &", "Arrears Audit"],
    description: "Transparent meter logging with instant consumption auditing, automated arrears reconciliation, and verified digital receipts.",
    button: {
      bgClass: "bg-[#0084ff] hover:bg-[#0070e0]",
      textClass: "text-white",
      arrowBgClass: "bg-white/20",
      arrowColorClass: "text-white"
    },
    image: "/card-smart-meter.webp",
    theme: "light",
    extraVisual: (
      <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-2.5 z-10">
        <div className="w-6 h-6 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[#0057E7] flex items-center justify-center shadow-sm">
          <BarChart3 size={12} />
        </div>
        <div className="w-[1.5px] h-3 bg-slate-300/80" />
        <div className="w-6 h-6 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[#0057E7] flex items-center justify-center shadow-sm">
          <Receipt size={12} />
        </div>
        <div className="w-[1.5px] h-3 bg-slate-300/80" />
        <div className="w-6 h-6 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[#0057E7] flex items-center justify-center shadow-sm">
          <ShieldCheck size={12} />
        </div>
      </div>
    )
  },

  // CARD 05: Purification & Testing Facility (White Theme)
  {
    id: "05",
    number: "05",
    badge: {
      label: "SLS 614 CERTIFIED",
      icon: <FlaskConical size={13} />,
      colorClasses: "bg-teal-100 text-teal-700"
    },
    title: ["Purification &", "Testing Facility"],
    description: "Advanced laboratory testing, filtration and purification processes ensuring safe, high-quality drinking water for all.",
    button: {
      bgClass: "bg-[#081B38] hover:bg-[#0c2b59]",
      textClass: "text-white",
      arrowBgClass: "bg-white/15",
      arrowColorClass: "text-white"
    },
    image: "/water_quality_lab.webp",
    theme: "light"
  },

  // CARD 06: Purity & SLS 614 Certification (White Theme)
  {
    id: "06",
    number: "06",
    badge: {
      label: "SERVICE 03",
      icon: <ShieldCheck size={13} />,
      colorClasses: "bg-emerald-100 text-emerald-700"
    },
    title: ["Purity & SLS 614", "Certification"],
    description: "Rigorous multi-stage sand filtration, deep aquifer extraction, and continuous chlorination compliant with National Drinking Water Standards.",
    button: {
      bgClass: "bg-[#00c982] hover:bg-[#00b374]",
      textClass: "text-white",
      arrowBgClass: "bg-white/20",
      arrowColorClass: "text-white"
    },
    image: "/service-water-quality.webp",
    theme: "light"
  }
];

export default function WaterServicesShowcase() {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive slide layout detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute slides array dynamically:
  const slides: ServiceCard[][] = [];
  for (let i = 0; i < allServices.length; i += itemsPerSlide) {
    slides.push(allServices.slice(i, i + itemsPerSlide));
  }
  const totalSlides = Math.max(slides.length, 1);
  const safeSlideIndex = currentSlide % totalSlides;

  // Auto slide every 5 seconds (5000ms) with pause-on-hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleSelectSlide = (index: number) => {
    setDirection(index > safeSlideIndex ? 1 : -1);
    setCurrentSlide(index);
  };

  const currentCards = slides[safeSlideIndex] || slides[0] || [];

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slideshow Display Area with Smooth Animation & Touch Swipe */}
      <div className="relative overflow-hidden min-h-[330px] sm:min-h-[340px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${safeSlideIndex}-${itemsPerSlide}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.55, ease: smoothEase }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) {
                handlePrev();
              } else if (info.offset.x < -50) {
                handleNext();
              }
            }}
            className={`grid gap-5 sm:gap-6 lg:gap-7 ${
              itemsPerSlide === 1
                ? "grid-cols-1 max-w-lg mx-auto"
                : itemsPerSlide === 2
                ? "grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentCards.map((card) => {
              const isDark = card.theme === "dark";

              return (
                <div
                  key={card.id}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 min-h-[320px] sm:min-h-[330px] flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 ${
                    isDark
                      ? "border-white/10 shadow-[0_20px_50px_rgba(7,23,46,0.25)] bg-[#07172e]"
                      : "border-slate-200/90 shadow-[0_20px_50px_rgba(8,27,56,0.08)] bg-white"
                  }`}
                >
                  {/* Right Photographic Background (~50-55% width) */}
                  <div className="absolute inset-y-0 right-0 w-[55%] sm:w-[50%] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title.join(" ")}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Gradient blend to text area */}
                    {isDark ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#07172e] via-[#07172e]/85 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07172e]/80 via-transparent to-transparent" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                      </>
                    )}

                    {/* Extra Visual if present (Wi-Fi wave, Floating pills, etc.) */}
                    {card.extraVisual}
                  </div>

                  {/* Left Content Area (~65-75% width for readability) */}
                  <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between h-full max-w-[78%] sm:max-w-[65%] space-y-4">
                    <div className="space-y-3">
                      {/* Top Marker: e.g. 01 ── */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-bold tracking-wider ${
                            isDark ? "text-slate-400" : "text-slate-400"
                          }`}
                        >
                          {card.number}
                        </span>
                        <span
                          className={`w-7 h-[1.5px] ${
                            isDark ? "bg-slate-500/60" : "bg-slate-300"
                          }`}
                        />
                      </div>

                      {/* Badge Pill with Icon */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 ${card.badge.colorClasses}`}
                        >
                          {card.badge.icon}
                        </div>
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase ${
                            isDark ? "text-slate-200" : "text-slate-700"
                          }`}
                        >
                          {card.badge.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-lg sm:text-[22px] font-extrabold tracking-tight leading-[1.2] ${
                          isDark ? "text-white" : "text-[#081B38]"
                        }`}
                      >
                        {card.title.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed font-normal line-clamp-3 sm:line-clamp-none ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {card.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link
                        href="/pay"
                        className={`inline-flex items-center gap-2 sm:gap-2.5 pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${card.button.bgClass} ${card.button.textClass}`}
                      >
                        <span>Explore Service</span>
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 ${card.button.arrowBgClass} ${card.button.arrowColorClass}`}
                        >
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slideshow Bottom Navigation Controls & 5-Second Auto-Slide Indicators */}
      <div className="flex items-center justify-between pt-6 px-1 flex-wrap gap-3">
        {/* Slide Pagination Tabs with Labels */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {itemsPerSlide === 1 ? (
            // Mobile: 6 Sleek Numbered Indicator Pills
            <div className="flex items-center gap-1.5">
              {slides.map((_, index) => {
                const isActive = safeSlideIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                    className={`h-7 px-2.5 rounded-full text-[11px] font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? "bg-[#081B38] text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <span>0{index + 1}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            // Desktop & Tablet: Full descriptive tabs with progress hairlines
            slides.map((_, index) => {
              const isActive = safeSlideIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectSlide(index)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 overflow-hidden ${
                    isActive
                      ? "bg-[#081B38] text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-cyan-400 animate-pulse" : "bg-slate-400"
                    }`}
                  />
                  <span>
                    {itemsPerSlide === 3
                      ? index === 0
                        ? "Services 01 – 03"
                        : "Services 04 – 06"
                      : `Part 0${index + 1}`}
                  </span>

                  {/* Animated 5s Progress Bar when active and not paused */}
                  {isActive && !isPaused && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-[2px] bg-cyan-400 rounded-full"
                    />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Prev / Next Chevrons & Pause Indicator */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Pause / Playing Micro-Indicator */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-mono font-medium"
            title={isPaused ? "Slideshow paused on hover" : "Auto-sliding every 5 seconds"}
          >
            {isPaused ? (
              <>
                <Pause size={10} className="text-amber-500" />
                <span>Paused</span>
              </>
            ) : (
              <>
                <Play size={10} className="text-emerald-500 fill-emerald-500" />
                <span>Auto (5s)</span>
              </>
            )}
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous services slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-[#081B38] hover:bg-[#081B38] hover:text-white hover:border-[#081B38] flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next services slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-[#081B38] hover:bg-[#081B38] hover:text-white hover:border-[#081B38] flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
