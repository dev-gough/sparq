'use client'

import { useState } from 'react'

import SupportTicketForm from './SupportTicket';

export default function SupportButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-3 py-1 text-xl rounded text-white hover:text-gray-300 cursor-pointer"
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
        </>
    );
}