'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Sliders,
  FileText,
  CreditCard,
  LogOut,
  Droplet,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  AlertOctagon
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

export function AdminSidebar({ profile }: { profile: { name?: string; email?: string } | null }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0B132B] text-white flex flex-col justify-between shrink-0 border-r border-gray-800 selection:bg-[#0066FF] selection:text-white">
      {/* Top Branding */}
      <div>
        <div className="p-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0088FF] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Droplet size={22} strokeWidth={2.5} />
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
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Administrative Modules
          </div>

          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
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

          <div className="pt-4 mt-4 border-t border-white/10">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Public Portal
            </div>
            <Link
              href="/pay"
              target="_blank"
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

      {/* User Footer Profile */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
              {profile?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{profile?.name || 'Administrator'}</p>
              <p className="text-[10px] text-gray-400 truncate flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-400" /> Executive Admin
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
