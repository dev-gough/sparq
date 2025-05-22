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

    if (error) return <div className="text-red-500">Error loading data</div>;
    if (isLoading) return <div className="text-gray-500">Loading...</div>;

    return (
        <div>
            <h1 className="text-center [font-weight:900] text-4xl">Stock Chart</h1>
            {data && data.values && (
                <StockChart data={data.values} symbol="SPRQ" height={800} />
            )}
        </div>
    )
}