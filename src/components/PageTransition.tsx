'use client'

/// <reference types="react/experimental" />

import { unstable_ViewTransition as ViewTransition, type ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

/**
 * Soft cross-fade for App Router navigations (Next experimental.viewTransition).
 * Wraps page content only so header/footer stay anchored.
 * Unsupported browsers / reduced-motion: instant swap (no error).
 */
export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" update="page-fade" share="page-fade">
      {children}
    </ViewTransition>
  )
}
