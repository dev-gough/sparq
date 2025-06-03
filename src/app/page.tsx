'use client'
import Link from "next/link"
import { useState, useRef, useEffect } from 'react'
import Draggable from "react-draggable"

import { useTrackEvent } from "@/hooks/useTrackEvent"
import { useIsMobile } from "@/hooks/useIsMobile"
import VideoControls from "@/components/VideoControls"

export default function Home() {
    const trackEvent = useTrackEvent()

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
    const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false)
    const [isVidPaused, setIsVidPaused] = useState<boolean>(false)
    const [showButtons, setShowButtons] = useState<boolean>(false)

    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const vidRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()

    /*
        Popup handlers
    */
    // const openPopup = () => {
    //     setIsPopupOpen(true)
    //     trackEvent("button_click", {
    //         "btn_name": "home_view_alt_video"
    //     })
    // }
    const closePopup = () => setIsPopupOpen(false)

    const openWelcomePopup = () => {
        setIsWelcomeOpen(true)
        trackEvent("button_click", {
            "btn_name": "home_view_welcome_video"
        })
    }

    const closeWelcome = () => setIsWelcomeOpen(false)

    /*
        Video Playback Handlers
    */
    const handleReplay = () => {
        if (vidRef.current) {
            vidRef.current.currentTime = 0
            vidRef.current.play()
            setIsVidPaused(false)
            trackEvent("video_replay", {
                "video": "home_replay_alt_video"
            })
        }
    }

    const handleRewind = () => {
        if (!vidRef.current) return
        vidRef.current.currentTime = Math.max(0, vidRef.current.currentTime - 10)
    }

    const handlePlayPause = () => {
        const epsilon = 0.05
        if (!vidRef.current) return
        if (vidRef.current.paused || vidRef.current.ended) {
            if (Math.abs(vidRef.current.currentTime - vidRef.current.duration) < epsilon) vidRef.current.currentTime = 0
            vidRef.current.play()
            setIsVidPaused(false)
        } else {
            vidRef.current.pause()
            setIsVidPaused(true)
        }
    }

    const handleForward = () => {
        if (!vidRef.current) return
        vidRef.current.currentTime = Math.min(
            vidRef.current.duration,
            vidRef.current.currentTime + 10
        )
    }

    const handleSkipToEnd = () => {
        if (!vidRef.current) return
        vidRef.current.currentTime = vidRef.current.duration
        vidRef.current.pause()
        setIsVidPaused(true)
        setShowButtons(true)
    }

    const startButtonTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setShowButtons(true), 5000)
    }

    const handleLearnMore = () => {
        trackEvent("button_click", {
            "btn_name": "home_learn_more"
        })
    }

    // start the timer on component mount
    useEffect(() => {
        startButtonTimer()
    }, [])

    return (
        <div>
            <div className="relative h-[calc(100vh-66px)] overflow-x-hidden">
                <Draggable bounds="parent" nodeRef={wrapperRef as React.RefObject<HTMLElement>} cancel=".ctrl">
                    <div className="absolute top-4 right-4 p-2 border-white border" ref={wrapperRef}>
                        <VideoControls
                            className="ctrl"
                            onRestart={handleReplay}
                            onRewind={handleRewind}
                            onPlayPause={handlePlayPause}
                            onForward={handleForward}
                            onSkipToEnd={handleSkipToEnd}
                            isPaused={isVidPaused}
                        />
                    </div>
                </Draggable>
                {!isMobile && (
                    <video className="absolute top-0 left-0 w-full h-full object-contain xl:object-cover bg-black z-[-1]"
                        ref={vidRef}
                        autoPlay
                        muted
                        onEnded={() => setShowButtons(true)}
                    >
                        <source src="/main_dt.mp4" type="video/mp4" />
                    </video>
                )}
                {isMobile && (
                    <video className="absolute top-0 left-0 w-full h-full object-cover bg-black z-[-1]"
                        ref={vidRef}
                        autoPlay
                        muted
                        onEnded={() => setShowButtons(true)}
                    >
                        <source src="/main_mobile.mp4" type="video/mp4" />
                    </video>
                )}
                <div className="flex items-center justify-center h-full transition-transform duration-200">
                    {showButtons && (
                        <div className="flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-10 pt-8 mt-60 sm:mt-120 sm:w-full">
                            <Link href="/about" className="text-center bg-transparent border-white text-white hover:bg-slate-900 hover:text-white cursor-pointer font-black sm:text-xl py-2 sm:py-3 sm:px-5 border-3  rounded-4xl transition-colors drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]" onClick={handleLearnMore}>Highlights</Link>

                            <button onClick={openWelcomePopup} className="bg-transparent border-white text-white hover:bg-slate-900 hover:text-white cursor-pointer font-black sm:text-xl py-2 sm:py-3 px-5 border-3  rounded-4xl transition-colors drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]  ">Website Tour</button>
                        </div>
                    )}
                </div>
                {isPopupOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        onClick={closePopup}
                    >
                        <div
                            className="relative bg-black w-[90vw] h-[80vh] rounded-lg "
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src="SPARQ_Quad_Microinverters.mp4"
                                controls
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-contain border-2"
                            />
                            <button
                                onClick={closePopup}
                                className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {isWelcomeOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        onClick={closeWelcome}
                    >
                        <div
                            className="relative bg-black w-[90vw] h-[80vh] rounded-lg "
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src="WELCOME_VID"
                                controls
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-contain border-2"
                            />
                            <button
                                onClick={closeWelcome}
                                className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
