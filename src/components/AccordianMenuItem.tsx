import { useState } from 'react';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

export default function AccordionItem({ title, children } : AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-md mb-2 my-4 shadow-sm">
            {/* Header with title and toggle icon */}
            <button
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-2xl">{title}</span>
                <span className="text-xl">{isOpen ? '-' : '+'}</span>
            </button>
            {/* Content section, shown only when open */}
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};