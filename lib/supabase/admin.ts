import { createClient } from '@supabase/supabase-js'

// Note: This client uses the SERVICE_ROLE_KEY and bypasses Row Level Security (RLS).
// NEVER use this on the client side or in routes accessible by untrusted users
// without proper authorization checks.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
