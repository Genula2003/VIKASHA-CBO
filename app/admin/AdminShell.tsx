'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Sliders,
  FileText,
  CreditCard,
  LogOut,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  AlertOctagon,
  Menu,
  X,
  MessageSquare
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Consumers', href: '/admin/consumers', icon: Users },
  { name: 'Meter Readers', href: '/admin/meter-readers', icon: Briefcase },
  { name: 'Billing Rules', href: '/admin/billing-rules', icon: Sliders },
  { name: 'Bills & Invoices', href: '/admin/bills', icon: FileText },
  { name: 'Arrears & Red Notices', href: '/admin/arrears', icon: AlertOctagon },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
]

interface AdminShellProps {
  profile: { name?: string; email?: string } | null
  smsStatus?: { success?: boolean; balance?: number }
  children: React.ReactNode
}

export function AdminShell({ profile, smsStatus, children }: AdminShellProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Top Branding */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <Link 
            href="/admin/dashboard" 
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
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/20">
                  CBO
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-400">Magammana Water Project</p>
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

        {/* Navigation Items */}
        <nav className="p-3.5 sm:p-4 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Administrative Modules
          </div>

          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20 translate-x-1'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={isActive ? 'text-white' : 'text-gray-400'} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-blue-200" />}
              </Link>
            )
          })}

          <div className="pt-3 mt-3 border-t border-white/10">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Public Portal
            </div>
            <Link
              href="/pay"
              target="_blank"
              onClick={onNavigate}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <CreditCard size={17} className="text-cyan-400" />
                <span>Consumer Quick Pay</span>
              </div>
              <ExternalLink size={13} className="text-gray-500" />
            </Link>
          </div>
        </nav>
      </div>

      {/* User Profile & Sign Out Bar */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
              {profile?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{profile?.name || 'Administrator'}</p>
              <p className="text-[10px] text-gray-400 truncate">{profile?.email || 'System Authority'}</p>
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
      <aside className="hidden lg:flex w-64 bg-[#0B132B] text-white flex-col justify-between shrink-0 border-r border-gray-800 selection:bg-[#0066FF] selection:text-white">
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

            <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-[11px] font-bold border border-emerald-200/60 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>NWSDB Gateway &bull; Live</span>
            </div>

            <span className="hidden md:inline-block text-xs font-semibold text-gray-400 truncate">
              Kaduwela &amp; Magammana Regional Authority
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold text-gray-500 shrink-0">
            {smsStatus?.success && typeof smsStatus.balance === 'number' && (
              <div 
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#004EEB] text-[11px] font-semibold border border-blue-200/60"
                title="Notify.lk SMS Gateway Balance"
              >
                <MessageSquare size={12} className="text-[#004EEB]" />
                <span>SMS: {smsStatus.balance}</span>
              </div>
            )}
            <div className="hidden md:flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#0066FF]" />
              <span>TLS 1.3</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="text-gray-700 font-bold truncate max-w-[120px] sm:max-w-none">
              {profile?.name || 'Admin'}
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

