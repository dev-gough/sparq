import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { useTrackEvent } from '@/hooks/useTrackEvent'

interface YTProps {
  videoIds: string[]
  videoTitles?: Record<string, string>
  onVideoSelect?: (videoId: string) => void
}

interface VideoData {
  id: string
  title: string
  thumbnail: string
}

export default function YTVideo({ videoIds, videoTitles, onVideoSelect }: YTProps) {
  const trackEvent = useTrackEvent()
  const [videosData, setVideosData] = useState<VideoData[]>([])

  useEffect(() => {
    // Create video data with thumbnails and titles
    const videos = videoIds.map(videoId => ({
      id: videoId,
      title: videoTitles?.[videoId] || `YouTube Video ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }))
    setVideosData(videos)
  }, [videoIds, videoTitles])

  const handleVideoClick = (videoId: string) => {
    trackEvent("youtube_video_clicked")
    onVideoSelect?.(videoId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videosData.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group"
        >
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700">
            <button
              onClick={() => handleVideoClick(video.id)}
              className="w-full text-left"
            >
              <div className="relative">
                <Image
                  height={720}
                  width={1280}
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
                      viewBox="0 0 20 20"
                    >
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
        </motion.div>
      ))}
    </div>
  )
}