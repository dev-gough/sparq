import { useTrackEvent } from '@/hooks/useTrackEvent'
import { useState } from 'react'

interface AccordionItemProps {
    title: string
    children: React.ReactNode
    open?: boolean
    className?: string
    parent: string
}

export default function AccordionItem({ title, children, open, className, parent } : AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(open)
    const trackEvent = useTrackEvent()

    const handleOpen = () => {
        setIsOpen(!isOpen)
        if (isOpen) return
        trackEvent("dropdown_opened", {
            "parent": parent,
            "dropdown": title,
        })
    }
    return (
        <div className=" mb-2 my-4">
            {/* Header with title and toggle icon */}
            <button
                className={`border shadow-sm border-gray-200 bg-white rounded-md w-full flex justify-between items-center p-4 text-left transition-colors cursor-pointer ${isOpen? className:""}`}
                onClick={handleOpen}
            >
                <span className="font-bold text-2xl sm:text-3xl">{title}</span>
                <span className="text-xl md:text-2xl xl:text-3xl 3xl:text-4xl">{isOpen ? '-' : '+'}</span>
            </button>
            {/* Content section, shown only when open */}
            {isOpen && (
                <div className="p-4 border-x border-b border-gray-200 sm:text-lg md:text-xl lg:text-lg xl:text-xl">
                    {children}
                </div>
            )}
        </div>
    )
}