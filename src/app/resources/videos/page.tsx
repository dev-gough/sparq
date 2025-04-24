'use client'

import YTVideo from "@/components/YTVideo"

const installer_ids = [
    "5u3KVFYHfk0",
    "4Ngk_vP-dIQ",
    "nhH8LrnONxs",
]

const investor_ids = [
    "gaFi_dPnYNk",
    "I3an6Yqga1Y",
    "8OJ02vvC-Os",
    "am7VzIpn5TI",

]

const homeowner_ids = [
    "Ibs0snk6nH0",

]

export default function VideosPage() {
    return (
        <div className="bg-white container mx-auto pb-4">
            <h1 className="text-5xl font-bold text-brand-maroon text-center mb-8">
                Video Gallery
            </h1>
            <div>
                <h2 className="text-3xl font-bold text-brand-maroon pt-8">Investors</h2>
                <hr className="pb-4"/>
                <YTVideo videoIds={investor_ids} />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-brand-maroon pt-8">Installers</h2>
                <hr className="pb-4"/>
                <YTVideo videoIds={installer_ids} />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-brand-maroon pt-8">Homeowners</h2>
                <hr className="pb-4"/>
                <YTVideo videoIds={homeowner_ids} />
            </div>
        </div>
    )
}