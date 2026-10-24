"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  CreditCard
} from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee seamless muted autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Clean, Pure Auto-Playing Video Showcase Frame */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: smoothEase }}
        className="relative rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(2,24,50,0.14)] border border-slate-200/90 bg-[#021832] aspect-[16/9] max-h-[580px] w-full"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src="/Water_supply_commercial_concept_1080p_20261015003757.mp4" type="video/mp4" />
          <source src="/video.mp4" type="video/mp4" />
          <source src="/water_services.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* 3 Human-Crafted Frosted Infrastructure Status Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
          className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-blue-300 hover:shadow-[0_12px_28px_rgba(8,27,56,0.08)] flex items-center gap-3.5 transition-all duration-300 group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/80 text-[#0057E7] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-[#0057E7] group-hover:text-white transition-all duration-300">
            <Droplets size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#081B38] block tracking-tight">Automated Filtration</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium truncate block">
              Multi-stage sand filtration &amp; chlorination
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
          className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-cyan-300 hover:shadow-[0_12px_28px_rgba(8,27,56,0.08)] flex items-center gap-3.5 transition-all duration-300 group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200/80 text-cyan-700 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
            <CreditCard size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#081B38] block tracking-tight">Instant E-Billing</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0057E7]" />
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium truncate block">
              Instant zero-fee settlement via card or LankaQR
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
          className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-emerald-300 hover:shadow-[0_12px_28px_rgba(8,27,56,0.08)] flex items-center gap-3.5 transition-all duration-300 group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/80 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#081B38] block tracking-tight">SLS 614 Certified</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium truncate block">
              100% compliant drinking water standards
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
