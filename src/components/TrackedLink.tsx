'use client'

import { useTrackEvent } from "@/hooks/useTrackEvent"
import Link from "next/link"

interface TrackedLinkProps {
    href: string
    className?: string
    eventName: string
    eventParams?: { [key:string]: any} // eslint-disable-line @typescript-eslint/no-explicit-any
    target?: string
    children: React.ReactNode
}

export default function TrackedLink( { href, className, eventName, eventParams, target, children} : TrackedLinkProps) {
    const trackEvent = useTrackEvent()

    const handleClick = () => {
        trackEvent(eventName, eventParams)
    }

    return (
        <Link
            href={href}
            target={target? target: ""}
            className={className? className : ""}
            onClick={handleClick}
        >
            {children}
        </Link>
    )
}