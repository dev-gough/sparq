import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'
import Link from 'next/link'

interface Logo {
	src: string
	alt: string
	href?: string
}

interface LogoSliderProps {
	logos: Logo[]
	speed?: number // Transition duration in milliseconds
}

export default function LogoSlider({ logos, speed = 1500 }: LogoSliderProps) {
	return (
		<Swiper
			modules={[Autoplay]}
			loop={true}
			slidesPerView={1}
			autoplay={{
				delay: 0,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			speed={speed}
			className="logo-slider h-32"
			breakpoints={{
				640: {
					slidesPerView: 3
				}
			}}
		>
			{logos.map((logo, index) => (
				<SwiperSlide key={index} className=" p-1">
					{logo.href ? (
						<Link href={logo.href} target='_blank' className=''>
							<Image
								src={logo.src}
								alt={logo.alt}
								width={256}
								height={128}
								className="h-20 w-1/2 sm:h-32 sm:w-full sm:p-2 bg-white rounded-xl"
							/>
						</Link>
					) : (
						<Image
							src={logo.src}
							alt={logo.alt}
							width={256}
							height={128}
							className="h-20 w-1/2 sm:h-32 sm:w-full sm:p-2 bg-white rounded-xl"
						/>
					)}
				</SwiperSlide>
			))}
		</Swiper>
	)
}
