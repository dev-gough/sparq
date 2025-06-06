import { useEffect, useRef } from 'react'
import { useTrackEvent } from '@/hooks/useTrackEvent'

interface YTProps {
  videoIds: string[]
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: any // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export default function YTVideo({ videoIds }: YTProps) {
  const trackEvent = useTrackEvent()

  // keep track of which videoIds have already triggered first-play
  const playedRef = useRef<Record<string, boolean>>({})

  useEffect(() => {
    let isMounted = true

    // inject the YouTube IFrame API if needed
    const loadYT = () =>
      new Promise<void>((resolve) => {
        if (window.YT?.Player) {
          resolve()
        } else {
          const tag = document.createElement('script')
          tag.src = 'https://www.youtube.com/iframe_api'
          document.body.appendChild(tag)
          window.onYouTubeIframeAPIReady = () => resolve()
        }
      })

    loadYT().then(() => {
      if (!isMounted) return
      videoIds.forEach((videoId) => {
        new window.YT.Player(`yt-player-${videoId}`, {
          events: {
            onStateChange: (event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
              if (
                event.data === window.YT.PlayerState.PLAYING &&
                !playedRef.current[videoId]
              ) {
                playedRef.current[videoId] = true
                trackEvent("youtube_video_played")
              }
            },
          },
        })
      })
    })

    return () => {
      isMounted = false
    }
  }, [videoIds, trackEvent])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videoIds.map((videoId) => (
        <div className="relative pb-[56.25%]" key={videoId}>
          <iframe
            id={`yt-player-${videoId}`}
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`}
            title={`YouTube video ${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            loading="lazy"
          ></iframe>
        </div>
      ))}
    </div>
  )
}
