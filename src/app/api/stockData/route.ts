import { NextResponse } from 'next/server';
import stocksJson from '../stocks.json'

export async function GET() {
    try {
        /* const res = await fetch('http://localhost:5000/api/stocks')
        const results = await res.json() */
        console.log(stocksJson)
        return NextResponse.json(stocksJson)
    } catch (error) {
        console.error('Error fetching stock data:', error)
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 })
    }
}