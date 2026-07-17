'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTrackEvent } from '@/hooks/useTrackEvent'

type YouTubeFacadeProps = {
  videoId: string
  title?: string
  /** Extra class on the outer aspect-ratio box */
  className?: string
  /** Prefer maxres; falls back visually if missing via browser */
  thumbnailQuality?: 'maxresdefault' | 'hqdefault'
}

/**
 * Thumbnail + play button; loads YouTube iframe only on click.
 * Replaces react-youtube for product pages (no third-party JS until intent).
 */
export default function YouTubeFacade({
  videoId,
  title = 'YouTube video',
  className = '',
  thumbnailQuality = 'maxresdefault',
}: YouTubeFacadeProps) {
  const [active, setActive] = useState(false)
  const trackEvent = useTrackEvent()

  const thumb = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`

  if (active) {
    return (
      <div className={`w-full aspect-video min-h-[240px] rounded-lg overflow-hidden ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="w-full h-full min-h-[400px]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent('youtube_video_clicked', { video_id: videoId })
        setActive(true)
      }}
      className={`group relative w-full aspect-video min-h-[240px] rounded-lg overflow-hidden text-left ${className}`}
      aria-label={`Play ${title}`}
    >
      <Image
        src={thumb}
        alt={title}
        fill
        className="object-cover group-hover:blur-sm transition-all duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 560px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </button>
  )
}
