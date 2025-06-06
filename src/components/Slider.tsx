'use client'

import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import { useState, useEffect } from 'react'

interface SliderProps {
    children: React.ReactNode
    pause?: boolean
    className?: string
    onSlide?: () => void
}

export default function Slider({ children, onSlide, className }: SliderProps) {

    const [isClient, setIsClient] = useState<boolean>(false)

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
                        delay: 20000,
                        disableOnInteraction: false,
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
                    onSlideChange={onSlide? onSlide : () => {}}
                >
                    {children}
                </Swiper>
            </div>
        </div>
    )
}