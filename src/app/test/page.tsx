import Link from "next/link"

export default function Home() {
    return (
        <div>
            <div className="relative h-screen overflow-x-hidden">
                <video className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/output.mp4" type="video/mp4" />
                </video>
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-5xl text-white text-center font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        Welcome to the Future of Solar Energy
                    </h1>
                    <div className="flex flex-row space-x-10 pt-32">
                        <Link href="/about" className="bg-green-800 cursor-pointer font-black text-white text-xl py-3 px-5 border-3 border-slate-200 rounded-4xl hover:bg-green-600 transition-colors"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Learn More</span></Link>
                        <Link href="/output.mp4" target="_blank" className="bg-green-800 cursor-pointer font-black text-white text-xl py-3 px-5 border-3 border-slate-200 rounded-4xl hover:bg-green-600 transition-colors"><span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Watch Video</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}