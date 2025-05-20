import {
    MdFirstPage,
    MdReplay10,
    MdPlayArrow,
    MdPause,
    MdForward10,
    MdLastPage,
} from 'react-icons/md'

interface VideoControlsProps {
    onRestart: () => void
    onRewind: () => void
    onPlayPause: () => void
    onForward: () => void
    onSkipToEnd: () => void
    isPaused: boolean
    className?: string
}

export default function VideoControls({
    onRestart,
    onRewind,
    onPlayPause,
    onForward,
    onSkipToEnd,
    isPaused,
    className,
}: VideoControlsProps) {
    return (
        <div className={`flex items-center space-x-4 bg-black bg-opacity-50 p-2 rounded cursor-pointer ${className}`}>
            {/* 1) Skip to start */}
            <button onClick={onRestart} aria-label="Restart">
                <MdFirstPage className="text-white text-2xl" />
            </button>

            {/* 2) Back 10s */}
            <button onClick={onRewind} aria-label="Rewind 10 seconds">
                <MdReplay10 className="text-white text-2xl" />
            </button>

            {/* 3) Play / Pause */}
            <button onClick={onPlayPause} aria-label={isPaused ? 'Play' : 'Pause'}>
                {isPaused
                    ? <MdPlayArrow className="text-white text-3xl" />
                    : <MdPause className="text-white text-3xl" />
                }
            </button>

            {/* 4) Forward 10s */}
            <button onClick={onForward} aria-label="Forward 10 seconds">
                <MdForward10 className="text-white text-2xl" />
            </button>

            {/* 5) Skip to end */}
            <button onClick={onSkipToEnd} aria-label="Skip to end">
                <MdLastPage className="text-white text-2xl" />
            </button>
        </div>
    )
}