import { FaRocket, FaEye, FaStar } from "react-icons/fa"

export default function StatementsPage() {
    return (
        <div className="flex flex-col justify-center min-h-screen bg-gray-200">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-32">
                {/* Mission Card */}
                <div className="bg-white rounded-lg shadow-md p-6 relative border-l-4 border-t-4 border-[#FF4D4D]">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#FF4D4D] rounded-full w-16 h-16 flex items-center justify-center">
                        <FaRocket className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-mission uppercase mb-4">Mission</h2>
                    <p className="text-gray-700 text-xl">
                        Our mission is to develop and advance state of the art technologies in energy harvesting, conversion, storage, and digital controls to resolve longstanding environmental, social, and governance (ESG) challenges of our planet through innovation, collaboration, and experience.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-lg shadow-md p-6 relative border-l-4 border-t-4 border-[#4DC8FF]">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#4DC8FF] rounded-full w-16 h-16 flex items-center justify-center">
                        <FaEye className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-vision uppercase mb-4">Vision</h2>
                    <p className="text-gray-700 text-xl">
                        Driven by Sparq&apos;s unwavering commitment to innovation, customer satisfaction, and continuous improvement, our vision is to lead the clean energy revolution by consistently developing and introducing the next generation of energy-efficient, cost-effective, and environmentally sustainable power electronics, energy storage, and management technologies—paving the way for a greener, more sustainable future.
                    </p>
                </div>

                {/* Values Card */}
                <div className="bg-white rounded-lg shadow-md p-6 relative border-l-4 border-t-4 border-[#FF9F4D]">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#FF9F4D] rounded-full w-16 h-16 flex items-center justify-center">
                        <FaStar className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-values uppercase mb-4">Values</h2>
                    <p className="text-gray-700 text-xl">
                        Sparq&apos;s value proposition is to provide safe, highly reliable, cost-effective, and easy-to-install and maintain portfolio of solar energy generation, storage, and management products, which seamlessly can integrate into one platform to deliver affordable, resilient, long-lasting, and sustainable grid-tied and offgrid energy solutions, to reduce adverse effects of growing energy demand on our ecosystem, including air, water, soil, biodiversity, and carbon footprint.
                    </p>
                </div>
            </div>
        </div>
    )
}