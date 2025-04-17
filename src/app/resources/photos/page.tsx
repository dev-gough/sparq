'use client'
import { items } from "../page"
import Subheader from "@/components/Subheader"

export default function PhotosPage() {
    return (
        <div>
            <Subheader items={items} />
            <h1 className="text-5xl font-bold text-brand-maroon text-center mb-16">
                Photo Gallery
            </h1>
            <p className="font-mono">Need Content</p>
        </div>
    )
}