'use client'

import { useState, useMemo, useRef } from "react"
import { motion, useInView } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'

const CATEGORY_EMAIL_MAP = {
	technical: "technical-q@sparqsys.com",
	installation: "install@sparqsys.com",
	warranty: "warranty@sparqsys.com",
	"tech support": "support@sparqsys.com",
	sales: "sales@sparqsys.com",
	ux: "ux@sparqsys.com",
} as const

type Category = keyof typeof CATEGORY_EMAIL_MAP

const backgroundShapes = [
    { width: 200, height: 140, left: 5, top: 15, duration: 18, delay: 0.5, borderRadius: '60% 40% 30% 70%' },
    { width: 120, height: 180, left: 85, top: 25, duration: 20, delay: 1.2, borderRadius: '40% 60% 60% 40%' },
    { width: 240, height: 100, left: 45, top: 35, duration: 17, delay: 2.1, borderRadius: '30% 70% 70% 30%' },
    { width: 140, height: 140, left: 90, top: 65, duration: 19, delay: 0.8, borderRadius: '50%' },
    { width: 160, height: 220, left: 15, top: 75, duration: 21, delay: 1.8, borderRadius: '70% 30% 50% 50%' },
    { width: 100, height: 100, left: 70, top: 90, duration: 16, delay: 2.5, borderRadius: '50%' }
]

function BackgroundElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-br from-brand-maroon/5 via-brand-logo/3 to-brand-yellow/2"
                    style={{
                        width: shape.width,
                        height: shape.height,
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                        borderRadius: shape.borderRadius,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.15, 1],
                        rotate: [0, 360],
                        borderRadius: [
                            shape.borderRadius,
                            shape.borderRadius === '50%' ? '30% 70% 70% 30%' : '50%',
                            shape.borderRadius
                        ]
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

export default function SupportTicketPage() {
	const [category, setCategory] = useState<"" | Category>("")
	const heroRef = useRef(null)
	const isHeroInView = useInView(heroRef, { once: true })

	const email = useMemo(() => {
		return category ? CATEGORY_EMAIL_MAP[category] : "info@sparqsys.com"
	}, [category])

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 relative">
			<BackgroundElements />
			
			{/* Hero Section */}
			<section className="relative container mx-auto px-6 pt-10 pb-8">
				<motion.div
					ref={heroRef}
					initial={{ opacity: 0, y: 50 }}
					animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
					className="text-center mb-6"
				>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
						<span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
							Get Expert
						</span>
						<br />
						<span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
							Support
						</span>
					</h1>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-xl md:text-2xl text-brand-graytext max-w-4xl mx-auto leading-relaxed mb-6"
					>
						Our technical support team is here to help with installation questions, 
						warranty claims, and product guidance.
					</motion.p>
				</motion.div>
			</section>

			{/* Support Form Section */}
			<section className="relative bg-white py-10">
				<div className="container mx-auto px-6">
					<div className="max-w-2xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							<Card className="overflow-hidden border-0 shadow-2xl py-0">
								<CardContent className="p-8">
									<div className="flex items-center gap-4 mb-8">
										<div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white">
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
											</svg>
										</div>
										<div>
											<h2 className="xs:text-xl text-2xl font-bold text-brand-darkmaroon">Submit a Support Ticket</h2>
											<p className="text-brand-graytext">Choose your issue category for specialized support</p>
										</div>
									</div>

									<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
										{/* Category Dropdown */}
										<div>
											<label htmlFor="category" className="block text-sm font-semibold text-brand-darkmaroon mb-2">
												Issue Category
											</label>
											<select
												id="category"
												name="category"
												value={category}
												onChange={(e) => setCategory(e.target.value as Category | "")}
												className="w-full rounded-lg border-2 border-gray-200 bg-white p-3 text-brand-darkmaroon shadow-sm focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20 transition-all duration-200"
											>
												<option value="">General Support</option>
												<option value="technical">Technical Question</option>
												<option value="installation">Installation</option>
												<option value="warranty">Warranty</option>
												<option value="tech support">Tech Support</option>
												<option value="sales">Sales</option>
												<option value="ux">UX</option>
											</select>
										</div>

										{/* Email Field */}
										<div>
											<label htmlFor="supportEmail" className="block text-sm font-semibold text-brand-darkmaroon mb-2">
												Support Email
											</label>
											<input
												id="supportEmail"
												type="email"
												value={email}
												disabled
												readOnly
												className="w-full cursor-not-allowed rounded-lg border-2 border-gray-200 bg-gray-50 p-3 text-brand-graytext shadow-sm"
											/>
										</div>

										<div>
											<label htmlFor="ccEmail" className="block text-sm font-semibold text-brand-darkmaroon mb-2">
												CC Email
											</label>
											<input
												id="ccEmail"
												type="email"
												placeholder="Optional..."
												className="w-full rounded-lg border-2 border-gray-200 p-3 text-brand-darkmaroon shadow-sm focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20 transition-all duration-200"
											/>
										</div>

										{/* Subject */}
										<div>
											<label htmlFor="subject" className="block text-sm font-semibold text-brand-darkmaroon mb-2">
												Subject
											</label>
											<input
												id="subject"
												type="text"
												placeholder="Brief description"
												className="w-full rounded-lg border-2 border-gray-200 p-3 text-brand-darkmaroon shadow-sm focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20 transition-all duration-200"
											/>
										</div>

										{/* Message */}
										<div>
											<label htmlFor="message" className="block text-sm font-semibold text-brand-darkmaroon mb-2">
												Message
											</label>
											<textarea
												id="message"
												rows={4}
												placeholder="Describe your issue in detail..."
												className="w-full rounded-lg border-2 border-gray-200 p-3 text-brand-darkmaroon shadow-sm focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20 transition-all duration-200 resize-none"
											/>
										</div>

										<motion.button
											type="submit"
											whileHover={{ scale: 1.02, y: -2 }}
											whileTap={{ scale: 0.98 }}
											className="w-full rounded-xl bg-gradient-to-r from-brand-maroon to-brand-logo px-6 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
										>
											Submit Support Ticket
										</motion.button>
									</form>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Additional Support Options */}
			<section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 py-10">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon mb-6">
							Other Ways to Get Help
						</h2>
						<p className="text-xl text-brand-graytext max-w-3xl mx-auto">
							Explore additional resources and support channels for quick assistance.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.0 }}
						>
							<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full">
								<CardContent className="p-6 text-center h-full flex flex-col">
									<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-brand-darkmaroon mb-4">Documentation</h3>
									<p className="text-brand-graytext flex-grow mb-6">Access installation guides, technical specifications, and troubleshooting resources.</p>
									<a href="/resources" className="text-brand-maroon hover:text-brand-darkmaroon font-semibold transition-colors duration-200">
										Browse Resources →
									</a>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.1 }}
						>
							<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full">
								<CardContent className="p-6 text-center h-full flex flex-col">
									<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-brand-darkmaroon mb-4">Direct Contact</h3>
									<p className="text-brand-graytext flex-grow mb-6">Speak directly with our support team for urgent technical assistance.</p>
									<a href="/contact" className="text-brand-maroon hover:text-brand-darkmaroon font-semibold transition-colors duration-200">
										Contact Us →
									</a>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
						>
							<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full">
								<CardContent className="p-6 text-center h-full flex flex-col">
									<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-brand-darkmaroon mb-4">FAQ</h3>
									<p className="text-brand-graytext flex-grow mb-6">Find quick answers to frequently asked questions about our products.</p>
									<a href="/resources#faq" className="text-brand-maroon hover:text-brand-darkmaroon font-semibold transition-colors duration-200">
										View FAQ →
									</a>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	)
}
