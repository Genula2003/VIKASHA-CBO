import { revalidatePath } from 'next/cache'

/**
 * Universal Cache Invalidation
 * Ensures that changes made anywhere (Meter Reader portal, Admin portal, Consumer Pay portal)
 * are immediately and automatically reflected on all screens and interfaces.
 */
export function revalidateAllSystemPaths(extraPaths: string[] = []) {
  const corePaths = [
    '/',
    '/pay',
    '/admin',
    '/admin/dashboard',
    '/admin/bills',
    '/admin/payments',
    '/admin/consumers',
    '/admin/meter-readers',
    '/admin/billing-rules',
    '/meter-reader',
    '/meter-reader/dashboard',
    '/meter-reader/history',
    '/meter-reader/enter-reading',
    ...extraPaths
  ]

  for (const p of corePaths) {
    try {
      revalidatePath(p, 'page')
      revalidatePath(p, 'layout')
    } catch {
      // Ignore if invoked outside of request lifecycle
    }
  }
}
