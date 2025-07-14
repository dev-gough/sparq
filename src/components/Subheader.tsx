'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { FaExternalLinkAlt } from 'react-icons/fa'

function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.scrollY
            const direction = scrollY > lastScrollY ? 'down' : 'up'

            if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
                setScrollDirection(direction)
            }
            setLastScrollY(scrollY > 0 ? scrollY : 0)
        }

        window.addEventListener('scroll', updateScrollDirection)
        return () => window.removeEventListener('scroll', updateScrollDirection)
    }, [scrollDirection, lastScrollY])

    return scrollDirection
}

function useHash(): string {
    const [hash, setHash] = useState<string>('')

    useEffect(() => {
        const updateHash = () => setHash(window.location.hash)
        updateHash()                               // set initial value
        window.addEventListener('hashchange', updateHash)
        return () => window.removeEventListener('hashchange', updateHash)
    }, [])

    return hash
}

function isExternalLink(href: string): boolean {
    try {
        // Handle relative URLs (internal links)
        if (href.startsWith('/') || href.startsWith('#')) {
            return false
        }

        // Parse the URL
        const url = new URL(href)
        const hostname = url.hostname

        // Check if it's localhost or sparqsys.com domain
        return !(
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname.endsWith('.sparqsys.com') ||
            hostname === 'sparqsys.com'
        )
    } catch {
        // If URL parsing fails, assume it's internal
        return false
    }
}

interface SubheadingItemProps {
    label: string
    href: string
    target?: string
}

function SubheadingItem({ label, href, target }: SubheadingItemProps) {
    const pathname = usePathname()        // e.g. “/investors”
    const hash = useHash()            // e.g. “#highlights” | ""

    const [targetPath, targetHash = ""] = href.split("#")
    const isExternal = isExternalLink(href)  // targetHash doesn’t include “#”

    const isActive =
        pathname === targetPath &&                       // same path
        (targetHash === "" || hash === `#${targetHash}`) // and-if present-same hash

    return (
        <motion.div
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
            className="relative"
        >
            <Link
                href={href}
                className={`relative flex flex-shrink-0 items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                    ? "text-brand-maroon dark:text-brand-yellow bg-brand-maroon/20 dark:bg-brand-yellow/20"
                    : "text-brand-graytext dark:text-dark-text-secondary hover:text-brand-maroon dark:hover:text-brand-yellow hover:bg-brand-maroon/20 dark:hover:bg-brand-yellow/20"
                    } whitespace-nowrap`}
                target={target ? target : (isExternal ? "_blank" : "")}
                rel={isExternal ? "noopener noreferrer" : ""}
            >
                <span className="text-base sm:text-lg">{label}</span>
                {isExternal && (
                    <FaExternalLinkAlt className="w-3 h-3 opacity-70" />
                )}
                {isActive && (
                    <motion.div
                        layoutId="activeSubTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-maroon dark:bg-brand-yellow rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </Link>
        </motion.div>
    )
}

interface SubheaderProps {
    items: SubheadingItemProps[]
}

export default function Subheader({ items }: SubheaderProps) {
    const scrollDirection = useScrollDirection()
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (scrollDirection === 'down') {
            setIsVisible(false)
        } else if (scrollDirection === 'up') {
            setIsVisible(true)
        }
    }, [scrollDirection])

    // Calculate dynamic width based on number of items
    const getMaxWidth = () => {
        if (items.length <= 3) return 'max-w-xl'
        if (items.length <= 5) return 'max-w-4xl'
        if (items.length <= 7) return 'max-w-6xl'
        return 'max-w-7xl'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : -100,
                scale: isVisible ? 1 : 0.95
            }}
            transition={{
                duration: 0.5,
                ease: [0.23, 1, 0.320, 1]
            }}
            className="sticky top-[75px] z-50 flex justify-center bg-white/95 dark:bg-gray-700/90"
        >
            <div className={`bg-white/95 dark:bg-gray-800/90 backdrop-blur-md border border-brand-maroon/10 dark:border-gray-700/50 shadow-lg rounded-b-xl ${getMaxWidth()} mx-3 sm:mx-6 w-full`}>
                <div className="px-3 sm:px-6 py-4">
                    <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto scrollbar-hide">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <SubheadingItem {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
