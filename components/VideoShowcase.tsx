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

      {/* 3 Matching Service Feature Badges Below Video */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0284c7] flex items-center justify-center shrink-0">
            <Droplets size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">Automated Filtration</span>
            <span className="text-[11px] text-slate-500">Rapid sand filtration &amp; chlorination</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
            <CreditCard size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">Instant E-Billing</span>
            <span className="text-[11px] text-slate-500">Pay anytime via card or LankaQR</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">SLS 614 Certified</span>
            <span className="text-[11px] text-slate-500">Daily lab tested drinking quality</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
