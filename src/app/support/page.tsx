'use client'

import { useState, useMemo } from "react"
import { Card, CardContent } from '@/components/ui/card'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'
import Script from 'next/script'
import { useTrackEvent, trackGenerateLead } from '@/hooks/useTrackEvent'

// Extend Window interface for reCAPTCHA
declare global {
	interface Window {
		grecaptcha: {
			ready: (callback: () => void) => void
			execute: (siteKey: string, options: { action: string }) => Promise<string>
		}
	}
}

const CATEGORY_EMAIL_MAP = {
	ir: "ir@sparqsys.com",
	"tech support": "support@sparqsys.com",
} as const

type Category = keyof typeof CATEGORY_EMAIL_MAP


export default function SupportTicketPage() {
	useTrackEvent()
	const [category, setCategory] = useState<"" | Category>("")
	const [formData, setFormData] = useState({
		userEmail: '',
		ccEmail: '',
		subject: '',
		message: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

	const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

	const email = useMemo(() => {
		return category ? CATEGORY_EMAIL_MAP[category] : "info@sparqsys.com"
	}, [category])

	const handleInputChange = (field: keyof typeof formData) => (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData(prev => ({
			...prev,
			[field]: e.target.value
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!formData.userEmail || !formData.subject || !formData.message) {
			setErrorMessage('Please fill in all required fields')
			setSubmitStatus('error')
			return
		}

		setIsSubmitting(true)
		setSubmitStatus('idle')
		setErrorMessage('')

		try {
			// Get reCAPTCHA token
			let recaptchaToken = ''
			if (recaptchaLoaded && window.grecaptcha && siteKey) {
				try {
					recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit_support_ticket' })
				} catch (error) {
					console.error('reCAPTCHA error:', error)
					setErrorMessage('Security verification failed. Please refresh the page and try again.')
					setSubmitStatus('error')
					setIsSubmitting(false)
					return
				}
			}

			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					category: category || 'General Support',
					supportEmail: email,
					ccEmail: formData.ccEmail,
					subject: formData.subject,
					message: formData.message,
					userEmail: formData.userEmail,
					recaptchaToken,
				}),
			})

			const result = await response.json()

			if (response.ok) {
				setSubmitStatus('success')
				trackGenerateLead({
					lead_source: 'support_form',
					category: category || 'General Support',
				})
				// Reset form
				setFormData({
					userEmail: '',
					ccEmail: '',
					subject: '',
					message: ''
				})
				setCategory("")
			} else {
				setErrorMessage(result.error || 'Failed to send email')
				setSubmitStatus('error')
			}
		} catch {
			setErrorMessage('Network error. Please try again.')
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
			{/* Load reCAPTCHA v3 */}
			{siteKey && (
				<Script
					src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
					onLoad={() => setRecaptchaLoaded(true)}
					strategy="lazyOnload"
				/>
			)}

			<SolarBackgroundElements />
			
			{/* Hero Section */}
			<section className="relative container mx-auto px-6 pt-10 pb-8">
				<div
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

					<p
						className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-6"
					>
						Our technical support team is here to help with installation questions, 
						warranty claims, and product guidance.
					</p>
				</div>
			</section>

			{/* Support Form Section */}
			<section className="relative bg-white dark:bg-gray-900 py-10">
				<div className="container mx-auto px-6">
					<div className="max-w-2xl mx-auto">
						<div
						>
							<Card className="overflow-hidden border-0 shadow-2xl py-0 bg-white dark:bg-gray-700">
								<CardContent className="p-8">
									<div className="flex items-center gap-4 mb-8">
										<div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white">
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
											</svg>
										</div>
										<div>
											<h2 className="text-xl sm:text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow">Submit a Support Ticket</h2>
											<p className="text-brand-graytext dark:text-dark-text-secondary">Choose your issue category for specialized support</p>
										</div>
									</div>

									<form className="space-y-6" onSubmit={handleSubmit}>
										{/* Category Dropdown */}
										<div>
											<label htmlFor="category" className="block text-sm font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
												Issue Category
											</label>
											<select
												id="category"
												name="category"
												value={category}
												onChange={(e) => setCategory(e.target.value as Category | "")}
												className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900/90 p-3 text-brand-darkmaroon dark:text-dark-text-primary shadow-sm focus:border-brand-maroon dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-maroon/20 dark:focus:ring-brand-yellow/20 transition-all duration-200"
											>
												<option value="">General Support</option>
												<option value="ir">Investor Relations</option>
												<option value="tech support">Tech Support</option>
											</select>
										</div>

										{/* User Email Field */}
										<div>
											<label htmlFor="userEmail" className="block text-sm font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
												Your Email Address <span className="text-red-500">*</span>
											</label>
											<input
												id="userEmail"
												type="email"
												value={formData.userEmail}
												onChange={handleInputChange('userEmail')}
												placeholder="your.email@example.com"
												required
												className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 p-3 text-brand-darkmaroon dark:text-gray-200 bg-white dark:bg-gray-900/90 shadow-sm focus:border-brand-maroon dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-maroon/20 dark:focus:ring-brand-yellow/20 transition-all duration-200"
											/>
										</div>

										{/* Support Email Field */}
										<div>
											<label htmlFor="supportEmail" className="block text-sm font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
												Will be sent to
											</label>
											<input
												id="supportEmail"
												type="email"
												value={email}
												disabled
												readOnly
												className="w-full cursor-not-allowed rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/70 p-3 text-brand-graytext dark:text-dark-text-muted shadow-sm"
											/>
										</div>

										<div>
											<label htmlFor="ccEmail" className="block text-sm font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
												CC Email
											</label>
											<input
												id="ccEmail"
												type="email"
												value={formData.ccEmail}
												onChange={handleInputChange('ccEmail')}
												placeholder="Optional..."
												className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 p-3 text-brand-darkmaroon dark:text-gray-200 bg-white dark:bg-gray-900/90 shadow-sm focus:border-brand-maroon dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-maroon/20 dark:focus:ring-brand-yellow/20 transition-all duration-200"
											/>
										</div>

										{/* Subject */}
										<div>
											<label htmlFor="subject" className="block text-sm font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
												Subject <span className="text-red-500">*</span>
											</label>
											<input
												id="subject"
												type="text"
												value={formData.subject}
												onChange={handleInputChange('subject')}
												placeholder="Brief description"
												required
												className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 p-3 text-brand-darkmaroon dark:text-gray-200 bg-white dark:bg-gray-900/90 shadow-sm focus:border-brand-maroon dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-maroon/20 dark:focus:ring-brand-yellow/20 transition-all duration-200"
											/>
										</div>

										{/* Message */}
										<div>
											<label htmlFor="message" className="block text-sm font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
												Message <span className="text-red-500">*</span>
											</label>
											<textarea
												id="message"
												rows={4}
												value={formData.message}
												onChange={handleInputChange('message')}
												placeholder="Describe your issue in detail..."
												required
												className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 p-3 text-brand-darkmaroon dark:text-dark-text-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-900/90 shadow-sm focus:border-brand-maroon dark:focus:border-brand-yellow focus:ring-2 focus:ring-brand-maroon/20 dark:focus:ring-brand-yellow/20 transition-all duration-200 resize-none"
											/>
										</div>

										{/* Status Messages */}
										{submitStatus === 'success' && (
											<div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
												<div className="flex items-center">
													<svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
													</svg>
													<p className="text-green-700 dark:text-green-300 font-semibold">
														Support ticket submitted successfully! We&apos;ll get back to you soon.
													</p>
												</div>
											</div>
										)}

										{submitStatus === 'error' && (
											<div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
												<div className="flex items-center">
													<svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													<p className="text-red-700 dark:text-red-300 font-semibold">
														{errorMessage}
													</p>
												</div>
											</div>
										)}

										<button
											type="submit"
											disabled={isSubmitting}
											className={`w-full rounded-xl px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 ${
												isSubmitting 
													? 'bg-gray-400 cursor-not-allowed' 
													: 'bg-gradient-to-r from-brand-maroon to-brand-logo hover:shadow-xl cursor-pointer'
											}`}
										>
											{isSubmitting ? (
												<div className="flex items-center justify-center">
													<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
														<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
														<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
													</svg>
													Sending...
												</div>
											) : (
												'Submit Support Ticket'
											)}
										</button>
									</form>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Additional Support Options */}
			<section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
				<div className="container mx-auto px-6">
					<div
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
							Other Ways to Get Help
						</h2>
						<p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
							Explore additional resources and support channels for quick assistance.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div
						>
							<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full bg-white dark:bg-gray-700">
								<CardContent className="p-6 text-center h-full flex flex-col">
									<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">Documentation</h3>
									<p className="text-brand-graytext dark:text-dark-text-secondary flex-grow mb-6">Access installation guides, technical specifications, and troubleshooting resources.</p>
									<a href="/resources" className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-semibold transition-colors duration-200">
										Browse Resources →
									</a>
								</CardContent>
							</Card>
						</div>

						<div
						>
							<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full bg-white dark:bg-gray-700">
								<CardContent className="p-6 text-center h-full flex flex-col">
									<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">Direct Contact</h3>
									<p className="text-brand-graytext dark:text-dark-text-secondary flex-grow mb-6">Speak directly with our support team for urgent technical assistance.</p>
									<a href="/contact" className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-semibold transition-colors duration-200">
										Contact Us →
									</a>
								</CardContent>
							</Card>
						</div>

						<div
						>
							<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 py-0 h-full bg-white dark:bg-gray-700">
								<CardContent className="p-6 text-center h-full flex flex-col">
									<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full mx-auto mb-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">FAQ</h3>
									<p className="text-brand-graytext dark:text-dark-text-secondary flex-grow mb-6">Find quick answers to frequently asked questions about our products.</p>
									<a href="/resources#faq" className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-semibold transition-colors duration-200">
										View FAQ →
									</a>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
