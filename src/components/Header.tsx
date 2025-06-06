'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DropdownMenu from './DropdownMenu'
import { RxHamburgerMenu } from 'react-icons/rx'
import { GrClose } from 'react-icons/gr'

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
        <header className="sticky top-0 z-[999] bg-brand-graytext shadow-md h-[67px]">
            <div className="flex justify-between lg:justify-center items-center p-2">
                <Link href="/" className="mr-8" onClick={() => setIsMenuOpen(false)}>
                    <Image src="/logo.png" alt="Logo" width={75} height={50} />
                </Link>
                <button
                    className="lg:hidden p-2 text-brand-yellow"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <GrClose size={24} /> : <RxHamburgerMenu size={24} />}
                </button>
                <nav className="hidden lg:flex flex-wrap lg:space-x-1 xl:space-x-6">
                    {navItems.map((item, index) => {
                        const isActive = item.dropdown
                            ? item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                            : pathname === item.href

                        return item.dropdown ? (
                            <DropdownMenu key={index} navItem={item} isActive={isActive} />
                        ) : (
                            <Link
                                key={index}
                                href={item.href}
                                className={`px-3 py-1 text-lg lg:text-xl xl:text-[22px] rounded ${
                                    isActive
                                        ? 'text-brand-yellow font-bold'
                                        : 'text-white hover:text-gray-300'
                                }`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            {isMenuOpen && (
                <nav className="absolute md:grid md:grid-cols-2 top-full left-0 right-0 bg-brand-graytext py-4 px-6 lg:hidden shadow-lg">
                    {navItems.map((item, index) => {
                        const isActive = item.dropdown
                            ? item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                            : pathname === item.href

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`block py-2 text-xl ${
                                    isActive ? 'text-brand-yellow font-bold' : 'text-white'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            )}
        </header>
    )
}