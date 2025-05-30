import React, { useEffect, useRef } from "react"
import {
	createChart,
	IChartApi,
	UTCTimestamp,
	CandlestickData,
	CandlestickSeries,
	HistogramData,
	HistogramSeries,
	Time,
	ColorType,
	ISeriesApi
} from "lightweight-charts"

/**
 * Raw 15‑minute bar as it may arrive from your backend.
 */
export interface RawBar {
	datetime: string // ISO‑8601 or "YYYY-MM-DD HH:mm:ss" in exchange timezone
	open: string
	high: string
	low: string
	close: string
	volume: string
}

export interface ChartProps {
	/**
	 * Array of bars in *reverse‑chronological* or chronological order.
	 * They will be sorted before plotting.
	 */
	data: RawBar[]
	/** Symbol rendered as a translucent watermark (optional). */
	symbol?: string
	/** Width in px (flexes to parent if omitted). */
	width?: number
	/** Height in px (defaults to 400). */
	height?: number
}

/**
 * Reusable React component wrapping TradingView’s Lightweight Charts.
 *
 * ```tsx
 * <LightweightChart
 *   data={bars}
 *   symbol="AAPL"
 *   height={450}
 * />
 * ```
 */
const LightweightChart: React.FC<ChartProps> = ({
	data,
	symbol,
	width = 0, // 0 ➜ take full width of parent
	height,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const chartRef = useRef<IChartApi | null>(null)
	const legendRef = useRef<HTMLDivElement>(null)
	const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
	const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null)

	/** Convert backend bar ➜ Lightweight Charts format. */
	const toCandlestick = (bar: RawBar): CandlestickData => {
		// Parse in the browser’s locale then convert to UTC seconds.
		// If your backend sends ISO strings with timezone, simply `Date.parse(bar.datetime)`.
		const date = new Date(bar.datetime)
		const time = (date.getTime() / 1000) as UTCTimestamp
		return {
			time,
			open: parseFloat(bar.open),
			high: parseFloat(bar.high),
			low: parseFloat(bar.low),
			close: parseFloat(bar.close),
		}
	}

	const toVolume = (bar: RawBar): HistogramData<Time> => {
		const date = new Date(bar.datetime)
		const time = (date.getTime() / 1000) as Time
		const upCandle = parseFloat(bar.close) >= parseFloat(bar.open)
		return {
			time,
			value: parseInt(bar.volume, 10),
			color: upCandle ? "rgba(38,166,154,0.7)" : "rgba(239,83,80,0.7)"
		}
	}

	useEffect(() => {
		if (!wrapperRef.current) return
		/***** Create / recreate chart *****/
		// Clean up old instance when re‑rendering with new data.
		if (chartRef.current) {
			chartRef.current.remove()
		}

		console.log(wrapperRef.current.clientHeight)

		const chart = createChart(wrapperRef.current, {
			width: width || wrapperRef.current.clientWidth,
			height: height || wrapperRef.current.clientHeight,
			layout: {
				background: { type: ColorType.Solid, color: "#fff" },
				textColor: "#66666",
			},
			rightPriceScale: {
				visible: true,
				scaleMargins: { top: 0.05, bottom: 0.3 },
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
			},
		})

		chartRef.current = chart

		/*****  Add series *****/
		const candleSeries = chart.addSeries(CandlestickSeries)
		candleSeries.priceScale().applyOptions({ scaleMargins: { top: 0.05, bottom: 0.30 } })
		candleSeriesRef.current = candleSeries

		const volumeSeries = chart.addSeries(HistogramSeries, {
			priceScaleId: "",
			priceFormat: { type: "volume" },
		})
		volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.80, bottom: 0 } })
		volumeSeriesRef.current = volumeSeries

		/*****  Prepare + set data *****/
		const candles = data
			.map(toCandlestick)
			.sort((a, b) => (a.time.valueOf() as number) - (b.time.valueOf() as number))
			.filter((candle, index, array) => {
				// Remove duplicates by checking if current timestamp is different from previous
				return index === 0 || candle.time !== array[index - 1].time
			})

		const volumes = data
			.map(toVolume)
			.sort((a, b) => (a.time.valueOf() as number) - (b.time.valueOf() as number))
			.filter((volume, index, array) => {
				// Remove duplicates by checking if current timestamp is different from previous
				return index === 0 || volume.time !== array[index - 1].time
			})

		candleSeries.setData(candles)
		volumeSeries.setData(volumes)

		// ─── Legend ────────────────────────────────────────────────────────────
		const legendEl = legendRef.current!
		legendEl.style.fontFamily = "monospace"
		legendEl.style.fontSize = "12px"
		legendEl.style.pointerEvents = "none"

		const numberFmt = new Intl.NumberFormat("en-US")

		chart.subscribeCrosshairMove((param) => {
			if (!param.time) {
				legendEl.textContent = ""
				return
			}
			const bar = param.seriesData.get(candleSeries) as
				| CandlestickData
				| undefined
			const vol = param.seriesData.get(volumeSeries) as
				| HistogramData<Time>
				| undefined

			if (!bar || !vol) {
				legendEl.textContent = ""
				return
			}

			const time = param.time as UTCTimestamp
			const dateStr = new Date(time * 1000).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})

			legendEl.textContent = `${dateStr}  O:${bar.open.toFixed(3)} H:${bar.high.toFixed(
				3,
			)} L:${bar.low.toFixed(3)} C:${bar.close.toFixed(3)}  Vol:${numberFmt.format(
				vol.value,
			)}`
		})

		/***** Handle resize *****/
		const handleResize = () => {
			chart.applyOptions({ width: wrapperRef.current?.clientWidth || width })
			chart.applyOptions({ height: wrapperRef.current?.clientHeight || height})
		}
		window.addEventListener("resize", handleResize)

		chart.timeScale().fitContent()

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [data, height, symbol, width, chartRef])

	return (
		<div
			ref={wrapperRef}
			className="w-full h-full relative">

			<div
				ref={legendRef}
				className="absolute top-2 left-2 z-10"
			>
			</div>
		</div>
	)
}

export default LightweightChart
