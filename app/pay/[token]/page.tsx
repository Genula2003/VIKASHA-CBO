import { createAdminClient } from '@/lib/supabase/admin'
import { PaymentClientPage } from './ClientPage'

export default async function PayPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const supabase = createAdminClient()

  const { data: bill, error } = await supabase
    .from('bills')
    .select('*')
    .eq('access_token', token)
    .single()

  if (error || !bill) {
    return <div className="p-8 text-center text-red-500">Invalid or expired payment link.</div>
  }

  if (bill.status === 'PAID') {
    return <div className="p-8 text-center text-green-600 font-bold">This bill has already been paid.</div>
  }

  return <PaymentClientPage bill={bill} />
}
