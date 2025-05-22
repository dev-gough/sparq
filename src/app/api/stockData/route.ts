import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const url = `https://api.twelvedata.com/time_series?apikey=${process.env.TWELVE_DATA_API_KEY}&interval=15min&symbol=SPRQ&start_date=2024-11-01 08:00:00`
        const res = await fetch(url)
        const results = await res.json()
        return NextResponse.json(results)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch data'}, { status: 500 })
    }
}