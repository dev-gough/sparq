'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
    label: string;
    href: string;
    dropdown?: NavItem[];
}

interface DropdownMenuProps {
    navItem: NavItem;
    isActive: boolean
}

export default function DropdownMenu({ navItem }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

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

    // Determine if the parent item is active
    const isParentActive = navItem.href === '/' ? pathname === '/' : pathname.startsWith(navItem.href);

    return (
        <div
            className="relative z-[99]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseLeave}
        >
            <div className="flex items-center">
                <Link
                    href={navItem.href}
                    className={`px-1 py-1 text-lg lg:text-xl xl:text-[22px] rounded ${isParentActive
                            ? 'text-brand-yellow font-bold'
                            : 'text-white hover:text-gray-300'
                        }`}
                >
                    {navItem.label}
                    <button className="text-white hover:text-gray-300 cursor-pointer">
                        ▼
                    </button>
                </Link>

            </div>
            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-brand-graytext shadow-lg rounded-md border-t-4 border-t-brand-maroon">
                    {navItem.dropdown && navItem.dropdown.map((subItem, index) => {
                        // Determine if the dropdown item is active
                        const isSubActive = pathname === subItem.href;
                        return (
                            <Link
                                key={index}
                                href={subItem.href}
                                className={`block px-4 py-2 rounded text-xl ${isSubActive
                                        ? 'text-brand-yellow font-bold'
                                        : 'text-white hover:bg-brand-maroon'
                                    }`}
                                aria-current={isSubActive ? 'page' : undefined}
                            >
                                {subItem.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}