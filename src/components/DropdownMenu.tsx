'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  dropdown?: NavItem[]
}

interface DropdownMenuProps {
  navItem: NavItem
  isActive: boolean
}

/** Desktop nav dropdown — CSS only (no Motion). */
export default function DropdownMenu({ navItem }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 50)
  }

  const isParentActive =
    navItem.href === '/' ? pathname === '/' : pathname.startsWith(navItem.href)

  return (
    <div
      className="relative z-[99] transition-transform duration-200 hover:-translate-y-0.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseLeave}
    >
      <Link
        href={navItem.href}
        className={`relative flex items-center gap-1 px-3 py-2 text-sm xl:text-lg font-medium transition-all duration-300 rounded-lg ${
          isParentActive
            ? 'text-brand-maroon dark:text-brand-yellow bg-brand-maroon/5 dark:bg-brand-yellow/10'
            : 'text-brand-graytext dark:text-dark-text-primary hover:text-brand-maroon dark:hover:text-brand-yellow hover:bg-brand-maroon/5 dark:hover:bg-brand-yellow/10'
        }`}
      >
        <span>{navItem.label}</span>
        <span
          className={`inline-flex transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <ChevronDown size={16} />
        </span>
        {isParentActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-maroon dark:bg-brand-yellow rounded-full" />
        )}
      </Link>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl rounded-xl border border-brand-maroon/10 dark:border-gray-700/50 overflow-hidden">
          <div className="py-2">
            {navItem.dropdown?.map((subItem) => {
              const isSubActive = pathname === subItem.href
              return (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={`block px-4 py-3 mx-2 my-1 text-sm xl:text-base font-medium transition-all duration-200 rounded-lg ${
                    isSubActive
                      ? 'text-brand-maroon dark:text-brand-yellow bg-brand-maroon/10 dark:bg-brand-yellow/10'
                      : 'text-brand-graytext dark:text-dark-text-secondary hover:text-brand-maroon dark:hover:text-brand-yellow hover:bg-brand-maroon/5 dark:hover:bg-brand-yellow/10'
                  }`}
                  aria-current={isSubActive ? 'page' : undefined}
                >
                  {subItem.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
