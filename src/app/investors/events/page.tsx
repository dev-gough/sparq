import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

interface EventItem {
    id: number
    title: string
    summary: string
    date: Date
    url: string
}

const events: EventItem[] = [
    {
        id: 1,
        title: "Sparq Smartphone App Launch",
        summary: "We are proud to announce the launch of our new solar power system app. The platform provides users with real-time insights into their system's performance, including power generation data, current weather conditions, and more. This innovative tool empowers users to efficiently monitor and optimize their solar energy usage",
        date: new Date("2025-05-15"),
        url: "",
    },
    {
        id: 2,
        title: "Sparq Website Refresh",
        summary: "Our newly refreshed website introduces a faster, more seamless experience, built on a modern React framework. With significantly improved loading times and a clean, intuitive design, the upgrade ensures users can quickly access information, explore solutions, and stay connected with the latest updates.",
        date: new Date("2025-05-16"),
        url: "",
    },
    {
        id: 3,
        title: "Sparq Systems CEO Interview - Dr. Praveen Jain",
        summary: "In this interview, Justin from Blaze Capital sits down with Dr. Praveen Jain, CEO of Sparq Systems, a company revolutionizing solar energy with its next generation single-phase microinverters.",
        date: new Date("2025-01-22"),
        url: "https://www.youtube.com/watch?v=8OJ02vvC-Os",
    },
    {
        id: 4,
        title: "SPARQ Exhibits Its QUAD Microinverters at Intersolar India",
        summary: "Dr. Praveen Jain, the Company's Chief Executive Officer, commented, \"We are excited to walk the floors of one of the world's largest trade shows after a three year hiatus.  We are looking forward to meeting with our customers and suppliers to show off our latest microinverter products specifically designed for the Indian market\".",
        date: new Date("2022-12-02"),
        url: "https://finance.yahoo.com/news/sparq-exhibits-quad-microinverters-intersolar-122500923.html"
    },

]

/*
Todo:

1 Render icon for video/text
    a. Pull code out into a <EventItems/> component
    b. Extract out a single <{Event | News}Item subcomponent in the component file
2. Develop admin portal for others to easily add news items / events
    a. Perhaps differentiate between automatically pulled items and custom ones
3. Pull the hardcoded events/news items out to a database on the backend
    a. Develop POST endpoints to facilitate 2a easier
*/

export default function EventPage() {

    let curDate = new Date()

    return (
        <section id="events" className="items-center justify-center px-4">
            <h1 className="text-center text-5xl font-light mt-16">Events</h1>
            <hr className="mb-16 mt-2 text-slate-300" />
            <h2 className="text-3xl font-light">Upcoming</h2>
            <div className="flex flex-col px-10 pb-8">
                {/* Events that are in the future, based on new Date() */}
                {events.map((item) => (
                    <div>
                        {item.date > curDate && (
                            <div className="relative my-4 p-4 pb-10 border-b shadow bg-slate-50 border-slate-200" key={item.id}>
                                <Link href={item.url} target="_blank">
                                    <h1 className="text-brand-maroon font-mono text-xl hover:underline">{item.title}</h1>
                                </Link>
                                <p className="text-lg">{item.summary}</p>
                                <Link href={item.url} className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" target="_blank">
                                    Read More<FaArrowRight className="ml-2 mt-1 text-black" />
                                </Link>
                                <p className="absolute font-bold bottom-2 left-4">{item.date.toDateString()}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <h2 className="text-3xl font-light">Archived</h2>
            <div className="flex flex-col px-10 pb-8">
                {/* Events that are in the past, based on new Date() */}
                {events.map((item) => (
                    <div>
                        {item.date <= curDate && (
                            <div className="relative my-4 p-4 pb-10 border-b shadow bg-slate-50 border-slate-200" key={item.id}>
                                <Link href={item.url} target="_blank">
                                    <h1 className="text-brand-maroon font-mono text-xl hover:underline">{item.title}</h1>
                                </Link>
                                <p className="text-lg">{item.summary}</p>
                                <Link href={item.url} className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" target="_blank">
                                    Read More<FaArrowRight className="ml-2 mt-1 text-black" />
                                </Link>
                                <p className="absolute font-bold bottom-2 left-4">{item.date.toDateString()}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </section>
    )
}