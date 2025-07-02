'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { FaArrowRight, FaCalendar, FaExternalLinkAlt } from "react-icons/fa"

interface NewsItem {
	id: string
	title: string
	summary: string
	date: string
	canonical_url: string
}

export default function NewsItems() {
	const [data, setData] = useState<NewsItem[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('/api/news')
			.then((res) => res.json())
			.then((data) => {
				setData(data)
				setLoading(false)
			})
			.catch((error) => {
				console.error('Fetch error:', error)
				setLoading(false)
			});
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-20">
				<div className="flex space-x-2">
					<motion.div
						animate={{ scale: [1, 1.5, 1] }}
						transition={{ duration: 1, repeat: Infinity, delay: 0 }}
						className="w-3 h-3 bg-brand-maroon rounded-full"
					/>
					<motion.div
						animate={{ scale: [1, 1.5, 1] }}
						transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
						className="w-3 h-3 bg-brand-logo rounded-full"
					/>
					<motion.div
						animate={{ scale: [1, 1.5, 1] }}
						transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
						className="w-3 h-3 bg-brand-yellow rounded-full"
					/>
				</div>
			</div>
		)
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center py-20"
			>
				<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
					<FaExternalLinkAlt className="w-8 h-8 text-white" />
				</div>
				<h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">No News Available</h3>
				<p className="text-brand-graytext dark:text-dark-text-secondary">Check back soon for the latest company updates and announcements.</p>
			</motion.div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
				className="text-center mb-16"
			>
				<h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
					Latest News
				</h2>
				<p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
					Stay up to date with our latest announcements, partnerships, and company developments.
				</p>
			</motion.div>

			<div className="space-y-8">
				{data.map((item, index) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
						className="group"
					>
						<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0 bg-white dark:bg-gray-700">
							<CardContent className="p-0">
								<div className="p-8">
									<div className="flex items-start justify-between gap-4 mb-4">
										<div className="flex-1">
											<Link href={item.canonical_url} target="_blank" rel="noopener noreferrer">
												<h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow group-hover:text-brand-maroon dark:group-hover:text-brand-logo transition-colors duration-300 mb-3 line-clamp-2">
													{item.title}
												</h3>
											</Link>
											<div className="flex items-center gap-2 text-brand-graytext dark:text-dark-text-muted mb-4">
												<FaCalendar className="w-4 h-4" />
												<span className="text-sm font-medium">
													{new Date(item.date).toLocaleDateString('en-US', {
														year: 'numeric',
														month: 'long',
														day: 'numeric'
													})}
												</span>
											</div>
										</div>
										<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white group-hover:scale-110 transition-transform duration-300">
											<FaExternalLinkAlt className="w-5 h-5" />
										</div>
									</div>

									<p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-6 line-clamp-3">
										{item.summary}
									</p>

									<div className="flex items-center justify-between">
										<Link
											href={item.canonical_url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-semibold transition-colors duration-200 group/link"
										>
											<span>Read Full Article</span>
											<FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
										</Link>
										<div className="px-3 py-1 bg-gradient-to-r from-brand-maroon/10 to-brand-logo/10 dark:from-brand-logo/20 dark:to-brand-yellow/20 rounded-full">
											<span className="text-sm font-medium text-brand-darkmaroon dark:text-brand-yellow">Company News</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>

			{data.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="text-center mt-16"
				>
					<Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700 dark:to-gray-600/50 py-0">
						<CardContent className="p-8">
							<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
								<FaExternalLinkAlt className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">
								Stay Connected
							</h3>
							<p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed mb-6">
								Follow us for real-time updates and subscribe to our investor communications
								to never miss important company announcements.
							</p>
							<Link href="/contact" className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-semibold transition-colors duration-200">
								Contact Investor Relations →
							</Link>
						</CardContent>
					</Card>
				</motion.div>
			)}
		</div>
	)
}