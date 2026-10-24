"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Mail,
  Search,
  User,
  CreditCard,
  Menu,
  X,
  Globe,
  ChevronDown,
  Check
} from "lucide-react";

interface NavbarProps {
  activeTab?: "home" | "services" | "billing" | "support" | "about";
}

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function Navbar({ activeTab = "home" }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchAccount, setSearchAccount] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"EN" | "SI">("EN");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for sticky locked navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (tab: "home" | "services" | "billing" | "support" | "about", href: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push("/" + href);
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      router.push(href);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAccount.trim()) {
      router.push(`/pay?acc=${encodeURIComponent(searchAccount.trim())}`);
      setIsSearchOpen(false);
    } else {
      router.push("/pay");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col w-full">

      {/* ===================================================================== */}
      {/* 1. TOP UTILITY BAR (NAVY DARK BLUE & SILVER THEME) */}
      {/* ===================================================================== */}
      <div
        className={`bg-[#081B38] text-slate-300 text-[11px] sm:text-xs transition-all duration-300 border-b border-white/10 ${
          isScrolled ? "hidden" : "block"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between flex-wrap gap-2">
          {/* Left: Operating Hours & Location */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-300">
              <Calendar size={13} className="text-slate-300" />
              <span>Monday - Friday: 8:00 AM - 5:00 PM</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-slate-300" />
              <span>Magammana, Homagama, Sri Lanka</span>
            </span>
          </div>

          {/* Right: Email & Social Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="mailto:support@vikashacbo.com"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-slate-300"
            >
              <Mail size={13} className="text-slate-300" />
              <span>support@vikashacbo.com</span>
            </a>

            {/* Silver Social Icons */}
            <div className="hidden sm:flex items-center gap-3 text-slate-400">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. FROSTED GLASS MAIN NAVBAR (WHITE MAIN, NAVY DARK BLUE & SILVER) */}
      {/* ===================================================================== */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/92 backdrop-blur-2xl border-b border-slate-200/90 shadow-[0_10px_30px_rgba(8,27,56,0.08)]"
            : "bg-white/80 backdrop-blur-2xl border-b border-white/70 shadow-[0_4px_25px_rgba(8,27,56,0.05)]"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">

          {/* LEFT: Logo in Navy Dark Blue & Silver */}
          <Link
            href="/"
            onClick={() => setCurrentTab("home")}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
              <img
                src="/logo.webp"
                alt="Vikasha CBO Official Logo"
                width={40}
                height={40}
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#081B38] leading-none group-hover:text-[#0B2548] transition-colors">
                Vikasha
              </span>
              <span className="font-sans text-[8.5px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-slate-500 leading-none mt-0.5 sm:mt-1">
                CBO &bull; WATER UTILITY
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links in Navy Dark Blue & Silver */}
          <nav className="hidden lg:flex items-center gap-2 text-[14px] font-semibold text-[#081B38]">
            <button
              type="button"
              onClick={() => handleNavClick("about", "#about")}
              className="px-3.5 py-1.5 rounded-lg hover:bg-slate-100/70 hover:text-[#081B38] text-[#081B38] transition-all cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("services", "#services")}
              className="px-3.5 py-1.5 rounded-lg hover:bg-slate-100/70 hover:text-[#081B38] text-[#081B38] transition-all cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("billing", "/pay")}
              className="px-3.5 py-1.5 rounded-lg hover:bg-slate-100/70 hover:text-[#081B38] text-[#081B38] transition-all cursor-pointer"
            >
              Billing &amp; Payments
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("about", "#about")}
              className="px-3.5 py-1.5 rounded-lg hover:bg-slate-100/70 hover:text-[#081B38] text-[#081B38] transition-all cursor-pointer"
            >
              Governance
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("support", "#leaks")}
              className="px-3.5 py-1.5 rounded-lg hover:bg-slate-100/70 hover:text-[#081B38] text-[#081B38] transition-all cursor-pointer"
            >
              Customer Support
            </button>
          </nav>

          {/* RIGHT: Navy Dark Blue CTA Button + Frosted Glass Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

            {/* Language Toggle (EN / SI) in Frosted Glass */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/90 bg-white/70 backdrop-blur-md text-[#081B38] text-xs font-semibold hover:bg-white hover:border-slate-300 transition-all cursor-pointer shadow-sm"
              >
                <Globe size={13} className="text-[#081B38]" />
                <span className="font-mono text-[11px]">{currentLang}</span>
                <ChevronDown size={11} className={`text-slate-400 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-slate-200 p-1.5 shadow-xl z-50 text-xs font-medium space-y-1"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentLang("EN");
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                        currentLang === "EN" ? "bg-[#081B38]/10 text-[#081B38] font-bold" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>English</span>
                      {currentLang === "EN" && <Check size={13} className="text-[#081B38]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentLang("SI");
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                        currentLang === "SI" ? "bg-[#081B38]/10 text-[#081B38] font-bold" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>සිංහල (SI)</span>
                      {currentLang === "SI" && <Check size={13} className="text-[#081B38]" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Bill Search Icon in Frosted Glass */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-slate-200/90 bg-white/70 backdrop-blur-md hover:bg-white flex items-center justify-center text-[#081B38] transition-all cursor-pointer shadow-sm"
              title="Search Account / Quick Bill"
              aria-label="Search Account"
            >
              <Search size={15} />
            </button>

            {/* Staff Login Link */}
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#081B38] hover:text-[#004EEB] text-xs font-semibold hover:bg-slate-100/60 transition-colors"
            >
              <User size={14} className="text-slate-500" />
              <span>Login</span>
            </Link>

            {/* CTA Button: Mobile Responsive text & padding */}
            <Link
              href="/pay"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#081B38] hover:bg-[#0B2548] text-white text-[11px] sm:text-[13px] font-bold shadow-sm border border-slate-300/40 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <CreditCard size={14} className="text-slate-200" />
              <span className="hidden sm:inline">Pay Water Bill</span>
              <span className="sm:hidden">Pay Bill</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[#081B38] active:scale-95 transition-transform cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>

        </div>
      </div>

      {/* Account Number Search Popup */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white/95 backdrop-blur-xl border-b border-slate-200 p-3 shadow-xl"
          >
            <div className="max-w-xl mx-auto px-2">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchAccount}
                    onChange={(e) => setSearchAccount(e.target.value)}
                    placeholder="Enter Account Number (e.g. 135)..."
                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#081B38]"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 sm:px-5 rounded-lg bg-[#081B38] hover:bg-[#0B2548] text-white font-bold text-xs transition-colors cursor-pointer border border-slate-300/30 shrink-0"
                >
                  Search
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-5 py-5 space-y-4 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <nav className="flex flex-col space-y-1 text-sm font-semibold text-[#081B38]">
              <button
                type="button"
                onClick={() => handleNavClick("about", "#about")}
                className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-100 flex items-center justify-between border-b border-slate-100"
              >
                <span>About</span>
                <span className="text-slate-400 text-xs font-normal">Magammana CBO</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("services", "#services")}
                className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-100 flex items-center justify-between border-b border-slate-100"
              >
                <span>Services</span>
                <span className="text-slate-400 text-xs font-normal">Water Supply</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("billing", "/pay")}
                className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-100 flex items-center justify-between border-b border-slate-100"
              >
                <span>Billing &amp; Payments</span>
                <span className="text-cyan-600 text-xs font-mono font-bold">Quick Pay</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("about", "#governance")}
                className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-100 flex items-center justify-between border-b border-slate-100"
              >
                <span>Governance</span>
                <span className="text-slate-400 text-xs font-normal">DCWS Regulated</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("support", "#leaks")}
                className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-100 flex items-center justify-between border-b border-slate-100"
              >
                <span>Customer Support</span>
                <span className="text-amber-600 text-xs font-semibold">Report Leaks</span>
              </button>
            </nav>

            {/* Mobile Drawer Actions & Utilities */}
            <div className="pt-2 space-y-3 border-t border-slate-100">
              {/* Pay Water Bill Primary Button */}
              <Link
                href="/pay"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#081B38] hover:bg-[#0B2548] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <CreditCard size={15} />
                <span>Pay Water Bill Online</span>
              </Link>

              {/* Language Selector in Mobile Drawer */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Globe size={14} className="text-[#081B38]" />
                  <span>Language / භාෂාව</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentLang("EN")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                      currentLang === "EN" ? "bg-[#081B38] text-white" : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentLang("SI")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                      currentLang === "SI" ? "bg-[#081B38] text-white" : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    සිංහල
                  </button>
                </div>
              </div>

              {/* Staff Portal & Hotline Quick Access */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 bg-white text-[#081B38] font-semibold hover:bg-slate-50"
                >
                  <User size={13} className="text-slate-500" />
                  <span>Staff Login</span>
                </Link>

                <a
                  href="tel:0112894567"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Hotline: 011 289</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
