import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

// Define the shape of a logo object
interface Logo {
  src: string;
  alt: string;
}

// Define the props for the LogoSlider component
interface LogoSliderProps {
  logos: Logo[];
  speed?: number; // Transition duration in milliseconds
}

// LogoSlider component
const LogoSlider: React.FC<LogoSliderProps> = ({ logos, speed = 1000 }) => {
  return (
    <Swiper
      modules={[Autoplay]} // Enable Autoplay module
      loop={true} // Enable looping
      slidesPerView={7} // Automatically fit slides based on their width
      autoplay={{
        delay: 0, // Immediate transition after each slide
        disableOnInteraction: false, // Continue autoplay after user interaction
        pauseOnMouseEnter: true,
      }}
      speed={speed} // Transition duration in ms (higher value = slower movement)
      className="logo-slider h-32" // Tailwind classes for height and custom class
    >
      {logos.map((logo, index) => (
        <SwiperSlide key={index} className="w-24 p-1">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={256}
            height={128}
            className="h-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;