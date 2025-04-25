'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

interface NewsItem {
	id: string
	title: string
	summary: string
	date: string
	canonical_url: string
}

export default function NewsItems() {

	const [data, setData] = useState<NewsItem[]>([])

	useEffect(() => {
		fetch('/api/news')
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch((error) => console.error('Fetch error:', error));

	}, []);

	return (
		<div className="flex flex-col gap-10 px-10 pb-8">
			{data.length > 0 && data.map((item, index) => (
				<div className="relative p-4 pb-10 border-b shadow bg-slate-50 border-slate-200" key={index}>
					<Link href={item.canonical_url} target="_blank">
						<h1 className="text-brand-maroon font-mono text-xl hover:underline">{item.title}</h1>
					</Link>
					<p className="text-lg">{item.summary}</p>
					<Link href={item.canonical_url} className="absolute bottom-2 right-2 flex cursor-pointer text-blue-400 hover:underline" target="_blank">
						Read More<FaArrowRight className="ml-2 mt-1 text-black" />
					</Link>
					<p className="absolute font-bold bottom-2 left-4">{new Date(item.date).toDateString()}</p>
				</div>
			))}
		</div>
	)
}