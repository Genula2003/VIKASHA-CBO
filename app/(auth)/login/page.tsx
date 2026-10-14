'use client'

import { useTransition, useState } from 'react'
import { login } from './actions'
import Link from 'next/link'
import { Droplet, ArrowRight, ShieldCheck, Gauge, Check, User } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleQuickFill = (fillEmail: string, fillPass: string, roleName: string) => {
    setEmail(fillEmail)
    setPassword(fillPass)
    setSelectedRole(roleName)
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    setError(null)
    
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC] py-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/login-bg.jpg" 
          alt="Login Background" 
          className="w-full h-full object-cover"
        />
        {/* Deep navy blue gradient overlay */}
        <div className="absolute inset-0 bg-[#0B132B]/75 backdrop-blur-[2px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg mx-auto px-6"
      >
        <div className="rounded-[32px] bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset]">
          
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] text-white p-3.5 rounded-2xl shadow-lg shadow-[#0B132B]/20 mb-5">
              <Droplet size={28} strokeWidth={2.5} className="text-[#0066FF]" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Vikasha CBO Portal
            </h2>
            <p className="text-sm text-gray-300 font-medium">
              Magammana Community Water Management &bull; Staff Login
            </p>
          </div>

          {/* Quick Demo Fill Options */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Quick Demo Logins
              </span>
              <span className="text-[11px] text-[#0088FF] font-semibold">
                Click to auto-fill
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@example.com', 'admin123', 'admin')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-[#0066FF]/30 border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.4)]'
                    : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#0088FF] flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Admin</div>
                  <div className="text-[10px] text-gray-400 truncate">admin@example.com</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('reader@example.com', 'reader123', 'reader')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === 'reader'
                    ? 'bg-emerald-500/30 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Gauge size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Meter Reader</div>
                  <div className="text-[10px] text-gray-400 truncate">reader@example.com</div>
                </div>
              </button>
            </div>

            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => handleQuickFill('support@vikashacbo.com', 'admin123', 'support')}
                className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                  selectedRole === 'support'
                    ? 'bg-[#0066FF]/30 border-[#0066FF] text-white'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                    <User size={13} />
                  </div>
                  <span className="text-xs font-medium truncate">support@vikashacbo.com (Admin)</span>
                </div>
                <span className="text-[11px] text-gray-400 font-mono shrink-0">Pass: admin123</span>
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white/15 transition-all text-sm"
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white/15 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-xl bg-red-500/20 border border-red-500/40 p-3.5 text-red-200 text-xs font-medium space-y-1"
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>Sign-in issue:</span>
                </div>
                <div>{error}</div>
                {error.includes('database') || error.includes('Invalid login') || error.includes('schema') ? (
                  <p className="text-gray-300 text-[11px] pt-1 border-t border-red-500/30">
                    💡 If this is a fresh Supabase project, execute <span className="font-mono text-white bg-black/30 px-1 py-0.5 rounded">supabase/setup_complete.sql</span> in your Supabase SQL Editor.
                  </p>
                ) : null}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="group mt-2 relative flex w-full justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0088FF] py-3.5 px-4 text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_24px_-4px_rgba(0,102,255,0.5)] transition-all disabled:opacity-50 hover:-translate-y-0.5"
            >
              {isPending ? 'Authenticating...' : 'Sign In'}
              {!isPending && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs font-medium text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
              <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to main site
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
