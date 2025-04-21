'use client'

import Link from 'next/link'
import { FC } from 'react'
import { usePathname } from 'next/navigation'

interface SubheadingItemProps {
    icon: FC<{ className?: string }> // Icon as a React component
    label: string
    href: string
}

function SubheadingItem({ icon: Icon, label, href } : SubheadingItemProps) {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link href={href} className={`flex flex-col justify-center items-center space-x-2 ${isActive? "text-brand-yellow" : "text-gray-700"} hover:text-brand-yellow transition-colors duration-150`}>
            <Icon className="sm:size-10 size-5" />
            <span className='text-sm sm:text-lg'>{label}</span>
        </Link>
    )
}

interface SubheaderProps {
    items: SubheadingItemProps[]
}

export default function Subheader({ items }: SubheaderProps) {
    return (
        <div className="bg-neutral-200 flex justify-evenly items-center z-[999] py-2 sm:mb-4">
            {items.map((item, index) => (
                <SubheadingItem key={index} {...item} />
            ))}
        </div>
    )
}
