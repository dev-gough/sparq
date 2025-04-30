'use client'

import { useState, useMemo } from "react"

const CATEGORY_EMAIL_MAP = {
	technical: "technical-q@sparqsys.com",
	installation: "install@sparqsys.com",
	warranty: "warranty@sparqsys.com",
	"tech support": "support@sparqsys.com",
	sales: "sales@sparqsys.com",
	ux: "ux@sparqsys.com",
} as const

type Category = keyof typeof CATEGORY_EMAIL_MAP

export default function SupportTicketPage() {
	const [category, setCategory] = useState<"" | Category>("")

	const email = useMemo(() => {
		return category ? CATEGORY_EMAIL_MAP[category] : "info@sparqsys.com"
	}, [category])

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
				<h1 className="mb-6 text-2xl font-bold text-gray-800">Submit a Support Ticket</h1>
				<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
					{/* Category Dropdown */}
					<div>
						<label htmlFor="category" className="block text-sm font-medium text-gray-700">
							Issue Category
						</label>
						<select
							id="category"
							name="category"
							value={category}
							onChange={(e) => setCategory(e.target.value as Category | "")}
							className="mt-1 w-full rounded-md border-gray-300 bg-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						>
							<option value="">Select an issue...</option>
							<option value="technical">Techincal Question</option>
							<option value="installation">Installation</option>
							<option value="warranty">Warranty</option>
							<option value="tech support">Tech Support</option>
							<option value="sales">Sales</option>
							<option value="ux">UX</option>
						</select>
					</div>

					{/* Email Field */}
					<div>
						<label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">
							Support Email
						</label>
						<input
							id="supportEmail"
							type="email"
							value={email}
							disabled
							readOnly
							className="mt-1 w-full cursor-not-allowed rounded-md border-gray-300 bg-gray-100 p-2 text-gray-600 shadow-sm"
						/>
					</div>
					<div>
						<label htmlFor="ccEmail" className="block text-sm font-medium text-gray-700">
							CC Email
						</label>
						<input
							id="ccEmail"
							type="email"
							placeholder="Optional..."
							className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
							
					</div>

					{/* Optional: Subject & Message */}
					<div>
						<label htmlFor="subject" className="block text-sm font-medium text-gray-700">
							Subject
						</label>
						<input
							id="subject"
							type="text"
							placeholder="Brief description"
							className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label htmlFor="message" className="block text-sm font-medium text-gray-700">
							Message
						</label>
						<textarea
							id="message"
							rows={4}
							placeholder="Describe your issue in detail..."
							className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<button
						type="submit"
						className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Submit Ticket
					</button>
				</form>
			</div>
		</main>
	)
}
