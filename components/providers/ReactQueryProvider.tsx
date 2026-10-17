'use client'

import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Keep one QueryClient instance per browser session to preserve the cache
 * across re-renders, while each SSR request gets its own isolated instance.
 */
let browserQueryClient: QueryClient | undefined

function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    // Server: always create a fresh client so requests are isolated.
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
        },
      },
    })
  }

  // Browser: reuse the existing client (or create one on first call).
  browserQueryClient ??= new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  })

  return browserQueryClient
}

interface ReactQueryProviderProps {
  children: ReactNode
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
