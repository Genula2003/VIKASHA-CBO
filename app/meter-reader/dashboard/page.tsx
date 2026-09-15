import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, ClipboardList } from 'lucide-react'
import Link from 'next/link'

export default async function MeterReaderDashboard() {
  const supabase = await createClient()

  // Fetch some basic stats for the reader
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('name').eq('id', user?.id).single()

  // We will calculate these properly later
  const todayReadingsCount = 0
  const monthReadingsCount = 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome, {profile?.name || 'Reader'}</h1>
        <p className="text-sm text-gray-500 mt-1">Here is your reading summary.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Readings</CardTitle>
            <ClipboardList className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayReadingsCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle>
            <FileText className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthReadingsCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <Link href="/meter-reader/enter-reading" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Enter Meter Reading
        </Link>
        <Link href="/meter-reader/history" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          My Reading History
        </Link>
      </div>
    </div>
  )
}
