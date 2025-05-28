'use client'
import { FaCertificate, FaRocket, FaEye, FaStar } from "react-icons/fa"
import Image from "next/image"

export default function AboutUsPage() {
    return (
        <div id="mission" className="flex flex-col items-center bg-[#fefefe] scroll-mt-[115px]">
            <div className="relative flex h-[calc(100vh-115px)] w-full bg-[url(/bg-3.jpg)] bg-center bg-no-repeat bg-cover justify-center">
                <Image src="/logo.png" alt="Sparq Logo" height={125} width={125} className="absolute top-2 right-2" />
                <div className="absolute top-2/5 sm:top-1/2 bg-transparent rounded-xl mx-2 px-6 lg:px-12 border-l-8 border-white w-full max-w-4/5">
                    <div className="absolute -left-7 lg:-left-12 2xl:-left-14 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 lg:p-4 border-2 border-black">
                        <FaCertificate className="size-8 lg:size-12 2xl:size-16 text-black" />
                    </div>
                    <h2 className="pl-2 text-4xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Core Values</h2>
                    <p className="pl-2 text-white text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Integrity, Collaboration, Innovation, Quality, Social Responsibility, Teamwork</p>
                </div>
            </div>
            <div className="relative flex h-[calc(100vh-115px)] w-full bg-[url(/SLC/009.JPG)] bg-center bg-no-repeat bg-cover justify-center">
                <Image src="/logo.png" alt="Sparq Logo" height={125} width={125} className="absolute top-2 right-2" />
                <div className="absolute top-2/5 sm:top-1/2 bg-transparent rounded-xl mx-2 px-6 lg:px-12 border-l-8 border-white w-full max-w-4/5">
                    <div className="absolute -left-7 lg:-left-12 2xl:-left-14 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 lg:p-4 border-2 border-black">
                        <FaRocket className="size-8 lg:size-12 2xl:size-16 text-black" />
                    </div>
                    <h2 className="pl-2 text-4xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Mission</h2>
                    <p className="pl-2 text-white text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.</p>
                </div>
            </div>
            <div 
                id="vision"
                style={{
                    backgroundImage: `
                        url(/vision-1.jpg),
                        linear-gradient(to right bottom, #c29434, #9b8355)
                    `,
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat'
                }}
                className="relative flex h-[calc(100vh-115px)] bg-cover sm:max-[1440px]:bg-contain min-[1441px]:bg-cover w-full justify-center scroll-mt-[115px]"
            >
                <div className="absolute sm:left-[3%] top-2/5 sm:top-1/2 bg-transparent rounded-xl mx-2 px-6 lg:px-12 border-l-8 border-white w-full max-w-4/5 sm:max-w-[50%]">
                    <div className="absolute -left-7 lg:-left-12 2xl:-left-14 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 lg:p-4 border-2 border-black">
                        <FaEye className="size-8 lg:size-12 2xl:size-16 text-black" />
                    </div>
                    <h2 className="pl-2 text-4xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Vision</h2>
                    <p className="pl-2 text-white text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.</p>
                </div>
            </div>
            <div id="values" className="relative flex h-[calc(100vh-115px)] w-full bg-bottom bg-[url(/SLC/007.JPG)] bg-no-repeat bg-cover justify-center scroll-mt-[115px]">
                <Image src="/logo.png" alt="Sparq Logo" height={125} width={125} className="absolute top-2 right-2" />
                <div className="absolute top-2/5 sm:top-1/2 bg-transparent rounded-xl mx-2 px-6 lg:px-12 border-l-8 border-white w-full max-w-4/5">
                    <div className="absolute -left-7 lg:-left-12 2xl:-left-14 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 lg:p-4 border-2 border-black">
                        <FaStar className="size-8 lg:size-12 2xl:size-16 text-black" />
                    </div>
                    <h2 className="pl-2 text-4xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Promise</h2>
                    <p className="pl-2 text-white text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maitenance-free.</p>
                </div>
            </div>
        </div>
    )
}
