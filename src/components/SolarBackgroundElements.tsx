'use client'

import { motion } from "motion/react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTheme } from "@/contexts/ThemeContext"

interface SolarPanelProps {
    x: number
    y: number
    size: number
    rotation: number
    delay: number
}

function SolarPanel({ x, y, size, rotation, delay }: SolarPanelProps) {
    return (
        <motion.div
            className="absolute"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotate(${rotation}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay }}
        >
            {/* 2x2 Solar Panel Grid */}
            <div className="grid grid-cols-2 gap-1 w-full h-full">
                {Array.from({ length: 4 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-gradient-to-br from-slate-200/30 via-slate-300/20 to-slate-400/25 dark:from-blue-900/20 dark:via-slate-700/15 dark:to-gray-900/20 rounded-sm border border-slate-300/30 dark:border-slate-400/20"
                        animate={{
                            boxShadow: [
                                "0 0 0 rgba(59, 130, 246, 0.1)",
                                "0 0 8px rgba(59, 130, 246, 0.2)",
                                "0 0 0 rgba(59, 130, 246, 0.1)",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            delay: delay + index * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {/* Horizontal lines to mimic solar cells */}
                        <div className="absolute inset-0 flex flex-col justify-evenly p-0.5">
                            {Array.from({ length: 3 }).map((_, lineIndex) => (
                                <div
                                    key={lineIndex}
                                    className="h-px bg-gradient-to-r from-transparent via-slate-400/40 to-transparent dark:via-slate-400/30"
                                />
                            ))}
                        </div>
                        
                        {/* Vertical center line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-400/40 to-transparent dark:via-slate-400/30" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

interface ConnectionCableProps {
    from: { x: number; y: number }
    to: { x: number; y: number }
    delay: number
}

function ConnectionCable({ from, to, delay }: ConnectionCableProps) {
    const { isDarkMode } = useTheme()
    // Create a path with multiple control points for realistic cable routing
    const deltaX = to.x - from.x
    const deltaY = to.y - from.y
    
    // Create a smooth curved path that bends naturally
    const controlX1 = from.x + deltaX * 0.3
    const controlY1 = from.y + deltaY * 0.1
    const controlX2 = from.x + deltaX * 0.7
    const controlY2 = from.y + deltaY * 0.9
    
    const pathData = `M ${from.x} ${from.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${to.x} ${to.y}`
    
    return (
        <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            <defs>
                <linearGradient id={`cable-gradient-light-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(226, 232, 240)" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="rgb(203, 213, 225)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="rgb(226, 232, 240)" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id={`cable-gradient-dark-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(51, 65, 85)" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="rgb(30, 41, 59)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="rgb(51, 65, 85)" stopOpacity="0.25" />
                </linearGradient>
            </defs>
            
            <motion.path
                d={pathData}
                stroke={`url(#cable-gradient-${isDarkMode ? 'dark' : 'light'}-${delay})`}
                strokeWidth="0.15"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: delay + 0.5, ease: "easeInOut" }}
            />
            
            
            <motion.path
                d={pathData}
                stroke={isDarkMode ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)"}
                strokeWidth="0.06"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1 3"
                strokeOpacity={isDarkMode ? "0.4" : "0.12"}
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ 
                    pathLength: 1,
                    strokeDashoffset: [-4, 0]
                }}
                transition={{ 
                    pathLength: { duration: 2, delay: delay + 0.5, ease: "easeInOut" },
                    strokeDashoffset: { 
                        duration: 3, 
                        delay: delay + 2.5, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }
                }}
            />
        </motion.svg>
    )
}

export default function SolarBackgroundElements() {
    const isMobile = useIsMobile()
    
    // Don't render on mobile devices
    if (isMobile) {
        return null
    }
    
    const solarPanels = [
        { x: 10, y: 15, size: 80, rotation: 15, delay: 0 },
        { x: 75, y: 25, size: 60, rotation: -10, delay: 0.5 },
        { x: 20, y: 70, size: 70, rotation: 20, delay: 1 },
        { x: 80, y: 75, size: 55, rotation: -15, delay: 1.5 },
        { x: 50, y: 10, size: 50, rotation: 5, delay: 2 },
        { x: 45, y: 85, size: 65, rotation: -25, delay: 2.5 },
    ]

    // Static connection points between panel centers
    const connections = [
        // Panel 0 (10, 15) to Panel 1 (75, 25) - horizontal across top
        { from: { x: 12, y: 17 }, to: { x: 76.5, y: 26.5 }, delay: 2.5 },
        // Panel 1 (75, 25) to Panel 4 (50, 10) - top right to top center
        { from: { x: 76.5, y: 26.5 }, to: { x: 51.25, y: 11.25 }, delay: 3 },
        // Panel 0 (10, 15) to Panel 2 (20, 70) - left side vertical
        { from: { x: 12, y: 17 }, to: { x: 21.75, y: 71.75 }, delay: 3.5 },
        // Panel 2 (20, 70) to Panel 3 (80, 75) - horizontal across bottom
        { from: { x: 21.75, y: 71.75 }, to: { x: 81.375, y: 76.375 }, delay: 4 },
        // Panel 3 (80, 75) to Panel 5 (45, 85) - bottom right to bottom center
        { from: { x: 81.375, y: 76.375 }, to: { x: 46.625, y: 86.625 }, delay: 4.5 },
        // Panel 4 (50, 10) to Panel 5 (45, 85) - long vertical connection down center
        { from: { x: 51.25, y: 11.25 }, to: { x: 46.625, y: 86.625 }, delay: 5 },
    ]

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Solar Panel Grids */}
            {solarPanels.map((panel, index) => (
                <SolarPanel
                    key={`panel-${index}`}
                    x={panel.x}
                    y={panel.y}
                    size={panel.size}
                    rotation={panel.rotation}
                    delay={panel.delay}
                />
            ))}
            
            {/* Connection Cables */}
            {connections.map((connection, index) => (
                <ConnectionCable
                    key={`connection-${index}`}
                    from={connection.from}
                    to={connection.to}
                    delay={connection.delay}
                />
            ))}
        </div>
    )
}