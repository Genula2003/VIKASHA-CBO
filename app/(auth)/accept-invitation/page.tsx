import { AcceptInvitationClient } from './client'

export default async function AcceptInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const token = params.token as string
  const email = params.email as string

  return <AcceptInvitationClient token={token} email={email} />
}
