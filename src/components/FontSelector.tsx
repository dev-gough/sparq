'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Type } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface FontOption {
    name: string
    value: string
    className: string
}

interface FontSelectorProps {
    currentFont: string
    onFontChange: (fontValue: string) => void
    fonts: FontOption[]
}

export default function FontSelector({ currentFont, onFontChange, fonts }: FontSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const currentFontName = fonts.find(font => font.value === currentFont)?.name || 'Select Font'

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-graytext hover:text-brand-maroon bg-white/80 hover:bg-brand-maroon/5 border border-brand-maroon/20 rounded-lg transition-all duration-200"
            >
                <Type size={16} />
                <span className="hidden sm:inline">{currentFontName}</span>
                <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-brand-maroon/20 rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                        <div className="py-2">
                            {fonts.map((font) => (
                                <motion.button
                                    key={font.value}
                                    whileHover={{ backgroundColor: 'rgba(139, 69, 19, 0.05)' }}
                                    onClick={() => {
                                        onFontChange(font.value)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                        currentFont === font.value
                                            ? 'text-brand-maroon bg-brand-maroon/10'
                                            : 'text-brand-graytext hover:text-brand-maroon'
                                    } ${font.className}`}
                                >
                                    {font.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}