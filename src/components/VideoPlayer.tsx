"use client"

import { useRef, useEffect } from "react"

interface VideoPlayerProps {
	src: string
	/** optional poster image */
	poster?: string
	/** extra Tailwind classes if you need them */
	className?: string
	/** pause video when this becomes true */
	shouldPause?: boolean
}

export default function VideoPlayer({ src, poster, className, shouldPause }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);

	// Pause video when shouldPause prop changes to true
	useEffect(() => {
		if (shouldPause && videoRef.current) {
			videoRef.current.pause();
		}
	}, [shouldPause]);

	// Pause and free resources when the component disappears (accordion closed)
	useEffect(() => {
		/* snapshot the element that existed *when* the effect ran */
		const vid = videoRef.current;

		return () => {
			if (vid) {
				vid.pause();
				vid.removeAttribute("src");
				vid.load();
			}
		};
	}, []);

	return (
		<video
			ref={videoRef}
			controls
			playsInline
			preload="metadata"            /* minimal lazy-loading */
			poster={poster}
			className={`w-full h-full object-cover ${className ?? ""}`}
		>
			<source src={src} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	)
}
