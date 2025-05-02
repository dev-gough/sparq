// 'use client'

// import Link from 'next/link'
// import { FC } from 'react'
// import { usePathname } from 'next/navigation'

// interface SubheadingItemProps {
//     icon: FC<{ className?: string }> // Icon as a React component
//     label: string
//     href: string
// }

// function SubheadingItem({ label, href }: SubheadingItemProps) {
//     const pathname = usePathname()
//     const isActive = pathname === href

//     return (
//         <Link href={href} className={`flex flex-col justify-center items-center space-x-2 ${isActive ? "text-brand-yellow" : "text-gray-700"} hover:text-brand-yellow transition-colors duration-150`}>
//             <span className='text-xs sm:text-2xl'>{label}</span>
//         </Link>
//     )
// }

// interface SubheaderProps {
//     items: SubheadingItemProps[]
// }

// export default function Subheader({ items }: SubheaderProps) {
//     return (
//         <div className="bg-neutral-200 flex justify-evenly items-center z-10 py-2 sticky top-[66px]">
//             {items.map((item, index) => (
//                 <SubheadingItem key={index} {...item} />
//             ))}
//         </div>
//     )
// }

'use client'

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/** ----------------------------------------------------------------
 *  Helpers
 *  ---------------------------------------------------------------- */
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

/** ----------------------------------------------------------------
 *  Sub‑heading item
 *  ---------------------------------------------------------------- */
interface SubheadingItemProps {
    icon: FC<{ className?: string }>
    label: string
    href: string
}

function SubheadingItem({ icon: Icon, label, href }: SubheadingItemProps) {
    const pathname = usePathname()        // e.g. “/investors”
    const hash = useHash()            // e.g. “#highlights” | ""

    const [targetPath, targetHash = ""] = href.split("#")  // targetHash doesn’t include “#”

    const isActive =
        pathname === targetPath &&                       // same path
        (targetHash === "" || hash === `#${targetHash}`) // and—if present—same hash

    return (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center space-x-2 ${isActive ? "text-brand-yellow" : "text-gray-700"
                } transition-colors duration-150 hover:text-brand-yellow`}
        >
            <span className="text-xs sm:text-2xl">{label}</span>
        </Link>
    )
}

/** ----------------------------------------------------------------
 *  Sub‑header wrapper
 *  ---------------------------------------------------------------- */
interface SubheaderProps {
    items: SubheadingItemProps[]
}

export default function Subheader({ items }: SubheaderProps) {
    return (
        <div className="sticky top-[66px] z-10 flex items-center justify-evenly bg-neutral-200 py-2">
            {items.map((item) => (
                <SubheadingItem key={item.href} {...item} />
            ))}
        </div>
    )
}
