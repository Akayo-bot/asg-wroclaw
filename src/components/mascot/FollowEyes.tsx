import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const FollowEyes: React.FC = () => {
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate eye positions relative to cursor
      if (leftEyeRef.current && rightEyeRef.current) {
        const updateEyePosition = (eyeRef: HTMLDivElement) => {
          const rect = eyeRef.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 2;
          const eyeCenterY = rect.top + rect.height / 2;
          
          const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
          const distance = Math.min(8, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 30);
          
          return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
          };
        };

        setLeftEyePosition(updateEyePosition(leftEyeRef.current));
        setRightEyePosition(updateEyePosition(rightEyeRef.current));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="flex gap-6">
      {/* Left Eye */}
      <div 
        ref={leftEyeRef}
        className="relative w-8 h-8 bg-foreground/90 rounded-full flex items-center justify-center"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : leftEyePosition}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-3 h-3 bg-background rounded-full"
        />
      </div>

      {/* Right Eye */}
      <div 
        ref={rightEyeRef}
        className="relative w-8 h-8 bg-foreground/90 rounded-full flex items-center justify-center"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : rightEyePosition}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-3 h-3 bg-background rounded-full"
        />
      </div>
    </div>
  );
};
