"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, ShieldCheck, ArrowRight, X, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PillarItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  studioImage: string;
  realPhoto: string;
  location: string;
  metric: string;
  specs: string[];
  description: string;
  badge?: string;
  isCenter?: boolean;
}

const pillars: PillarItem[] = [
  {
    id: "filtration",
    name: "FILTRATION WORKS",
    subtitle: "The SLS 614 certified multi-stage silica and chlorine purification works",
    category: "WATER PURIFICATION",
    studioImage: "/showcase-filtration.jpg",
    realPhoto: "/gov-water-purification.jpg",
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
    id: "reservoir",
    name: "MAGAMMANA RESERVOIR",
    subtitle: "The reinforced elevated gravity storage ensuring 24/7 continuous water pressure",
    category: "GRAVITY STORAGE",
    badge: "PRIMARY HUB",
    isCenter: true,
    studioImage: "/showcase-reservoir.jpg",
    realPhoto: "/water_reservoir_hero.jpg",
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
    id: "telemetry",
    name: "SMART TELEMETRY",
    subtitle: "The advanced optical meter telemetry with instant real-time audit ledger reconciliation",
    category: "DIGITAL GRID",
    studioImage: "/showcase-telemetry.jpg",
    realPhoto: "/card-smart-meter.jpg",
    location: "Sector-Wide Metering Infrastructure",
    metric: "100% Audited Ledger • Zero Delay",
    description: "Optical mobile smart meter reading app equipped with digital timestamping, automated slab tariff calculations, photographic proof of reading, and zero-convenience-fee online bill settlement.",
    specs: [
      "Precision optical reader with photographic verification",
      "Automated tier-based tariff calculation per NWSDB guidelines",
      "Instantaneous online ledger settlement via LankaQR / Cards",
      "Transparent monthly billing history with SMS telemetry"
    ]
  }
];

export default function ImageSlideshow() {
  const [selectedPillar, setSelectedPillar] = useState<PillarItem | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] relative z-10 border-t border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Eyebrow Badge */}
        <div className="flex items-center justify-center gap-2 mb-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#081B38] text-[11px] font-mono font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-[#0066FF]" />
            <span>CORE INFRASTRUCTURE &bull; යටිතල පහසුකම් ත්‍රිත්වය</span>
          </div>
        </div>

        {/* Centered Master Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#081B38] tracking-tight text-center leading-[1.2] max-w-4xl mx-auto px-4 font-serif">
          Engineering Resilient Water Infrastructure
          <br className="hidden sm:inline" />
          {" "}For Community Generations
        </h2>

        {/* Centered Subtitle */}
        <p className="text-slate-600 text-xs sm:text-sm text-center max-w-2xl mx-auto mt-3.5 px-6 leading-relaxed font-normal">
          Explore the physical engineering, advanced filtration systems, elevated community storage, and optical telemetry grids powering Magammana&apos;s 24/7 drinking water supply.
        </p>

        {/* 3-Card Organized Showcase (Framery Design Paradigm) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-6xl mx-auto mt-12 sm:mt-16 px-2">
          {pillars.map((pillar) => {
            const isCenter = pillar.isCenter;

            return (
              <div
                key={pillar.id}
                className={`flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group select-none ${
                  isCenter
                    ? "rounded-[36px] sm:rounded-[42px] bg-[#F5ECE1] border border-[#EBDDCF] p-8 sm:p-12 md:py-16 md:-my-6 shadow-xl md:shadow-2xl z-10 hover:shadow-2xl"
                    : "rounded-[32px] sm:rounded-[38px] bg-[#FAF5EE] border border-[#F0E8DC] p-8 sm:p-10 hover:shadow-xl shadow-sm z-0"
                }`}
              >
                {/* Top Highlight Badge for Center Card */}
                {pillar.badge && (
                  <span className="absolute top-4 sm:top-5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-mono font-bold tracking-wider text-[#081B38] uppercase border border-white/60 shadow-xs">
                    {pillar.badge}
                  </span>
                )}

                {/* Staged Circular Background Disk & Clean Product Visual */}
                <div
                  className={`rounded-full flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105 ${
                    isCenter
                      ? "w-56 h-56 sm:w-64 sm:h-64 bg-[#E8DDD0] mb-8 mt-2"
                      : "w-48 h-48 sm:w-52 sm:h-52 bg-[#EFE6DC] mb-6 mt-1"
                  }`}
                >
                  <img
                    src={pillar.studioImage}
                    alt={pillar.name}
                    className={`object-contain mix-blend-multiply relative z-10 transition-transform duration-500 group-hover:scale-105 ${
                      isCenter
                        ? "w-56 h-56 sm:w-64 sm:h-64"
                        : "w-48 h-44 sm:w-52 sm:h-48"
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Title (Bold, Uppercase, Clean Modern Letter-Spacing) */}
                <h3
                  className={`font-bold tracking-[0.14em] uppercase text-[#1B1B1B] font-sans ${
                    isCenter ? "text-base sm:text-lg" : "text-sm sm:text-base"
                  }`}
                >
                  {pillar.name}
                </h3>

                {/* Subtitle / Descriptive Copy */}
                <p
                  className={`text-[#666666] leading-relaxed font-normal ${
                    isCenter
                      ? "text-xs sm:text-sm max-w-[260px] mt-2.5 mb-8"
                      : "text-xs sm:text-[13px] max-w-[240px] mt-2 mb-7"
                  }`}
                >
                  {pillar.subtitle}
                </p>

                {/* Framery-Style Sleek Dark Pill Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPillar(pillar)}
                  className={`rounded-full bg-black hover:bg-neutral-800 text-white inline-flex items-center gap-2 transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer font-sans ${
                    isCenter
                      ? "text-xs sm:text-sm font-semibold px-8 py-3.5"
                      : "text-xs font-medium px-7 py-2.5"
                  }`}
                >
                  <span>Explore</span>
                  <span className="text-sm leading-none">&rarr;</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Detail Modal on "Explore →" Click */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillar(null)}
              className="fixed inset-0 bg-[#081B38]/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header Photo */}
              <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden shrink-0">
                <img
                  src={selectedPillar.realPhoto}
                  alt={selectedPillar.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B38] via-[#081B38]/40 to-transparent" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPillar(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Modal Title & Category */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase border border-white/30 text-cyan-200">
                    {selectedPillar.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif mt-2 tracking-tight">
                    {selectedPillar.name}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mt-1">
                    <MapPin size={13} className="text-cyan-400" />
                    {selectedPillar.location}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                    Engineering Specifications
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {selectedPillar.description}
                  </p>
                </div>

                {/* Specifications Checklist */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 space-y-2.5">
                  <div className="text-xs font-mono font-bold text-[#081B38] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>Technical Architecture &bull; {selectedPillar.metric}</span>
                  </div>
                  <ul className="space-y-2 pt-1 text-xs text-slate-600 font-medium">
                    {selectedPillar.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
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
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-center"
                  >
                    Close Window
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link
                      href="/pay"
                      onClick={() => setSelectedPillar(null)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm text-center inline-flex items-center justify-center gap-1.5"
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
      </AnimatePresence>
    </section>
  );
}
