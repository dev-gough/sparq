'use client'

import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import { useState, useEffect } from 'react'

interface SliderProps {
    children: React.ReactNode
    viewAllOnClick?: () => void
    pause?: boolean
    className?: string
}

export default function Slider({ children, viewAllOnClick, pause, className }: SliderProps) {

    const [isClient, setIsClient] = useState<boolean>(false)
    const [scrollSpeed, setScrollSpeed] = useState<number>(7500)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <div
            className="w-full sm:h-128 bg-cover bg-center sm:bg-top relative bg-[url(/tmp.jpg)] sm:rounded-xl">
        </div>
    }

    return (
        <div
            className={`w-full sm:h-128 bg-cover bg-center sm:bg-top relative bg-[url(/tmp.jpg)] sm:rounded-xl ${className}`}>
            <div className="pt-4 px-6 max-w-full">
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay, Navigation]}
                    navigation={{
                        enabled: false
                    }}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: scrollSpeed,
                        disableOnInteraction: pause ? pause : false,
                        pauseOnMouseEnter: true,
                    }}
                    className='text-white sm:h-120 h-90 [--swiper-pagination-bullet-size:15px] sm:[--swiper-pagination-bullet-size:30px] sm:[--swiper-navigation-size:70px]'
                    breakpoints={{
                        640: {
                            navigation: {
                                enabled: true
                            }
                        }
                    }}
                >
                    <div className='flex flex-row justify-between absolute top-0 right-0 z-10'>
                        <button className='bg-blue-800 rounded-xl w-16 hover:bg-blue-950 cursor-pointer' onClick={() => setScrollSpeed(7500)}>slow</button>
                        <button className='bg-blue-800 rounded-xl w-16 hover:bg-blue-950 cursor-pointer' onClick={() => setScrollSpeed(4000)}>fast</button>
                    </div>
                    {children}
                    {viewAllOnClick && (
                        <button className="absolute bottom-0 left-0 z-10 cursor-pointer hover:underline" onClick={viewAllOnClick}>Toggle View All</button>
                    )}
                </Swiper>
            </div>
        </div>
    )
}