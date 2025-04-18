import { useState } from 'react';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    open?: boolean
    className?: string
}

//todo: debug sticky positioning removing the bg, only when opening another accordianitem
export default function AccordionItem({ title, children, open, className } : AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(open);

    return (
        <div className="border border-gray-200 rounded-md mb-2 my-4 shadow-sm">
            {/* Header with title and toggle icon */}
            <button
                className={`w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 transition-colors cursor-pointer ${isOpen? className:""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-2xl">{title}</span>
                <span className="text-xl">{isOpen ? '-' : '+'}</span>
            </button>
            {/* Content section, shown only when open */}
            {isOpen && (
                <div className="p-4 border border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};