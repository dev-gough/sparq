'use client'
import { motion } from "motion/react"

interface AnimatedListProps {
    items: string[]
    onComplete?: (i:number) => void
}

export default function AnimatedList({ items, onComplete }: AnimatedListProps) {
    return (
        <motion.div
            className="overflow-hidden bg-neutral-600/50 p-4 rounded-lg shadow-md mx-auto"
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: 1000 }}
            transition={{ duration: 16, ease: 'easeOut' }}
        >
            <ul className="list-disc list-inside space-y-4 sm:space-y-8">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1
                    return (
                        <motion.li
                            key={i}
                            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.5 + i * 1,
                                duration: 0.5,
                                ease: 'easeOut',
                            }}
                            onAnimationComplete={() => {
                                if (isLast && onComplete) onComplete(i)
                            }}
                        >
                            {item}
                        </motion.li>
                    )
                })}
            </ul>
        </motion.div>
    )
}