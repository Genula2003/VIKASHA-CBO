"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface PageLoaderProps {
  onComplete?: () => void;
  minDuration?: number; // default fast & simple 850ms
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
          key="simple-page-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 0.55, ease: smoothEase }
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#021832] text-white overflow-hidden select-none"
        >
          {/* Subtle Ambient Aquatic Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none" />

          {/* Simple Animated Glowing Droplet */}
          <div className="relative z-10 flex items-center justify-center mb-5">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#032a56] via-[#0284c7] to-[#38bdf8] p-0.5 shadow-[0_0_30px_rgba(56,189,248,0.45)] flex items-center justify-center"
            >
              <div className="w-full h-full rounded-[14px] bg-[#031d3d] flex items-center justify-center text-cyan-300">
                <Droplet size={28} className="fill-cyan-400/30 text-cyan-300" />
              </div>
            </motion.div>
          </div>

          {/* Clean Typography */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="text-center space-y-1 z-10"
          >
            <h1 className="text-xl font-extrabold tracking-widest text-white uppercase">
              VIKASHA <span className="text-cyan-400">CBO</span>
            </h1>
            <p className="text-[10px] text-cyan-200/70 font-mono tracking-[0.25em] uppercase">
              Magammana Water Portal
            </p>
          </motion.div>

          {/* Slim Sleek Liquid Progress Bar */}
          <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden mt-6 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
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
