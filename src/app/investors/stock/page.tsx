'use client'

import { useState } from 'react'
import StockChart, { RawBar } from "@/components/StockChart"
import ChartControls, { ChartSettings } from "@/components/ChartControls"
import useSWR from 'swr'

const fetcher = (url: string) =>
    fetch(url).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json() as Promise<{ values: RawBar[] }>
    })

export default function StockPage() {
    const [chartSettings, setChartSettings] = useState<ChartSettings>({
        interval: '1h',
        startDate: '2020-01-01 08:00:00',
        endDate: ''
    })

    const buildApiUrl = (settings: ChartSettings) => {
        const params = new URLSearchParams({
            interval: settings.interval,
            start_date: settings.startDate
        })
        
        if (settings.endDate) {
            params.append('end_date', settings.endDate)
        }
        
        return `/api/stockData?${params.toString()}`
    }

    const { data, error, isLoading } = useSWR(buildApiUrl(chartSettings), fetcher, {
        refreshInterval: 15 * 60_000
    })

    const handleSettingsChange = (newSettings: ChartSettings) => {
        setChartSettings(newSettings)
    }

    if (error) return <div className="text-red-500 h-[calc(100vh-114px)]">Error loading data</div>;
    if (isLoading) return <div className="text-gray-500 h-[calc(100vh-114px)]">Loading...</div>;

    return (
        <div className="h-[calc(100vh-114px)] relative">
            <ChartControls onSettingsChange={handleSettingsChange} />
            {data && data.values && (
                <StockChart data={data.values} symbol="SPRQ" />
            )}
        </div>
    )
}