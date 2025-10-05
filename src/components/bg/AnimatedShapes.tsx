import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AnimatedShapes: React.FC = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, isMobile]);

  const blobs = [
    {
      src: '/assets/auth/blob1.svg',
      style: { top: '10%', left: '10%' },
      parallaxStrength: 1.2,
      rotation: 2
    },
    {
      src: '/assets/auth/blob2.svg',
      style: { top: '60%', left: '20%' },
      parallaxStrength: 0.8,
      rotation: -3
    },
    {
      src: '/assets/auth/blob3.svg',
      style: { top: '30%', right: '15%' },
      parallaxStrength: 1,
      rotation: 1.5
    }
  ];

  const visibleBlobs = isMobile ? [blobs[0]] : blobs;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {visibleBlobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute w-96 h-96"
          style={{
            ...blob.style,
            opacity: isMobile ? 0.3 : 0.6
          }}
          animate={prefersReducedMotion || isMobile ? {} : {
            x: -mousePos.x * blob.parallaxStrength,
            y: -mousePos.y * blob.parallaxStrength,
            rotate: [0, blob.rotation, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <img 
            src={blob.src} 
            alt="" 
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </motion.div>
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
