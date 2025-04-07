'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';

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
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 50);
    };

    return (
        <div
            className="relative z-[99]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center">
                {/* Main label as a clickable link */}
                <Link
                    href={navItem.href}
                    className="text-white px-1 py-1 text-md rounded hover:text-gray-300"
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
                <div className="absolute top-full left-0 mt-1 w-48 bg-brand-graytext shadow-lg rounded-md border-t-4 border-t-brand-maroon">
                    {navItem.dropdown && navItem.dropdown.map((subItem, index) => (
                        <Link
                            key={index}
                            href={subItem.href}
                            className="block px-4 py-2 rounded text-sm text-white hover:bg-brand-maroon"
                        >
                            {subItem.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}