'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  ClipboardList, 
  FileText, 
  LogOut, 
  Droplet, 
  MapPin, 
  UserCheck, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/meter-reader/dashboard', icon: Home },
  { name: 'Enter Reading', href: '/meter-reader/enter-reading', icon: ClipboardList },
  { name: 'My History', href: '/meter-reader/history', icon: FileText },
]

export function MeterReaderSidebar({ profile }: { profile: { name?: string; email?: string } | null }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0B132B] text-white flex flex-col justify-between shrink-0 border-r border-gray-800">
      <div>
        {/* App Title */}
        <div className="p-6 border-b border-white/10">
          <Link href="/meter-reader/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
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
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Field Operations
          </div>

          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
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
                <MapPin size={10} className="text-cyan-400" /> Assigned Area
              </p>
            </div>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              title="Sign Out"
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
