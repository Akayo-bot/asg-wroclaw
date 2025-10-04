import React from 'react';
import { motion } from 'framer-motion';
import { blobFloat } from '@/lib/authAnimations';

export const AnimatedShapes: React.FC = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const shapes = [
    {
      className: 'w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/10',
      style: { top: '10%', left: '10%' },
      delay: 0
    },
    {
      className: 'w-72 h-72 bg-gradient-to-br from-accent/15 to-accent/5',
      style: { top: '60%', left: '20%' },
      delay: 2
    },
    {
      className: 'w-80 h-80 bg-gradient-to-br from-primary/10 to-destructive/10',
      style: { top: '30%', right: '15%' },
      delay: 4
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${shape.className}`}
          style={shape.style}
          animate={prefersReducedMotion ? {} : blobFloat(shape.delay)}
        />
      ))}
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />
    </div>
  );
};
