import Link from 'next/link'
import { useState, useEffect } from 'react'

interface stockData {
    ticker: string
    date: string
    price: number
    open: boolean
}

interface StockInfoProps {
    className?: string
}

export default function StockInfo({ className } : StockInfoProps) {

    const [data, setData] = useState<stockData>({ticker: 'SPRQ', date: '', price: 0, open: false})
    const [loading, setLoading] = useState(true)
    
        useEffect(() => {
            fetch('/api/stockData')
                .then((res) => res.json())
                .then((data) => {
                    if (data && typeof data.price === 'number') {
                        setData(data)
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Fetch error:', error)
                    setLoading(false)
                });
        }, []);

    return (
        <div className={className}>
            <Link href="https://ca.finance.yahoo.com/quote/SPRQ.V/" target='_blank' className=' cursor-pointer'>
                <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 p-4 rounded text-white">
                    <p className="text-sm">TSXV: {data.ticker || 'SPRQ'}</p>
                    <p className="text-2xl font-semibold">
                        {loading ? 'Loading...' : `$${data.price?.toFixed(2) || '0.00'}`}
                    </p>
                    <p className="text-xs">{data.date || 'Data unavailable'}</p>
                    <p className="text-xs">{data.open ? '0800 EST' : '1700 EST'}</p>
                </div>
            </Link>
        </div>
    )
}