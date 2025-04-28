'use client'

import SitePhotosGallery from "@/components/PhotoGallery"

const photos = [
    {src: "/SLC/001.JPG"},
    {src: "/SLC/002.JPG"},
    {src: "/SLC/003.JPG"},
    {src: "/SLC/004.JPG"},
    {src: "/SLC/005.JPG"},
    {src: "/SLC/006.JPG"},
    {src: "/SLC/007.JPG"},
    {src: "/SLC/008.JPG"},
    {src: "/SLC/009.JPG"},
]


export default function PhotosPage() {
    return (
            <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
                <h1 className="text-5xl font-bold text-brand-maroon text-center mb-16">
                    Photo Gallery
                </h1>
                <SitePhotosGallery siteName="St. Lawrence College" photos={photos}/>
            </div>
    )
}