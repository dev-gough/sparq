'use client'

import { useEffect, useRef, type ReactNode, type ElementType } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Soft opacity fade (avoid on LCP heroes — use only below the fold). */
  fade?: boolean
  /** Root margin for IntersectionObserver (default: start a bit before enter). */
  rootMargin?: string
  as?: ElementType
}

/**
 * Below-the-fold entrance via CSS classes in globals.css.
 * SSR renders fully visible content; client only toggles .is-visible.
 * Respects prefers-reduced-motion (no site-wide animation toggle).
 * Prefer plain markup for above-the-fold heroes (no reveal) so LCP is immediate.
 */
export default function Reveal({
  children,
  className,
  fade = false,
  rootMargin = '0px 0px -8% 0px',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return (
    <Tag
      ref={ref}
      className={cn('reveal-on-view', fade && 'reveal-fade', className)}
    >
      {children}
    </Tag>
  )
}
