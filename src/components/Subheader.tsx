import Link from 'next/link'
import { FC } from 'react'

interface SubheadingItemProps {
    icon: FC<{ className?: string }> // Icon as a React component
    label: string
    href: string
}

function SubheadingItem({ icon: Icon, label, href } : SubheadingItemProps) {
    return (
        <Link href={href} className="flex flex-col justify-center items-center space-x-2 text-gray-300 hover:text-brand-maroon transition-colors duration-150">
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
        <div className="bg-brand-gray flex justify-evenly items-center z-[999] py-2 mb-4">
            {items.map((item, index) => (
                <SubheadingItem key={index} {...item} />
            ))}
        </div>
    )
}
