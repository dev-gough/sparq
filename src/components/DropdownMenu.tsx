'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['500', '800'],
});

interface NavItem {
    label: string;
    href: string;
    dropdown?: NavItem[];
}

interface DropdownMenuProps {
    navItem: NavItem;
}

export default function DropdownMenu({ navItem }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        // Clear any pending timeout to close the dropdown
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        // Set a timeout to close the dropdown after a 100ms delay
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 50);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center">
                {/* Main label as a clickable link */}
                <Link
                    href={navItem.href}
                    className={`text-white px-1 py-1 text-md rounded hover:text-gray-300 ${nunito.className}`}
                >
                    {navItem.label}
                </Link>
                {/* Toggle button for dropdown */}
                <button className="text-white hover:text-gray-300">
                    ▼
                </button>
            </div>
            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md rounded-md">
                    {navItem.dropdown && navItem.dropdown.map((subItem, index) => (
                        <Link
                            key={index}
                            href={subItem.href}
                            className="block px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {subItem.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}