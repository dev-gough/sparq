import Link from "next/link"
import { FaVideo, FaArrowRight } from "react-icons/fa"

export default function EventPage() {
    return (
        <section id="events" className="items-center justify-center px-4">
            <h1 className="text-center text-5xl font-light mt-16">Events</h1>
            <hr className="mb-16 mt-2 text-slate-300" />
            <h2 className="text-3xl font-light">Upcoming</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                    <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Sparq Smartphone App - Coming Mid May</h1>
                </div>
                <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100 h-[218px]">
                    <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Sparq Website Refresh - Coming End of May</h1>
                </div>
            </div>
            <h2 className="text-3xl font-light mt-8">Archived</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                    <Link href="https://finance.yahoo.com/news/sparq-exhibits-quad-microinverters-intersolar-122500923.html" target="_blank">
                        <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">SPARQ Exhibits Its QUAD Microinverters at Intersolar India</h1>
                    </Link>
                    <p>Dr. Praveen Jain, the Company&apos;s Chief Executive Officer, commented, &quot;We are excited to walk the floors of one of the world&apos;s largest trade shows after a three year hiatus.  We are looking forward to meeting with our customers and suppliers to show off our latest microinverter products specifically designed for the Indian market&quot;.</p>
                    <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="https://finance.yahoo.com/news/sparq-exhibits-quad-microinverters-intersolar-122500923.html" target="_blank">Read More<FaArrowRight className="ml-2 mt-1 text-black" />
                    </Link>
                </div>
                <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                    <Link href="https://www.youtube.com/watch?v=8OJ02vvC-Os" target="_blank">
                        <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Sparq Systems CEO Interview - Dr. Praveen Jain</h1>
                    </Link>
                    <p>In this interview, Justin from Blaze Capital sits down with Dr. Praveen Jain, CEO of Sparq Systems, a company revolutionizing solar energy with its next generation single-phase microinverters.</p>
                    <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="https://www.youtube.com/watch?v=8OJ02vvC-Os" target="_blank">Watch the Interview<FaVideo className="ml-2 mt-1 text-black" />
                    </Link>
                </div>
            </div>

        </section>
    )
}