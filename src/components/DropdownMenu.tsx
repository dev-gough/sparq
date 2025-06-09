'use client'

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

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
        <motion.div
            className="relative z-[99]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseLeave}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
        >
            <Link
                href={navItem.href}
                className={`relative flex items-center gap-1 px-4 py-2 text-lg font-medium transition-all duration-300 rounded-lg ${
                    isParentActive
                        ? 'text-brand-maroon bg-brand-maroon/5'
                        : 'text-brand-graytext hover:text-brand-maroon hover:bg-brand-maroon/5'
                }`}
            >
                <span>{navItem.label}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
                {isParentActive && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-maroon rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </Link>

            {/* Dropdown menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.320, 1] }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md shadow-xl rounded-xl border border-brand-maroon/10 overflow-hidden"
                    >
                        <div className="py-2">
                            {navItem.dropdown && navItem.dropdown.map((subItem, index) => {
                                const isSubActive = pathname === subItem.href;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={subItem.href}
                                            className={`block px-4 py-3 mx-2 text-base font-medium transition-all duration-200 rounded-lg ${
                                                isSubActive
                                                    ? 'text-brand-maroon bg-brand-maroon/10'
                                                    : 'text-brand-graytext hover:text-brand-maroon hover:bg-brand-maroon/5'
                                            }`}
                                            aria-current={isSubActive ? 'page' : undefined}
                                        >
                                            {subItem.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}