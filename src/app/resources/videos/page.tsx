'use client'

import YTVideo from "@/components/YTVideo"

const ids = [
    "gaFi_dPnYNk",
    "5u3KVFYHfk0",
    "I3an6Yqga1Y",
    "8OJ02vvC-Os",
    "Ibs0snk6nH0",
    "4Ngk_vP-dIQ",
    "am7VzIpn5TI",
    "nhH8LrnONxs",
]

export default function VideosPage() {
    return (
        <div className="bg-white container mx-auto pb-4">
            <h1 className="text-5xl font-bold text-brand-maroon text-center mb-8">
                Video Gallery
            </h1>
            <YTVideo videoIds={ids} />
        </div>
    )
}