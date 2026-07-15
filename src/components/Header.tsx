'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DropdownMenu from './DropdownMenu'
import AnimationToggle from './AnimationToggle'
import DarkModeToggle from './DarkModeToggle'
import { Menu, X } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  dropdown?: NavItem[]
}

interface HeaderProps {
  navItems: NavItem[]
}

/**
 * Sticky header client island: pathname-aware nav + mobile drawer.
 * No Motion — painted immediately for LCP/chrome stability.
 */
export default function Header({ navItems }: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[999] bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-brand-maroon/30 dark:border-gray-700/50 shadow-sm h-[75px]">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 h-full">
        <div className="grid grid-cols-3 items-center h-full">
          <div className="flex justify-start">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/logo.png"
                alt="Sparq Systems"
                width={75}
                height={48}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          <div className="flex justify-center">
            <nav className="hidden lg:flex items-center space-x-0 xl:space-x-1">
              {navItems.map((item, index) => {
                const isActive = item.dropdown
                  ? item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)
                  : pathname === item.href

                return item.dropdown ? (
                  <DropdownMenu key={index} navItem={item} isActive={isActive} />
                ) : (
                  <div key={index} className="transition-transform duration-200 hover:-translate-y-0.5">
                    <Link
                      href={item.href}
                      className={`relative flex items-center px-3 py-2 text-sm xl:text-lg font-medium transition-all duration-300 rounded-lg ${
                        isActive
                          ? 'text-brand-maroon dark:text-brand-yellow bg-brand-maroon/5 dark:bg-brand-yellow/10'
                          : 'text-brand-graytext dark:text-dark-text-primary hover:text-brand-maroon dark:hover:text-brand-yellow hover:bg-brand-maroon/5 dark:hover:bg-brand-yellow/10'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-maroon dark:bg-brand-yellow rounded-full" />
                      )}
                    </Link>
                  </div>
                )
              })}
            </nav>
          </div>

          <div className="flex justify-end">
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <DarkModeToggle />
              <AnimationToggle />
            </div>

            <div className="lg:hidden flex items-center gap-2 sm:gap-3">
              <DarkModeToggle />
              <AnimationToggle />
              <button
                type="button"
                className="p-2 rounded-lg bg-brand-maroon/5 dark:bg-brand-yellow/10 text-brand-maroon dark:text-brand-yellow hover:bg-brand-maroon/10 dark:hover:bg-brand-yellow/20 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav — CSS grid/max-height, no Motion */}
      <nav
        className={`lg:hidden overflow-hidden border-t border-brand-maroon/10 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out ${
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {navItems.map((item, index) => {
            const isActive = item.dropdown
              ? item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
              : pathname === item.href

            return (
              <div key={index}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-brand-maroon dark:text-brand-yellow bg-brand-maroon/10 dark:bg-brand-yellow/10'
                      : 'text-brand-graytext dark:text-dark-text-primary hover:text-brand-maroon dark:hover:text-brand-yellow hover:bg-brand-maroon/5 dark:hover:bg-brand-yellow/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
