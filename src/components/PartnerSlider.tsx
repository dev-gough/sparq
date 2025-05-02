import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'

interface Logo {
	src: string
	alt: string
}

interface LogoSliderProps {
	logos: Logo[]
	speed?: number // Transition duration in milliseconds
}

export default function LogoSlider({ logos, speed = 1250 } : LogoSliderProps) {
	return (
		<Swiper
			modules={[Autoplay]}
			loop={true}
			slidesPerView={3}
			autoplay={{
				delay: 0,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			speed={speed}
			className="logo-slider h-32"
		>
			{logos.map((logo, index) => (
				<SwiperSlide key={index} className="w-32 p-1">
					<Image
						src={logo.src}
						alt={logo.alt}
						width={256}
						height={128}
						className="h-32 bg-white rounded-xl"
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
