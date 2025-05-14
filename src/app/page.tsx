'use client'
import Link from "next/link"
import { useState, useRef } from 'react'
import { MdOutlineReplay } from 'react-icons/md'

import { useTrackEvent } from "@/hooks/useTrackEvent"

export default function Home() {
    const trackEvent = useTrackEvent()

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
    const [isVidEnded, setIsVidEnded] = useState<boolean>(false)
    const [showButtons, setShowButtons] = useState<boolean>(false)

    const openPopup = () => {
        setIsPopupOpen(true)
        trackEvent("button_click", {
            "btn_name": "home_view_video"
        })
    }
    const closePopup = () => setIsPopupOpen(false)

    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const vidRef = useRef<HTMLVideoElement>(null)
    const handleReplay = () => {
        if (vidRef.current) {
            vidRef.current.currentTime = 0
            vidRef.current.play()
        }
    }

    const startButtonTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setShowButtons(false)
        timerRef.current = setTimeout(() => setShowButtons(true), 5000)
    }

    const handlePlay = () => {
        setIsVidEnded(false)
        startButtonTimer()
        console.log('timer started')
    }


    return (
        <div>
            <div className="relative h-[calc(100vh-66px)] overflow-x-hidden">
                {isVidEnded && (
                    <MdOutlineReplay
                        onClick={handleReplay}
                        className='absolute top-4 right-4 text-white text-4xl cursor-pointer z-10' />

                )}
                <video className="absolute top-0 left-0 w-full h-full object-contain bg-black sm:object-cover z-[-1]"
                    ref={vidRef}
                    autoPlay
                    muted
                    onEnded={() => setIsVidEnded(true)}
                    onPlay={handlePlay}
                >
                    <source src="/output.mp4" type="video/mp4" />
                </video>
                <div className="flex flex-col items-center justify-center h-full transition-transform duration-200">
                    {showButtons && (
                        <div className="flex flex-row space-x-10 pt-8 mt-120">
                            <Link href="/about#learnmore" className="bg-transparent border-white text-white hover:bg-slate-900 hover:text-white cursor-pointer font-black  text-xl py-3 px-5 border-3  rounded-4xl transition-colors drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Learn More</Link>
                            <button onClick={openPopup} className="bg-transparent border-white text-white hover:bg-slate-900 hover:text-white cursor-pointer font-black  text-xl py-3 px-5 border-3  rounded-4xl transition-colors drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Watch Video</button>
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
            </div>
        </div>
    )
}
