'use client'
import { FaRocket, FaEye, FaStar } from "react-icons/fa"
import Image from "next/image"

export default function StatementsPage() {
    return (
        <div id="mission" className="flex flex-col items-center bg-gray-200">
            <div className="relative flex h-[calc(100vh-114px)] w-full bg-[url(/SLC/009.JPG)] bg-center bg-no-repeat bg-cover justify-center">
                <Image src="/logo.png" alt="Sparq Logo" height={125} width={125} className="absolute top-2 right-2" />
                <div className="absolute top-3/5 bg-transparent rounded-lg mb-16 p-6 border-l-4 border-white w-full max-w-4/5">
                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border-2 border-black">
                        <FaRocket className="h-8 w-8 text-black" />
                    </div>
                    <h2 className="pl-2 text-3xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Mission</h2>
                    <p className="pl-2 text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Sparq&apos;s mission is to accelerate world&apos;s transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.</p>
                </div>
            </div>
            <div id="vision" className="relative flex h-[calc(100vh-114px)] w-full bg-[url(/vision.png)] bg-no-repeat bg-cover justify-center">
                <div className="absolute left-1/12 top-3/5 bg-transparent rounded-lg mb-16 p-6 border-l-4 border-white w-full max-w-2/5">
                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border-2 border-black">
                        <FaEye className="h-8 w-8 text-black" />
                    </div>
                    <h2 className="pl-2 text-3xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Vision</h2>
                    <p className="pl-2 text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Sparq&apos;s vision is to lead the energy self-sufficiency revolution by consistently designing and introducing the best-in-class clean energy products.</p>
                </div>
            </div>
            <div id="values" className="relative flex h-[calc(100vh-115px)] w-full bg-bottom bg-[url(/SLC/007.JPG)] bg-no-repeat bg-cover justify-center">
                <Image src="/logo.png" alt="Sparq Logo" height={125} width={125} className="absolute top-2 right-2" />
                <div className="absolute top-2/5 bg-transparent rounded-lg mb-16 p-6 border-l-4 border-white w-full max-w-4/5">
                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border-2 border-black">
                        <FaStar className="h-8 w-8 text-black" />
                    </div>
                    <h2 className="pl-2 text-3xl font-bold text-white uppercase mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Value</h2>
                    <p className="pl-2 text-white text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Sparq&apos;s vision is to lead the energy self-sufficiency revolution by consistently designing and introducing the best-in-class clean energy products.</p>
                </div>
            </div>
        </div>
    )
}
