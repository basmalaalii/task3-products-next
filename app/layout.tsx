import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Beauty Products',
  description: 'Browse our curated collection of beauty & skincare products.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
