'use client'

import { useState } from 'react'

import SupportTicketForm from './SupportTicket'

interface SupportProps {
    className?: string
}

export default function SupportButton({ className }: SupportProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={className}>
            <button
                onClick={() => setIsOpen(true)}
                className="sm:px-3 py-2 sm:py-1 sm:text-xl rounded text-white hover:text-gray-300 cursor-pointer"
            >
                Support
            </button>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]"
                    onClick={() => setIsOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <SupportTicketForm />
                    </div>
                </div>
            )}
        </div>
    );
}