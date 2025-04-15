import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('http://localhost:5000/api/news')
        const results = await res.json()
        return NextResponse.json(results)
    } catch (error) {
        console.error('Error fetching stock data:', error)
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 })
    }
}