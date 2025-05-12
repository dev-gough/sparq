'use client'
import { FaRocket, FaEye, FaStar } from "react-icons/fa"
import Image from "next/image"

// scroll-mt-[115px]

export default function StatementsPage() {
    return (
        <div id="mission" className="flex flex-col items-center bg-[#fefefe] scroll-mt-[115px]">
            <div className="relative flex h-[calc(100vh-114px)] w-full bg-[url(/SLC/009.JPG)] bg-center bg-no-repeat bg-cover justify-center">
                <Image src="/logo.png" alt="Sparq Logo" height={125} width={125} className="absolute top-2 right-2" />
                <div className="absolute top-1/2 bg-transparent rounded-xl p-12 border-l-8 border-white w-full max-w-4/5">
                    <div className="absolute -left-14 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 border-2 border-black">
                        <FaRocket className="h-16 w-16 text-black" />
                    </div>
                    <h2 className="pl-2 text-8xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Mission</h2>
                    <p className="pl-2 text-white text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.</p>
                </div>
            </div>
            <div id="vision" className="relative flex h-[calc(100vh-115px)] w-full bg-[url(/vision.jpg)] bg-no-repeat bg-contain justify-center scroll-mt-[115px]">
                <div className="absolute left-[3%] top-2/5 bg-transparent rounded-xl mb-16 p-12 border-l-8 border-white w-full max-w-[50%]">
                    <div className="absolute -left-14 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 border-2 border-black">
                        <FaEye className="h-16 w-16 text-black" />
                    </div>
                    <h2 className="pl-2 text-8xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Vision</h2>
                    <p className="pl-2 text-white text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.</p>
                </div>
            </div>
            <div id="values" className="relative flex h-[calc(100vh-115px)] w-full bg-bottom bg-[url(/SLC/007.JPG)] bg-no-repeat bg-cover justify-center scroll-mt-[115px]">
                <Image src="/logo.png" alt="Sparq Logo" height={125} width={125} className="absolute top-2 right-2" />
                <div className="absolute top-2/5 bg-transparent rounded-xl mb-16 p-12 border-l-8 border-white w-full max-w-4/5">
                    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border-2 border-black">
                        <FaStar className="h-16 w-16 text-black" />
                    </div>
                    <h2 className="pl-2 text-8xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Value</h2>
                    <p className="pl-2 text-white text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maitenance-free.</p>
                </div>
            </div>
        </div>
    )
}
