import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { inviteMeterReader } from './actions'

export default async function MeterReadersPage() {
  const supabase = await createClient()

  // Fetch existing meter readers
  const { data: readers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'METER_READER')
    .order('created_at', { ascending: false })

  // Fetch pending invitations
  const { data: invitations } = await supabase
    .from('meter_reader_invitations')
    .select('*')
    .eq('accepted', false)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Meter Readers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and invite meter readers.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invite Meter Reader</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={inviteMeterReader} className="space-y-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                <div className="mt-2">
                  <input required name="name" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                <div className="mt-2">
                  <input required name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Mobile Number (Optional)</label>
                <div className="mt-2">
                  <input name="mobile" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Assigned Area</label>
                <div className="mt-2">
                  <input name="assignedArea" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Send Invitation Email
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            {invitations && invitations.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {invitations.map((inv) => (
                  <li key={inv.id} className="flex justify-between gap-x-6 py-4">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{inv.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Area: {inv.assigned_area || 'None'}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">Expires: {new Date(inv.expires_at).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No pending invitations.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Active Meter Readers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Area</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {readers && readers.map((reader) => (
                  <tr key={reader.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{reader.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reader.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reader.mobile}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reader.assigned_area}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${reader.status === 'ACTIVE' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                        {reader.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
