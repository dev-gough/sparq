'use client'

import { ViewTransition, type ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

/**
 * Soft cross-fade for App Router navigations (Next experimental.viewTransition).
 * Uses React 19.2+ <ViewTransition> (Next App Router canary channel).
 * Wraps page content only so header/footer stay anchored.
 * Unsupported browsers / reduced-motion: instant swap (see globals.css).
 */
export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" update="page-fade" share="page-fade">
      {children}
    </ViewTransition>
  )
}
