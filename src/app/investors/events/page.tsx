import Link from "next/link"
import { FaVideo } from "react-icons/fa"

export default function EventPage() {
    return (
        <section id="events" className="items-center justify-center px-4">
            <h1 className="text-center text-5xl font-light mt-16">Events</h1>
            <hr className="mb-16 mt-2 text-slate-300"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                    <Link href="#" target="_blank">
                        <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">SPARQ Exhibits Its QUAD Microinverters at Intersolar India</h1>
                    </Link>
                    <p>Dr. Praveen Jain, the Company&apos;s Chief Executive Officer, commented, &quot;We are excited to walk the floors of one of the world&apos;s largest trade shows after a three year hiatus.  We are looking forward to meeting with our customers and suppliers to show off our latest microinverter products specifically designed for the Indian market&quot;.</p>
                    <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black" />
                    </Link>
                </div>
                <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                    <Link href="#" target="_blank">
                        <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Event #2</h1>
                    </Link>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus magna nec hendrerit consequat. Morbi id interdum lacus, in vulputate mauris. Donec in porta ex. Vestibulum ligula velit, maximus id tempor vel, tincidunt in ante. Nam rhoncus consequat tempus. Donec dolor nisi, vehicula sit amet feugiat vitae, tempor sagittis magna.</p>
                    <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black" />
                    </Link>
                </div>
                <div className="relative p-4 pb-10 border rounded-xl shadow bg-gray-100">
                    <Link href="#" target="_blank">
                        <h1 className="text-brand-maroon text-center font-mono text-2xl hover:underline">Event #3</h1>
                    </Link>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus magna nec hendrerit consequat. Morbi id interdum lacus, in vulputate mauris. Donec in porta ex. Vestibulum ligula velit, maximus id tempor vel, tincidunt in ante. Nam rhoncus consequat tempus. Donec dolor nisi, vehicula sit amet feugiat vitae, tempor sagittis magna.</p>
                    <Link className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" href="#">Watch the Webcast<FaVideo className="ml-2 mt-1 text-black" />
                    </Link>
                </div>
            </div>
        </section>
    )
}