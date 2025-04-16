import { useState } from 'react';

interface SupportTicketProps {
	className?: string
}

export default function SupportTicketForm({ className }: SupportTicketProps) {
	// State to manage form data
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		description: ''
	});

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData); // Log form data (replace with API call in a real app)
	};

	return (
		<div className={`max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-xl ${className}`}>
			<h2 className="text-2xl font-bold mb-6 text-center">Submit a Ticket</h2>
			<form onSubmit={handleSubmit}>
				{/* Name Field */}
				<div className="mb-4">
					<label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>

				{/* Email Field */}
				<div className="mb-4">
					<label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>

				{/* Subject Field */}
				<div className="mb-4">
					<label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
					<input
						type="text"
						id="subject"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>

				{/* Description Field */}
				<div className="mb-4">
					<label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						rows={4}
					></textarea>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					Submit Ticket
				</button>
			</form>
		</div>
	);
};
