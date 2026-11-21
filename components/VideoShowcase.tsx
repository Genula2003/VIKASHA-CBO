"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

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
    <div className="w-full">
      {/* Clean, Pure Auto-Playing Video Showcase Frame */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: smoothEase }}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(2,24,50,0.14)] border border-slate-200/90 bg-[#021832] aspect-[16/9] max-h-[580px] w-full"
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
    </div>
  );
}
