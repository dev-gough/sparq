'use client'

import { Suspense } from 'react'
import Header from '@/components/Header'
import ForceScroll from '@/components/ForceScroll'
import PageTransition from '@/components/PageTransition'
import Analytics from '@/components/Analytics'
import { ThemeProvider } from '@/contexts/ThemeContext'

interface NavItem {
  href: string
  label: string
  dropdown?: NavItem[]
}

interface RootLayoutClientProps {
  children: React.ReactNode
  navbarItems: NavItem[]
  /** Server-rendered footer slot (passed from root layout). */
  footer: React.ReactNode
}

/**
 * Client shell: theme provider, header island, scroll reset.
 * Background gradient is always applied (no mounted flash).
 * Footer is a server component passed as children of this client boundary.
 * Motion is CSS-only; reduced-motion via prefers-reduced-motion (no user toggle).
 */
export default function RootLayoutClient({
  children,
  navbarItems,
  footer,
}: RootLayoutClientProps) {
  return (
    <body className="flex flex-col min-h-screen overflow-y-scroll" suppressHydrationWarning>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[1000] focus:px-4 focus:py-2 focus:bg-brand-maroon focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header navItems={navbarItems} />
          {/*
            Keep ForceScroll: App Router client navigations otherwise leave
            scroll mid-page. Manual restoration + top-on-pathname is intentional.
          */}
          <ForceScroll />
          {/* useSearchParams requires Suspense; null fallback has no layout impact */}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <main id="main-content" className="flex-grow h-full" tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </main>
          {footer}
        </div>
      </ThemeProvider>
    </body>
  )
}
