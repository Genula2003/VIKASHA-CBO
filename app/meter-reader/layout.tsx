import Link from 'next/link'
import { Home, FileText, ClipboardList, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/meter-reader/dashboard', icon: Home },
  { name: 'Enter Reading', href: '/meter-reader/enter-reading', icon: ClipboardList },
  { name: 'My History', href: '/meter-reader/history', icon: FileText },
]

export default async function MeterReaderLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('name, email').eq('id', user.id).single()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex w-64 flex-col bg-slate-900">
        <div className="flex h-16 shrink-0 items-center px-6">
          <span className="text-xl font-bold text-white tracking-tight">Meter Reader App</span>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-white" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex shrink-0 bg-slate-800 p-4">
          <div className="group block w-full flex-shrink-0">
            <div className="flex items-center">
              <div>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-600">
                  <span className="text-sm font-medium leading-none text-white">
                    {profile?.name?.charAt(0) || 'M'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{profile?.name}</p>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center mt-1">
                    <LogOut className="h-3 w-3 mr-1" /> Sign Out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
