import Image from "next/image"
import { FaRocket, FaEye, FaStar } from "react-icons/fa"

export default function StatementsPage() {
    return (
        <div id="mission" className="flex flex-col items-center min-h-screen bg-gray-200">
            {/* Cards */}
            <div className="flex flex-col px-4 mt-8 w-full max-w-4/5">
                {/* Mission Card */}
                <div className="relative bg-white rounded-lg shadow-md mb-16 p-6 border-l-4 border-mission w-full">
                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border-2 border-mission">
                        <FaRocket className="h-8 w-8 text-mission" />
                    </div>
                    <Image src="/testing.png" alt="mission image" width={1536} height={1024} className="w-full h-140 bg-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-mission uppercase mb-4">Mission</h2>
                    {/* <p className="text-gray-700 text-base">
                        Our mission is to develop and advance state of the art technologies in energy harvesting, conversion, storage, and digital controls to resolve longstanding environmental, social, and governance (ESG) challenges of our planet through innovation, collaboration, and experience.
                    </p> */}
                    <p className="text-gray-700 text-base">Sparq&apos;s mission is to accelerate world&apos;s transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.</p>
                </div>

                {/* Vision Card */}
                <div id="vision" className="relative bg-white rounded-lg shadow-md mb-16 p-6 border-l-4 border-vision w-full">
                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border-2 border-vision">
                        <FaEye className="h-8 w-8 text-vision" />
                    </div>
                    <Image src="/testing.png" alt="mission image" width={1536} height={1024} className="w-full h-140 bg-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-vision uppercase mb-4">Vision</h2>
                    <p className="text-gray-700 text-base">Sparq&apos;s vision is to lead the energy self-sufficiency revolution by consistently designing and introducing the best-in-class clean energy products.</p>
                    {/* <p className="text-gray-700 text-base">
                        Driven by Sparq&apos;s unwavering commitment to innovation, customer satisfaction, and continuous improvement, our vision is to lead the clean energy revolution by consistently developing and introducing the next generation of energy-efficient, cost-effective, and environmentally sustainable power electronics, energy storage, and management technologies—paving the way for a greener, more sustainable future.
                    </p> */}
                </div>

                {/* Values Card */}
                <div id="values" className="relative bg-white rounded-lg shadow-md p-6 border-l-4 border-values w-full mb-8">
                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 border-2 border-values">
                        <FaStar className="h-8 w-8 text-values" />
                    </div>
                    <Image src="/testing.png" alt="mission image" width={1536} height={1024} className="w-full h-140 bg-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-values uppercase mb-4">Values</h2>
                    <p className="text-gray-700 text-base">Sparq delivers safe, reliable, and cost-effective microinverters, battery storage, and energy management solutions that are best-in-class, easy to install, and maintenance-free.</p>
                    {/* <p className="text-gray-700 text-base">
                        Sparq&apos;s value proposition is to provide safe, highly reliable, cost-effective, and easy-to-install and maintain portfolio of solar energy generation, storage, and management products, which seamlessly can integrate into one platform to deliver affordable, resilient, long-lasting, and sustainable grid-tied and offgrid energy solutions, to reduce adverse effects of growing energy demand on our ecosystem, including air, water, soil, biodiversity, and carbon footprint.
                    </p> */}
                </div>
            </div>
        </div>
    )
}