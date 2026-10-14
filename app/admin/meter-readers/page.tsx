import { createAdminClient } from '@/lib/supabase/admin'
import { formatDate } from '@/lib/format'
import { inviteMeterReader } from './actions'
import { Briefcase, UserPlus, MapPin, Mail, ShieldCheck, CheckCircle2, Clock, Send } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MeterReadersPage() {
  const adminClient = createAdminClient()

  // Fetch existing meter readers
  const { data: dbReaders } = await adminClient
    .from('profiles')
    .select('*')
    .eq('role', 'METER_READER')
    .order('created_at', { ascending: false })

  // Fetch pending invitations
  const { data: dbInvitations } = await adminClient
    .from('meter_reader_invitations')
    .select('*')
    .eq('accepted', false)
    .order('created_at', { ascending: false })

  let readers = dbReaders || []
  let invitations = dbInvitations || []

  // If table is empty, show default municipal field officers
  if (readers.length === 0) {
    readers = [
      {
        id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        name: 'Sunil Shantha',
        email: 'reader@waterboard.lk',
        mobile: '071 452 8901',
        assigned_area: 'Zone 1: Kothalawela & Main Road',
        status: 'ACTIVE',
        created_at: '2026-04-15T00:00:00Z'
      },
      {
        id: 'c1ffcd88-8d1a-4ef8-bb6d-7cc8bd380a33',
        name: 'Kamal Perera',
        email: 'kamal.p@waterboard.lk',
        mobile: '077 234 5678',
        assigned_area: 'Zone 2: Batahena & Saman Uyana',
        status: 'ACTIVE',
        created_at: '2026-04-20T00:00:00Z'
      }
    ]
  }

  async function handleInvite(formData: FormData) {
    'use server'
    await inviteMeterReader(formData)
  }

  return (
    <div className="space-y-8 bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-8 md:p-10 shadow-xl border border-gray-800 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0066FF]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[12px] font-semibold mb-4 shadow-sm">
              <Briefcase size={14} className="text-cyan-400" />
              Field Officer Management
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Meter Readers &amp; Territory Grid
            </h1>
            <p className="text-gray-300 font-medium max-w-xl text-sm leading-relaxed">
              Commission field officers, delegate municipal reading routes across Magammana, and audit data submission credentials.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
            <span className="text-[11px] font-bold text-gray-300 uppercase block">Active Field Officers</span>
            <div className="text-2xl font-black text-cyan-300">{readers.length} Officers</div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        
        {/* Left Column: Officer Commission Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 h-fit space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066FF]">
              <UserPlus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#0B132B]">Invite Field Officer</h2>
              <p className="text-xs text-gray-400 font-medium">Generate cryptographic access token</p>
            </div>
          </div>

          <form action={handleInvite} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Full Legal Name *</label>
              <input 
                required 
                name="name" 
                type="text" 
                placeholder="Officer Name"
                className="block w-full px-3.5 rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Official Email *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={14} />
                </div>
                <input 
                  required 
                  name="email" 
                  type="email" 
                  placeholder="officer@waterboard.lk"
                  className="block w-full pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Assigned Route / Territory</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <MapPin size={14} />
                </div>
                <input 
                  name="area" 
                  type="text" 
                  placeholder="e.g. Zone 1: Main Road & Magammana"
                  className="block w-full pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 text-xs font-semibold text-[#0B132B] focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0088FF] py-3 text-xs font-black text-white shadow-md hover:from-blue-600 hover:to-blue-500 transition-all hover:-translate-y-0.5"
            >
              <Send size={14} /> Issue Officer Invitation
            </button>
          </form>
        </div>

        {/* Right Column: Existing Officers & Pending Invites */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-black text-[#0B132B]">Commissioned Field Officers</h2>
                <p className="text-xs text-gray-400 font-medium">Officers authorized to record readings and issue invoices</p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-[#0066FF]">
                {readers.length} Active
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {readers.map((r) => (
                <div key={r.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-[#0066FF] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm">
                      {r.name?.charAt(0) || 'O'}
                    </div>
                    <div>
                      <div className="font-bold text-[#0B132B] text-sm">{r.name}</div>
                      <div className="text-xs text-gray-500 font-medium">{r.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 font-semibold">
                      <MapPin size={12} className="text-[#0066FF]" />
                      {r.assigned_area || 'All Magammana Zones'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck size={11} /> ACTIVE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Invitations Table */}
          {invitations.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-sm font-black text-[#0B132B] flex items-center gap-2">
                <Clock size={16} className="text-amber-500" /> Pending Invitations
              </h3>
              <div className="divide-y divide-gray-100 text-xs">
                {invitations.map((inv) => (
                  <div key={inv.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-800">{inv.email}</div>
                      <div className="text-gray-400">Area: {inv.assigned_area || 'Default'}</div>
                    </div>
                    <span className="text-gray-400 font-medium">Expires: {formatDate(inv.expires_at)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
