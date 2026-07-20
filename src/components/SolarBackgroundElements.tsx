/**
 * Decorative solar-panel motif — pure server component (CSS only).
 * Dark styling via html.dark + globals.css; density via sm: breakpoints.
 */

interface SolarPanelProps {
  x: number
  y: number
  size: number
  rotation: number
}

function SolarPanel({ x, y, size, rotation }: SolarPanelProps) {
  return (
    <div
      className="absolute opacity-70"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      aria-hidden
    >
      <div className="grid grid-cols-2 gap-1 w-full h-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="solar-panel-cell relative" />
        ))}
      </div>
    </div>
  )
}

const mobilePanels: SolarPanelProps[] = [
  { x: 8, y: 12, size: 48, rotation: -12 },
  { x: 78, y: 18, size: 40, rotation: 18 },
  { x: 15, y: 62, size: 36, rotation: 8 },
  { x: 72, y: 70, size: 44, rotation: -20 },
]

const desktopPanels: SolarPanelProps[] = [
  { x: 5, y: 10, size: 72, rotation: -15 },
  { x: 88, y: 8, size: 64, rotation: 12 },
  { x: 12, y: 55, size: 56, rotation: 20 },
  { x: 80, y: 60, size: 68, rotation: -10 },
  { x: 45, y: 75, size: 48, rotation: 8 },
  { x: 70, y: 35, size: 40, rotation: -25 },
]

export default function SolarBackgroundElements() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="sm:hidden">
        {mobilePanels.map((p, i) => (
          <SolarPanel key={`m-${i}`} {...p} />
        ))}
      </div>
      <div className="hidden sm:block">
        {desktopPanels.map((p, i) => (
          <SolarPanel key={`d-${i}`} {...p} />
        ))}
      </div>
    </div>
  )
}
