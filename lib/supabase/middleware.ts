import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protected Routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/meter-reader')) {
    if (!user) {
      // no user, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Check Role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile) {
      if (pathname.startsWith('/admin') && profile.role !== 'ADMIN') {
        // Redirect non-admin trying to access admin
        const url = request.nextUrl.clone()
        url.pathname = '/meter-reader/dashboard'
        return NextResponse.redirect(url)
      }
      if (pathname.startsWith('/meter-reader') && profile.role !== 'METER_READER') {
        // Admins can probably access meter-reader routes but we should probably redirect to admin
        const url = request.nextUrl.clone()
        url.pathname = '/admin/dashboard'
        return NextResponse.redirect(url)
      }
    }
  }

  // Redirect logged in users away from login
  if (pathname === '/login' && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    if (profile?.role === 'ADMIN') {
      url.pathname = '/admin/dashboard'
    } else {
      url.pathname = '/meter-reader/dashboard'
    }
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
