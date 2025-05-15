import { useTrackEvent } from '@/hooks/useTrackEvent';
import { useState } from 'react';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    open?: boolean
    className?: string
    parent: string
}

//todo: debug sticky positioning removing the bg, only when opening another accordianitem
export default function AccordionItem({ title, children, open, className, parent } : AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(open);
    const trackEvent = useTrackEvent()

    const handleOpen = () => {
        setIsOpen(!isOpen)
        if (isOpen) return
        trackEvent("dropdown_opened", {
            "parent": parent,
            "dropdown": title,
        })
    }
// todo: move sticky on sm to this file
    return (
        <div className=" mb-2 my-4">
            {/* Header with title and toggle icon */}
            <button
                className={`border shadow-sm border-gray-200 bg-white rounded-md w-full flex justify-between items-center p-4 text-left transition-colors cursor-pointer ${isOpen? className:""}`}
                onClick={handleOpen}
            >
                <span className="font-bold text-2xl">{title}</span>
                <span className="text-xl">{isOpen ? '-' : '+'}</span>
            </button>
            {/* Content section, shown only when open */}
            {isOpen && (
                <div className="p-4 border-x border-b border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};