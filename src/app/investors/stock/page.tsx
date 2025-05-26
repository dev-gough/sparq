'use client'

import StockChart, { RawBar } from "@/components/StockChart"
import useSWR from 'swr'

const fetcher = (url: string) =>
    fetch(url).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json() as Promise<{ values: RawBar[] }>
    })

export default function StockPage() {

    const { data, error, isLoading } = useSWR('/api/stockData', fetcher, {
        refreshInterval: 15 * 60_000
    })

    if (error) return <div className="text-red-500 h-[calc(100vh-114px)]">Error loading data</div>;
    if (isLoading) return <div className="text-gray-500 h-[calc(100vh-114px)]">Loading...</div>;

    return (
        <div className="h-[calc(100vh-114px)]">
            {data && data.values && (
                <StockChart data={data.values} symbol="SPRQ" />
            )}
        </div>
    )
}