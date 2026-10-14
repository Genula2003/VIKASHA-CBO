import { computeArrearsData } from '@/lib/services/arrears-service'
import { ArrearsClientPage } from './ClientPage'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Overdue Arrears & Red Notice Manager | Vikasha CBO',
  description: 'Executive committee arrears aging resolution, Red Notice generator, and field disconnection warrant manager for Vikasha CBO (Magammana).',
}

export default async function ArrearsPage() {
  const data = computeArrearsData()
  return <ArrearsClientPage initialData={data} />
}
