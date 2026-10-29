'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  ClipboardList, 
  FileText, 
  LogOut, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/meter-reader/dashboard', icon: Home },
  { name: 'Enter Reading', href: '/meter-reader/enter-reading', icon: ClipboardList },
  { name: 'My History', href: '/meter-reader/history', icon: FileText },
]

interface MeterReaderShellProps {
  profile: { name?: string; email?: string; assigned_area?: string } | null
  children: React.ReactNode
}

export function MeterReaderShell({ profile, children }: MeterReaderShellProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* App Title */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <Link 
            href="/meter-reader/dashboard" 
            onClick={onNavigate}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="Vikasha CBO Official Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                Vikasha CBO
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/20">
                  FIELD
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-400">Field Officer Terminal</p>
            </div>
          </Link>

          {onNavigate && (
            <button
              type="button"
              onClick={onNavigate}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/10 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="p-3.5 sm:p-4 space-y-1.5">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Field Operations
          </div>

          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-[#0066FF] text-white shadow-md shadow-blue-500/20 translate-x-1'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={isActive ? 'text-white' : 'text-gray-400'} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-cyan-200" />}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Profile Bar */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
              {profile?.name?.charAt(0) || 'M'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{profile?.name || 'Meter Reader'}</p>
              <p className="text-[10px] text-gray-400 truncate flex items-center gap-1">
                <MapPin size={10} className="text-cyan-400" /> {profile?.assigned_area || 'Magammana Grid'}
              </p>
            </div>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              title="Sign Out"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0B132B] overflow-hidden">
      
      {/* 1. Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0B132B] text-white flex-col justify-between shrink-0 border-r border-gray-800">
        <NavContent />
      </aside>

      {/* 2. Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-out Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="relative w-72 max-w-[85vw] bg-[#0B132B] text-white flex flex-col justify-between shrink-0 border-r border-gray-800 z-10 shadow-2xl h-full"
            >
              <NavContent onNavigate={() => setMobileMenuOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-14 sm:h-15 bg-white border-b border-gray-200/80 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Hamburger Button on Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0B132B] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[10px] sm:text-[11px] font-bold border border-cyan-200/60 shrink-0">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>Field Terminal &bull; Active</span>
            </div>

            {profile?.assigned_area && (
              <span className="hidden sm:inline-block text-xs font-semibold text-gray-400 truncate">
                Route: {profile.assigned_area}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold text-gray-500 shrink-0">
            <div className="hidden md:flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#0066FF]" />
              <span>Offline Sync</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="text-gray-700 font-bold truncate max-w-[120px] sm:max-w-none">
              {profile?.name || 'Reader'}
            </div>
          </div>
        </header>

        {/* Scrollable Page Body with Responsive Padding */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  )
}

