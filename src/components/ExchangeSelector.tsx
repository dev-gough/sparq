'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface ExchangeOption {
    code: string
    name: string
    symbol: string
    currency: string
    country: string
}

interface ExchangeSelectorProps {
    currentExchange: string
    onExchangeChange: (exchangeCode: string) => void
}

const exchanges: ExchangeOption[] = [
    {
        code: 'TSXV',
        name: 'TSX Venture Exchange',
        symbol: 'SPRQ',
        currency: 'CAD',
        country: 'Canada'
    },
    {
        code: 'FSX',
        name: 'Frankfurt Stock Exchange',
        symbol: 'M26',
        currency: 'EUR',
        country: 'Germany'
    },
    {
        code: 'NEO',
        name: 'NEO Exchange',
        symbol: 'SPRQ',
        currency: 'CAD',
        country: 'Canada'
    },
    {
        code: 'OTC',
        name: 'OTC Markets',
        symbol: 'SPRQF',
        currency: 'USD',
        country: 'United States'
    }
]

export default function ExchangeSelector({ currentExchange, onExchangeChange }: ExchangeSelectorProps) {
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

    const currentExchangeData = exchanges.find(ex => ex.code === currentExchange) || exchanges[0]

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg transition-all duration-200 text-white"
            >
                <Building2 size={16} />
                <div className="text-left">
                    <div className="font-medium text-sm">{currentExchangeData.code}</div>
                    <div className="text-xs text-white/80">{currentExchangeData.currency}</div>
                </div>
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
                        className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                        <div className="py-2">
                            {exchanges.map((exchange) => (
                                <motion.button
                                    key={exchange.code}
                                    whileHover={{ backgroundColor: 'rgba(139, 69, 19, 0.05)' }}
                                    onClick={() => {
                                        onExchangeChange(exchange.code)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 transition-colors ${
                                        currentExchange === exchange.code
                                            ? 'text-brand-maroon dark:text-brand-yellow bg-brand-maroon/10 dark:bg-brand-yellow/10'
                                            : 'text-brand-graytext dark:text-dark-text-secondary hover:text-brand-maroon dark:hover:text-brand-yellow'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{exchange.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{exchange.country}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-brand-maroon dark:text-brand-yellow">{exchange.symbol}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{exchange.currency}</div>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { exchanges }
export type { ExchangeOption }