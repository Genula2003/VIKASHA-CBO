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
  ChevronRight
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
      <div className="relative overflow-hidden min-h-[220px] sm:min-h-[340px]">
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
            className={`grid gap-4 sm:gap-6 lg:gap-7 touch-pan-y ${
              itemsPerSlide === 1
                ? "grid-cols-1 max-w-lg mx-auto"
                : itemsPerSlide === 2
                ? "grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentCards.map((card) => {
              return (
                <div
                  key={card.id}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#071525]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_30px_rgba(0,217,255,0.06)] hover:border-[#00D9FF]/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.75),0_0_40px_rgba(0,217,255,0.2)] transition-all duration-300 min-h-[220px] sm:min-h-[330px] flex flex-col justify-between hover:-translate-y-1.5"
                >
                  {/* Right Photographic Background (~45-50% width) */}
                  <div className="absolute inset-y-0 right-0 w-[45%] sm:w-[50%] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title.join(" ")}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Gradient blend to text area */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#071525] via-[#071525]/90 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/80 via-transparent to-transparent" />

                    {/* Extra Visual if present (Wi-Fi wave, Floating pills, etc.) */}
                    {card.extraVisual}
                  </div>

                  {/* Left Content Area (~76-78% width on mobile, 65% on desktop) */}
                  <div className="relative z-10 p-4 sm:p-7 flex flex-col justify-between h-full max-w-[78%] sm:max-w-[65%] space-y-2 sm:space-y-4">
                    <div className="space-y-1.5 sm:space-y-3">
                      {/* Top Marker & Badge Row */}
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#A8BACB]/70">
                          {card.number}
                        </span>
                        <span className="w-3 sm:w-7 h-[1.5px] bg-white/20" />
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 bg-[#00D9FF]/15 border border-[#00D9FF]/40 text-[#00D9FF]">
                            {card.badge.icon}
                          </div>
                          <span className="text-[9px] sm:text-[11px] font-mono font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase text-white/90">
                            {card.badge.label}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-[22px] font-extrabold tracking-tight leading-[1.18] sm:leading-[1.2] text-white font-sans group-hover:text-[#00D9FF] transition-colors">
                        {card.title.map((line, idx) => (
                          <span key={idx} className="sm:block inline mr-1 sm:mr-0">
                            {line}
                          </span>
                        ))}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] sm:text-[13px] leading-snug sm:leading-relaxed font-normal text-[#A8BACB] line-clamp-2 sm:line-clamp-none">
                        {card.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1 sm:pt-2">
                      <Link
                        href="/pay"
                        className="inline-flex items-center gap-1.5 sm:gap-2.5 pl-3 sm:pl-5 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] bg-[#00D9FF] hover:bg-[#2ae0ff] text-[#071525] shadow-[0_0_15px_rgba(0,217,255,0.25)]"
                      >
                        <span>Explore Service</span>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 bg-[#071525] text-[#00D9FF]">
                          <ArrowRight size={10} className="sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform" />
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

      {/* Slideshow Minimal Navigation (Prev / Next Chevrons without bulky tabs or number pills) */}
      <div className="flex items-center justify-between pt-3.5 sm:pt-6 px-1">
        {/* Sleek Minimal Progress Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, index) => {
            const isActive = safeSlideIndex === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-6 sm:w-8 bg-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.6)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>

        {/* Prev / Next Chevrons */}
        <div className="flex items-center gap-2">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous services slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#071525]/90 border border-white/15 text-white hover:border-[#00D9FF] hover:text-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next services slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#071525]/90 border border-white/15 text-white hover:border-[#00D9FF] hover:text-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
