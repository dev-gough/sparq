'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CircularCountdownProps {
  /** countdown duration in seconds */
  duration: number;
  /** diameter of the circle in pixels */
  size?: number;
  /** stroke width of the circle */
  strokeWidth?: number;
  /** Tailwind stroke color for the progressing circle (e.g. 'stroke-blue-500') */
  colorClass?: string;
  /** Tailwind stroke color for the trail circle (e.g. 'stroke-gray-300') */
  trailClass?: string;
  onComplete?: () => void;
}

const CircularCountdown: React.FC<CircularCountdownProps> = ({
  duration,
  size = 120,
  strokeWidth = 8,
  colorClass = 'stroke-blue-500',
  trailClass = 'stroke-gray-300',
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const controls = useAnimation();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    controls.start({
      strokeDashoffset: [0, circumference],
      transition: { duration, ease: 'linear' },
    });

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [circumference, controls, duration, onComplete]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className={trailClass}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={colorClass}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          animate={controls}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
        {timeLeft}
      </div>
    </div>
  );
};

export default CircularCountdown;
