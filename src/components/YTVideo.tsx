'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { useTrackEvent, trackVideoStart } from '@/hooks/useTrackEvent'

interface YTProps {
  videoIds: string[]
  videoTitles?: Record<string, string>
  onVideoSelect?: (videoId: string) => void
  fullWidth?: boolean
}

interface VideoData {
  id: string
  title: string
  thumbnail: string
}

export default function YTVideo({ videoIds, videoTitles, onVideoSelect, fullWidth = false }: YTProps) {
  useTrackEvent()
  const [videosData, setVideosData] = useState<VideoData[]>([])
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  useEffect(() => {
    const videos = videoIds.map(videoId => ({
      id: videoId,
      title: videoTitles?.[videoId] || `YouTube Video ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    }))
    setVideosData(videos)
  }, [videoIds, videoTitles])

  const handleVideoClick = (videoId: string) => {
    const title = videoTitles?.[videoId]
    trackVideoStart({ video_id: videoId, video_title: title })
    if (fullWidth) {
      setPlayingVideo(videoId)
    } else {
      onVideoSelect?.(videoId)
    }
  }

  if (fullWidth) {
    return (
      <div className="w-full">
        {videosData.map((video) => (
          <div key={video.id} className="w-full">
            {playingVideo === video.id ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button type="button"
                onClick={() => handleVideoClick(video.id)}
                className="w-full text-left group">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    height={360}
                    width={640}
                    sizes="(max-width: 768px) 100vw, 640px"
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videosData.map((video) => (
        <div key={video.id} className="group">
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700">
            <button type="button"
              onClick={() => handleVideoClick(video.id)}
              className="w-full text-left">
              <div className="relative">
                <Image
                  height={360}
                  width={640}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover group-hover:blur-sm transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon dark:group-hover:text-brand-logo transition-colors duration-300">
                  {video.title}
                </h3>
              </CardContent>
            </button>
          </Card>
        </div>
      ))}
    </div>
  )
}
