'use client'

import { useEffect, useId, useRef } from 'react'

interface VideoPopupProps {
  url: string
  onClose: () => void
  iFrame: boolean
}

export default function VideoPopup({ url, onClose, iFrame }: VideoPopupProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    // Focus close control when dialog opens
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" role="presentation">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        className="absolute w-full h-full flex items-center justify-center"
        style={{
          top: '140px',
          height: 'calc(100vh - 140px)',
        }}
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative w-full max-w-7xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id={titleId} className="sr-only">
            Video player
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute -top-4 -right-4 z-20 bg-red-600 rounded-full p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center shadow-lg text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="relative pt-[56.25%]">
              {iFrame ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${url}?autoplay=1&modestbranding=1&rel=0`}
                  title="Video player"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video
                  className="absolute top-0 left-0 w-full h-full bg-black"
                  controls
                  autoPlay
                >
                  <source src={url} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
