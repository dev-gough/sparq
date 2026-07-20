'use client'

import Image from 'next/image'
import { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import AggregatedFAQ from '@/components/AggregatedFAQ'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'
import VideoPopup from '@/components/VideoPopup'
import { educationalVideos, installerVideos, homeownerVideos, allVideos } from '@/data/videos'
import { trackVideoStart } from '@/hooks/useTrackEvent'

import homeownersData from '@/data/home_faq.json'
import installersData from '@/data/installer_faq.json'
import investorsData from '@/app/investors/investor_faq.json'

/**
 * Isolated useSearchParams consumer — only this subtree is Suspense-gated.
 * Renders nothing; opens the video popup when ?video= is present.
 * fallback={null} is safe here (no layout impact).
 */
function VideoDeepLink({ onOpen }: { onOpen: (id: number) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const videoParam = searchParams.get('video')
    if (!videoParam) return
    const videoId = parseInt(videoParam, 10)
    if (!isNaN(videoId) && allVideos.some((video) => video.id === videoId)) {
      onOpen(videoId)
    }
  }, [searchParams, onOpen])

  return null
}

export default function LearningPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [showingID, setShowingID] = useState<number | null>(null)

  const openVideo = useCallback((id: number) => {
    setShowingID(id)
  }, [])

  const handleShow = (id: number) => {
    setShowingID(id)
    const video = allVideos.find((v) => v.id === id)
    if (video) {
      trackVideoStart({
        video_id: video.url,
        video_title: video.title,
        video_provider: video.iFrame ? 'youtube' : 'self',
      })
    }
    // Next router — no window.*; preserves App Router navigation
    router.push(`${pathname}?video=${id}`, { scroll: false })
  }

  const handleClose = () => {
    setShowingID(null)
    router.push(pathname, { scroll: false })
  }

  const selectedVideo = allVideos.find((video) => video.id === showingID)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <SolarBackgroundElements />

      {/* Video deep-link island — only part that needs useSearchParams / Suspense */}
      <Suspense fallback={null}>
        <VideoDeepLink onOpen={openVideo} />
      </Suspense>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-10 sm:pb-16">
        <div
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              Expand Your Knowledge
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              With Expert Resources
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Explore our comprehensive collection of educational videos, technical documentation,
            and FAQs designed to enhance your solar knowledge.
          </p>
        </div>
      </section>

      {/* All Videos Section */}
      <section className="relative container mx-auto px-6 py-10">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
            Video Library
          </h2>
          <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
            Explore our comprehensive collection of educational content, technical presentations, and product demonstrations.
          </p>
        </div>

        {/* Educational Videos */}
        <div className="mb-16">
          <h3
            className="text-2xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-8 text-center"
          >
            Educational Content
          </h3>
          <p
            className="text-lg text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto text-center mb-8"
          >
            Foundational educational videos covering PV systems basics, climate change, and global warming fundamentals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {educationalVideos.map((video) => (
              <div
                key={video.id}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700">
                  <button
                    type="button"
                    onClick={() => handleShow(video.id)}
                    className="w-full text-left min-h-[44px]"
                    aria-label={`Play video: ${video.title}`}
                  >
                    <div className="relative">
                      <Image
                        height={360}
                        width={640}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        src={video.thumbnail}
                        alt=""
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
              </div>
            ))}
          </div>
        </div>

        <hr className="border-brand-maroon/20 dark:border-brand-logo/20 mb-16" />

        {/* Installer Videos */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-8 text-center">
            For Installers
          </h3>
          <p className="text-lg text-brand-graytext dark:text-dark-text-secondary max-w-2xl mx-auto text-center mb-8">
            Technical insights, installation guides, and product demonstrations for professional installers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {installerVideos.map((video) => (
              <div
                key={video.id}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700">
                  <button
                    type="button"
                    onClick={() => handleShow(video.id)}
                    className="w-full text-left min-h-[44px]"
                    aria-label={`Play video: ${video.title}`}
                  >
                    <div className="relative">
                      <Image
                        height={360}
                        width={640}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        src={video.thumbnail}
                        alt=""
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
              </div>
            ))}
          </div>
        </div>

        <hr className="border-brand-maroon/20 dark:border-brand-logo/20 mb-16" />

        {/* Homeowner Videos */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-8 text-center">
            For Homeowners
          </h3>
          <p className="text-lg text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto text-center mb-8">
            Educational content to help homeowners understand solar energy and Sparq&apos;s benefits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {homeownerVideos.map((video) => (
              <div
                key={video.id}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer py-0 bg-white dark:bg-gray-700">
                  <button
                    type="button"
                    onClick={() => handleShow(video.id)}
                    className="w-full text-left min-h-[44px]"
                    aria-label={`Play video: ${video.title}`}
                  >
                    <div className="relative">
                      <Image
                        height={360}
                        width={640}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        src={video.thumbnail}
                        alt=""
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aggregated FAQ Section */}
      <AggregatedFAQ
        id="faq"
        homeownersData={homeownersData}
        installersData={installersData}
        investorsData={investorsData}
      />

      <div
        className="text-center"
      >
        <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700 dark:to-gray-600/50 py-0 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">
              More Content Coming Soon
            </h3>
            <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
              We&apos;re continuously expanding our resource library with technical documentation,
              interactive tools, and additional educational content to support your success.
            </p>
          </CardContent>
        </Card>
      </div>

      {selectedVideo && (
        <VideoPopup url={selectedVideo.url} onClose={handleClose} iFrame={selectedVideo.iFrame} />
      )}
    </div>
  )
}
