'use client'

import { useState } from 'react'

interface ChartControlsProps {
    onSettingsChange: (settings: ChartSettings) => void
}

export interface ChartSettings {
    interval: string
    startDate: string
    endDate: string
}

const ChartControls: React.FC<ChartControlsProps> = ({ onSettingsChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [interval, setInterval] = useState('1h')
    const [dateRange, setDateRange] = useState('1m')
    const [customStartDate, setCustomStartDate] = useState('')
    const [customEndDate, setCustomEndDate] = useState('')

    const intervals = [
        { value: '5min', label: '5 min'},
        { value: '15min', label: '15 min' },
        { value: '1h', label: '1 hr' },
        { value: '2h', label: '2 hr' },
        { value: '1day', label: '1 day' },
        { value: '1week', label: '1 week'}
    ]

    const dateRanges = [
        { value: '1w', label: '1 Week' },
        { value: '1m', label: '1 Month' },
        { value: '3m', label: '3 Months' },
        { value: '6m', label: '6 Months' },
        { value: '1y', label: '1 Year' },
        { value: 'all', label: 'All Time' },
        { value: 'custom', label: 'Custom' }
    ]

    const getDateFromRange = (range: string) => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        
        switch (range) {
            case '1w':
                return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
            case '1m':
                return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
            case '3m':
                return new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
            case '6m':
                return new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())
            case '1y':
                return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
            case 'all':
                return new Date('2020-01-01')
            default:
                return new Date('2020-01-01')
        }
    }

    const handleApply = () => {
        let startDate: string
        let endDate: string

        if (dateRange === 'custom') {
            startDate = customStartDate
            endDate = customEndDate
        } else {
            const start = getDateFromRange(dateRange)
            startDate = start.toISOString().split('T')[0] + ' 08:00:00'
            endDate = ''
        }

        onSettingsChange({
            interval,
            startDate,
            endDate
        })
        setIsOpen(false)
    }

    return (
        <div className="absolute top-4 right-20 z-20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white border border-brand-gray/30 rounded-lg px-3 py-2 text-sm font-medium text-brand-graytext shadow-sm hover:bg-brand-yellow/10 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
            >
                ⚙️ Settings
            </button>

            {isOpen && (
                <div className="absolute top-12 right-0 bg-white border border-brand-gray/30 rounded-lg shadow-lg p-4 w-64 z-30">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-brand-graytext mb-2">
                                Interval
                            </label>
                            <select
                                value={interval}
                                onChange={(e) => setInterval(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-brand-gray/30 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon text-brand-graytext"
                            >
                                {intervals.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-brand-graytext mb-2">
                                Date Range
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-brand-gray/30 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon text-brand-graytext"
                            >
                                {dateRanges.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {dateRange === 'custom' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-brand-graytext mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-brand-gray/30 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon text-brand-graytext"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-brand-graytext mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-brand-gray/30 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon text-brand-graytext"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-2 pt-2">
                            <button
                                onClick={handleApply}
                                className="flex-1 bg-brand-maroon text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-brand-darkmaroon focus:outline-none focus:ring-2 focus:ring-brand-maroon"
                            >
                                Apply
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-1 bg-brand-gray/20 text-brand-graytext text-sm font-medium py-2 px-3 rounded-md hover:bg-brand-gray/30 focus:outline-none focus:ring-2 focus:ring-brand-gray"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChartControls