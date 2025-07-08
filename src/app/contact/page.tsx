'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaSitemap } from 'react-icons/fa'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'


interface ContactSectionProps {
	title: string
	companyName: string
	address?: string
	phone?: string
	email?: string
	website?: string
	index?: number
}

function ContactSection({ title, companyName, address, phone, email, website, index = 0 }: ContactSectionProps) {

	const trackEvent = useTrackEvent()

	const handleClick = (type: string, detail: string) => {
		trackEvent("contact_clicked", {
			"contact_type": type,
			"detail": detail
		})
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.1 * index }}
			className="group"
		>
			<Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0 h-full bg-white dark:bg-gray-700">
				<CardContent className="p-6 h-full flex flex-col">
					<div className="flex items-start gap-4 mb-6">
						<div className="flex items-center justify-center w-12 h-12 min-w-[3rem] min-h-[3rem] bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white flex-shrink-0">
							<FaMapMarkerAlt className="w-5 h-5" />
						</div>
						<div className="flex-1">
							<h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow leading-tight">{title}</h3>
							<p className="text-lg font-semibold text-brand-graytext dark:text-dark-text-secondary">{companyName}</p>
						</div>
					</div>

					<div className="space-y-4 flex-grow">
						{address && (
							<div className="flex items-start gap-3">
								<FaMapMarkerAlt className="w-4 h-4 mt-1 text-brand-maroon flex-shrink-0" />
								<p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
									{address.split('\n').map((line, index) => (
										<span key={index}>
											{line}
											<br />
										</span>
									))}
								</p>
							</div>
						)}
						{phone && (
							<div className="flex items-center gap-3">
								<FaPhone className="w-4 h-4 text-brand-maroon flex-shrink-0" />
								<Link
									onClick={() => handleClick("phone", phone)}
									href={`tel:${phone}`}
									className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-medium transition-colors duration-200"
								>
									{phone}
								</Link>
							</div>
						)}
						{email && (
							<div className="flex items-center gap-3">
								<FaEnvelope className="w-4 h-4 text-brand-maroon flex-shrink-0" />
								<Link
									onClick={() => handleClick("email", email)}
									href={`mailto:${email}`}
									className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-medium transition-colors duration-200"
								>
									{email}
								</Link>
							</div>
						)}
						{website && (
							<div className="flex items-center gap-3">
								<FaSitemap className="w-4 h-4 text-brand-maroon flex-shrink-0" />
								<Link
									onClick={() => handleClick("website", website)}
									href={website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-medium transition-colors duration-200"
								>
									{website}
								</Link>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default function ContactPage() {
	const heroRef = useRef(null)
	const isHeroInView = useInView(heroRef, { once: true })

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
			<SolarBackgroundElements />

			{/* Hero Section */}
			<section className="relative container mx-auto px-6 pt-10 sm:pb-16">
				<motion.div
					ref={heroRef}
					initial={{ opacity: 0, y: 50 }}
					animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
					className="text-center mb-10"
				>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
						<span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
							Contact
						</span>
						<br />
						<span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
							Sparq Systems
						</span>
					</h1>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12"
					>
						Connect with our global network of offices and distribution partners to discover
						how Sparq microinverter technology can power your solar projects.
					</motion.p>
				</motion.div>
			</section>

			{/* Our Offices Section */}
			<section className="relative bg-white dark:bg-gray-900 py-10">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
							Our Offices
						</h2>
						<p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
							Reach out to our global offices for sales inquiries, technical support, and partnership opportunities.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
						<ContactSection
							title="Head Office - Canada"
							companyName='Sparq Systems Inc.'
							address={`945 Princess Street\nKingston, Ontario, Canada\nK7L 0E9`}
							phone='855-947-7277'
							email='sales@sparqsys.com'
							website='https://www.sparqsys.com/'
							index={0}
						/>
						<ContactSection
							title="Office - India"
							companyName="Sparq Systems India Pvt. Ltd."
							email="sgupta@sparqsys.com"
							phone='(+91) 9810 899 033'
							index={1}
						/>
					</div>
				</div>
			</section>

			{/* Distribution Partners Section */}
			<section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.7 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
							How to Order
						</h2>
						<p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
							Contact our authorized distribution partners worldwide for product orders and local support.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
						<ContactSection
							title="India Distribution & Service"
							companyName="Jio Things Ltd."
							website='https://www.jiothings.com/'
							email='sales@jiothings.com'
							index={0}
						/>
						<ContactSection
							title="Africa, Australia, Gulf, Southeast Asia Distribution & Service"
							companyName="Rolaz Green Energy PVT. Ltd."
							address={`Kalypso Tower 4, Unit 1202\nJaypee Greens Wish Town, Sector 128\nNoida, Uttar Pradesh, India 201304`}
							phone="(+91) 8595 414 392"
							email="info@rolazge.com"
							website='http://www.rolazge.com/'
							index={1}
						/>
						<ContactSection
							title="North America Distributer"
							companyName='GPSI Solar'
							address={`131 Sheldon Drive, Unit 22\nCambridge, Ontario, Canada\nN1R 6S2`}
							phone='519-645-9649'
							email='sales@gpsi.solar'
							website='https://www.gpsi.ca/Solar-EV.htm'
							index={2}
						/>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="relative bg-gradient-to-br from-brand-maroon to-brand-darkmaroon py-10">
				<div className="container mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.0 }}
					>
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
							Ready to Get Started?
						</h2>
						<p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
							Whether you&apos;re an installer, homeowner, or investor, our team is ready to help you
							harness the power of advanced microinverter technology.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
							<a href="/installers">
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									className="w-full sm:w-auto px-8 py-4 bg-white text-brand-maroon font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
								>
									For Installers
								</motion.button>
							</a>
							<a href="/homeowners">
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
								>
									For Homeowners
								</motion.button>
							</a>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}