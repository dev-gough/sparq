'use client'

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

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

interface SubheadingItemProps {
    icon: FC<{ className?: string }>
    label: string
    href: string
}

function SubheadingItem({ label, href }: SubheadingItemProps) {
    const pathname = usePathname()        // e.g. “/investors”
    const hash = useHash()            // e.g. “#highlights” | ""

    const [targetPath, targetHash = ""] = href.split("#")  // targetHash doesn’t include “#”

    const isActive =
        pathname === targetPath &&                       // same path
        (targetHash === "" || hash === `#${targetHash}`) // and—if present—same hash

    return (
        <Link
            href={href}
            className={`flex flex-shrink-0 items-center justify-center space-x-2 ${isActive ? "text-brand-yellow" : "text-gray-700"
                } transition-colors duration-150 hover:text-brand-yellow`}
        >
            <span className="text-lg sm:text-2xl whitespace-nowrap">{label}</span>
        </Link>
    )
}

interface SubheaderProps {
    items: SubheadingItemProps[]
}

export default function Subheader({ items }: SubheaderProps) {
    return (
        <div className="sticky top-[66px] z-10 flex items-center justify-evenly bg-neutral-200 px-2 gap-x-4 sm:py-2 overflow-x-scroll sm:overflow-x-auto h-[48px] whitespace-nowrap overflow-y-hidden">
            {items.map((item) => (
                <SubheadingItem key={item.href} {...item} />
            ))}
        </div>
    )
}
