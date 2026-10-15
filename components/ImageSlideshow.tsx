"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FocusItem {
  id: number;
  type: "text" | "image";
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
}

const focusItems: FocusItem[] = [
  {
    id: 1,
    type: "image",
    image: "/focus-pipes-gallery.jpg",
    alt: "Industrial Pipe Gallery & Infrastructure"
  },
  {
    id: 2,
    type: "text",
    title: "ENVIRONMENTAL PROTECTION\nWATER SYSTEMS",
    description:
      "We collaborate with conservation groups, land trusts, and remediation firms to develop water systems that protect ecosystems and restore environmental health."
  },
  {
    id: 3,
    type: "image",
    image: "/focus-canal-scenic.jpg",
    alt: "Scenic Water Canal and Mountain Catchment"
  },
  {
    id: 4,
    type: "text",
    title: "GOVERNMENT AGENCY\nWATER SYSTEMS",
    description:
      "We partner with federal, state, and local agencies to build mission-critical water infrastructure that supports growth, national security and resilience."
  },
  {
    id: 5,
    type: "image",
    image: "/card-smart-meter.jpg",
    alt: "Precision Smart Meter Telemetry"
  },
  {
    id: 6,
    type: "text",
    title: "DIGITAL TELEMETRY &\nSMART E-BILLING",
    description:
      "Providing real-time consumption auditing, mobile meter logging, and seamless 24/7 digital payments with zero convenience surcharges for all registered consumers."
  },
  {
    id: 7,
    type: "image",
    image: "/card-water-purity.jpg",
    alt: "SLS 614 Certified Water Quality Testing"
  },
  {
    id: 8,
    type: "text",
    title: "MUNICIPAL UTILITY\nDISTRIBUTION GRIDS",
    description:
      "Engineering robust ring-main pipeline networks and automated pressure telemetry to guarantee uninterrupted supply for over 12,500+ community households."
  }
];

export default function ImageSlideshow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(490);
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
          setGap(16);
        } else if (w < 1024) {
          setCardWidth(380);
          setGap(20);
        } else {
          setCardWidth(490);
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
    <section className="py-16 sm:py-24 bg-[#E5E9EE] relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* White Rounded Main Card Container (Matching Reference Template) */}
        <div className="bg-white rounded-[32px] sm:rounded-[44px] shadow-sm py-14 sm:py-20 relative overflow-hidden border border-slate-200/60">
          
          {/* Centered Eyebrow Badge: Icon + FOCUS AREAS */}
          <div className="flex items-center justify-center gap-2 mb-3.5">
            <svg
              className="w-4 h-4 text-[#081B38]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5-2.1 2.1m-8.8 8.8-2.1 2.1m0-13 2.1 2.1m8.8 8.8 2.1 2.1" />
            </svg>
            <span className="text-xs font-bold tracking-[0.22em] text-[#081B38] uppercase font-mono">
              FOCUS AREAS
            </span>
          </div>

          {/* Centered Master Title (Exact Text from Reference Screenshot) */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#081B38] tracking-tight text-center leading-[1.2] max-w-4xl mx-auto px-4 font-serif">
            Scalable Solutions For Our Corporate
            <br className="hidden sm:inline" />
            {" "}And Government Partners
          </h2>

          {/* Centered Subtitle (Exact Text from Reference Screenshot) */}
          <p className="text-slate-600 text-xs sm:text-sm text-center max-w-2xl mx-auto mt-3.5 px-6 leading-relaxed font-normal">
            We specialize in delivering water infrastructure solutions across key sectors
            where reliable and sustainable water management matters most.
          </p>

          {/* Continuous Infinite Horizontal Carousel Track */}
          <div
            className="relative mt-10 sm:mt-14 overflow-hidden py-3"
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
            <div
              ref={scrollRef}
              className="flex items-center overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none cursor-grab active:cursor-grabbing"
              style={{ gap: `${gap}px` }}
            >
              {displayItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    width: `${cardWidth}px`,
                    height: cardWidth > 400 ? "340px" : "300px"
                  }}
                  className="flex-shrink-0 rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.01]"
                >
                  {item.type === "image" ? (
                    <div className="relative w-full h-full bg-slate-900 group">
                      <img
                        src={item.image}
                        alt={item.alt || "Water Infrastructure"}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#081B38] text-white p-7 sm:p-9 flex flex-col justify-between border border-white/10">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-wider uppercase text-white leading-snug whitespace-pre-line font-sans">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Centered Left & Right Navigation Buttons (Matching Reference Screenshot) */}
          <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-md bg-[#eaedf0] hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-md bg-[#eaedf0] hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
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
