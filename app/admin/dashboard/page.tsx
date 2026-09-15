import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, IndianRupee, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch some basic stats
  const { count: consumersCount } = await supabase.from('consumers').select('*', { count: 'exact', head: true })
  const { count: billsCount } = await supabase.from('bills').select('*', { count: 'exact', head: true })

  // Mocked some financial data for now (will calculate properly later)
  const totalBilled = 745200
  const totalCollected = 691400

  const stats = [
    { title: 'Total Consumers', value: consumersCount || 0, icon: Users, color: 'text-blue-600' },
    { title: 'Total Bills', value: billsCount || 0, icon: FileText, color: 'text-indigo-600' },
    { title: 'Total Billed (LKR)', value: totalBilled.toLocaleString(), icon: IndianRupee, color: 'text-emerald-600' },
    { title: 'Total Collected (LKR)', value: totalCollected.toLocaleString(), icon: TrendingUp, color: 'text-teal-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your e-billing system.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
