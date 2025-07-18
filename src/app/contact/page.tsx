'use client'

import Link from 'next/link'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaSitemap } from 'react-icons/fa'
import { useTrackEvent } from '@/hooks/useTrackEvent'

interface ContactSectionProps {
	title: string
	companyName: string
	address?: string
	phone?: string
	email?: string
	website?: string
}

function ContactSection({ title, companyName, address, phone, email, website }: ContactSectionProps) {

	const trackEvent = useTrackEvent()

	const handleClick = (type: string, detail: string) => {
		trackEvent("contact_clicked", {
			"contact_type" : type,
			"detail" : detail
		})
	}

	return (
		<div className="bg-white p-6 border border-brand-gray rounded-lg shadow-md">
			<h3 className="text-xl font-bold mb-4 bg-gray-100 p-2 rounded">{title}</h3>
			<p className="text-lg font-semibold mb-2">{companyName}</p>
			{address && (
				<div className="flex items-start mb-2">
					<FaMapMarkerAlt className="mr-2 mt-1 text-gray-600" />
					<p className="text-gray-700">
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
				<div className="flex items-center mb-2">
					<FaPhone className="mr-2 text-gray-600" />
					<Link onClick={() => handleClick("phone", phone)} href={`tel:${phone}`} className="text-blue-500 hover:underline">
						{phone}
					</Link>
				</div>
			)}
			{email && (
				<div className="flex items-center mb-2">
					<FaEnvelope className="mr-2 text-gray-600" />
					<Link onClick={() => handleClick("email", email)} href={`mailto:${email}`} className="text-blue-500 hover:underline">
						{email}
					</Link>
				</div>
			)}
			{website && (
				<div className="flex items-center">
					<FaSitemap className='mr-2 text-gray-600'/>
					<Link onClick={() => handleClick("website", website)} href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
						{website}
					</Link>
				</div>
			)}
		</div>
	)
}

export default function ContactPage() {
	return (
		<div className="container mx-auto 3xl:px-48 px-4 my-8 sm:px-10 sm:my-16">
			<h2 className="text-5xl font-bold text-center mb-8 text-brand-maroon">Contact Us</h2>
			<section className='flex flex-col gap-6'>
				<ContactSection
					title="Head Office - Canada"
					companyName='Sparq Systems Inc.'
					address={`945 Princess Street\nKingston, Ontario, Canada\nK7L 0E9`}
					phone='855-947-7277'
					email='sales@sparqsys.com'
					website='https://www.sparqsys.com/'
				/>
				<ContactSection
					title="Office - India"
					companyName="Sparq Systems India Pvt. Ltd."
					email="sgupta@sparqsys.com"
					phone='(+91) 9810 899 033'
				/>
			</section>
			<h3 className='text-xl font-semibold mt-16 mb-4 text-brand-maroon'>How to Order</h3>
			<section className="flex flex-col gap-6">
				<ContactSection
					title="India Distribution & Service"
					companyName="Jio Things Ltd."
					website='https://www.jiothings.com/'
					email='sales@jiothings.com'
				/>
				<ContactSection
					title="Africa, Australia, Gulf, Southeast Asia Distribution & Service "
					companyName="Rolaz Green Energy PVT. Ltd."
					phone="(+91) 8595 414 392"
					email="devesh.g@rolazge.com"
				/>
				<ContactSection
					title="North America Distributer"
					companyName='GPSI Solar'
					address={`131 Sheldon Drive, Unit 22\nCambridge, Ontario, Canada\nN1R 6S2`}
					phone='519-645-9649'
					email='sales@gpsi.solar'
					website='https://www.gpsi.ca/Solar-EV.htm'
				/>
			</section>
		</div>
	)
}