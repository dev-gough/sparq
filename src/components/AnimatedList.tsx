'use client'
import { motion } from "motion/react"

interface AnimatedListProps {
    items: Array<string>
}

export default function AnimatedList({ items }: AnimatedListProps) {
    const listVariants = {
        hidden: { maxHeight: 0 },
        visible: { maxHeight: 1000 },
    };

    return (
        <motion.div
            className="overflow-hidden  bg-neutral-600/50 p-4 rounded-lg shadow-md mx-auto"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 16, ease: "easeOut" }}
        >
            <ul className="list-disc list-inside space-y-4 sm:space-y-8">
                {items.map((item, index) => (
                    <motion.li
                        key={index}
                        className="
                        text-xl
                        md:text-2xl
                        lg:text-3xl
                        xl:text-4xl
                        3xl:text-5xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.5 + index * 1,
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}