'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

interface NewsItem {
    id: string
    title: string
    summary: string
    canonical_url: string
}

export default function TestPage() {

    const [data, setData] = useState<NewsItem[]>([])

    useEffect(() => {
        fetch('/api/news')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Fetch error:', error));

    }, []);

    return (
        <div>
            {data.length > 0 && data.map((item, index) => (
                    <div className="relative pb-8 mt-8" key={index}>
                        <Link href={item.canonical_url} target="_blank">
                            <h1 className="text-brand-maroon font-mono text-3xl hover:underline">{item.title}</h1>
                        </Link>
                        <p className="text-xl">{item.summary}</p>
                        <Link href={item.canonical_url} className="absolute bottom-0 right-0 flex cursor-pointer text-blue-400 hover:underline" target="_blank">Read More<FaArrowRight className="ml-2 text-black" /></Link>
                    </div>
                ))}
        </div>

    )
}