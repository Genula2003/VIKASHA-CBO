"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface PageLoaderProps {
  onComplete?: () => void;
  minDuration?: number; // default fast & silky 850ms
}

export default function PageLoader({ onComplete, minDuration = 850 }: PageLoaderProps) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          key="white-theme-landing-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 0.5, ease: smoothEase },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white text-[#081B38] overflow-hidden select-none"
        >
          {/* Subtle Ambient Aquatic Glow (Light Theme) */}
          <div className="absolute w-96 h-96 rounded-full bg-blue-400/10 blur-[120px] pointer-events-none -top-10 -left-10" />
          <div className="absolute w-96 h-96 rounded-full bg-cyan-400/15 blur-[120px] pointer-events-none -bottom-10 -right-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.03),transparent_70%)] pointer-events-none" />

          {/* Animated Glowing Logo Card */}
          <div className="relative z-10 flex items-center justify-center mb-6">
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                boxShadow: [
                  "0 10px 30px rgba(0,102,255,0.08)",
                  "0 15px 40px rgba(0,102,255,0.18)",
                  "0 10px 30px rgba(0,102,255,0.08)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-24 h-24 rounded-3xl bg-white border border-slate-200/90 p-3.5 flex items-center justify-center overflow-hidden"
            >
              <img
                src="/logo.webp"
                alt="Vikasha CBO Official Logo"
                width={72}
                height={72}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Clean Typography in Sovereign Navy & Civic Blue */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="text-center space-y-1.5 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0066FF] text-[10px] font-mono font-bold tracking-widest uppercase mb-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
              COMMUNITY WATER SCHEME
            </div>
            <h1 className="text-2xl font-black tracking-widest text-[#081B38] uppercase font-serif">
              VIKASHA <span className="text-[#0066FF]">CBO</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-mono tracking-[0.25em] uppercase font-medium">
              Magammana Water Portal
            </p>
          </motion.div>

          {/* Slim Sleek Liquid Aquatic Progress Bar */}
          <div className="w-44 h-1.5 bg-slate-100 border border-slate-200/80 rounded-full overflow-hidden mt-7 z-10 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0066FF] via-cyan-400 to-[#004EEB] shadow-[0_0_12px_rgba(0,102,255,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: minDuration / 1000, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
