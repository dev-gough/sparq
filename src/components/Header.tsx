'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DropdownMenu from './DropdownMenu'
import { Menu, X } from 'lucide-react'

interface NavItem {
    href: string
    label: string
    dropdown?: NavItem[]
}

interface HeaderProps {
    navItems: NavItem[]
}
export default function Header({ navItems }: HeaderProps) {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-[999] bg-white/90 backdrop-blur-md border-b border-brand-maroon/30 shadow-sm h-[75px]"
        >
            <div className="container mx-auto flex justify-center items-center px-6 h-full relative">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-6"
                >
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Image src="/logo.png" alt="Sparq Systems" width={85} height={55} className="h-auto" />
                    </Link>
                </motion.div>

                {/* Desktop Navigation - Centered */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navItems.map((item, index) => {
                        const isActive = item.dropdown
                            ? item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                            : pathname === item.href

                        return item.dropdown ? (
                            <DropdownMenu key={index} navItem={item} isActive={isActive} />
                        ) : (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 rounded-lg ${isActive
                                            ? 'text-brand-maroon bg-brand-maroon/5'
                                            : 'text-brand-graytext hover:text-brand-maroon hover:bg-brand-maroon/5'
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-maroon rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        )
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="lg:hidden p-2 rounded-lg bg-brand-maroon/5 text-brand-maroon hover:bg-brand-maroon/10 transition-colors absolute right-6"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white/95 backdrop-blur-md border-t border-brand-maroon/10"
                    >
                        <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {navItems.map((item, index) => {
                                const isActive = item.dropdown
                                    ? item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                                    : pathname === item.href

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${isActive
                                                    ? 'text-brand-maroon bg-brand-maroon/10'
                                                    : 'text-brand-graytext hover:text-brand-maroon hover:bg-brand-maroon/5'
                                                }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}