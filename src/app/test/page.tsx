'use client'

import LeavingSite from '@/components/LeavingSite'
import CircularCountdown from "@/components/CircleCountdown"
import { useState } from 'react'

export default function TestPage() {

	const [e, sE] = useState<boolean>(false)
	return (
		<div>
			<button onClick={() => sE(true)}>Go to whatever</button>
			<CircularCountdown duration={8} size={64} />
			{e && (
				<LeavingSite href="https://www.youtube.com" setShown={sE}></LeavingSite>
			)}
		</div>
	)
}