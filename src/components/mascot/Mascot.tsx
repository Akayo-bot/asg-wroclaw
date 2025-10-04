import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import confetti from 'canvas-confetti';
import { MascotState, mascotBehaviors } from './mascotStates';
import { FollowEyes } from './FollowEyes';
import { fadeIn } from '@/lib/authAnimations';

interface MascotProps {
  state: MascotState;
  className?: string;
  showEyes?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({ 
  state, 
  className = '',
  showEyes = true 
}) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [prevState, setPrevState] = useState<MascotState>(state);
  const behavior = mascotBehaviors[state];

  // Load Lottie animation
  useEffect(() => {
    fetch(behavior.animation)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load mascot animation:', err));
  }, [behavior.animation]);

  // Trigger confetti on success
  useEffect(() => {
    if (state === 'success' && prevState !== 'success' && behavior.confetti) {
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#4CAF50', '#81C784', '#66BB6A']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#4CAF50', '#81C784', '#66BB6A']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
    setPrevState(state);
  }, [state, prevState, behavior.confetti]);

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Mascot Animation */}
      <motion.div
        key={state}
        initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
        exit={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-64 h-64 md:w-80 md:h-80"
      >
        {animationData && (
          <Lottie
            animationData={animationData}
            loop={state !== 'success' && state !== 'error'}
            className="w-full h-full"
          />
        )}
        
        {/* Follow Eyes Overlay */}
        {showEyes && state === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <FollowEyes />
          </div>
        )}
      </motion.div>

      {/* Message Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={behavior.message}
          {...fadeIn}
          className="mt-6 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border rounded-lg max-w-xs"
        >
          <p className="text-center text-sm font-medium text-foreground">
            {behavior.message}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 blur-3xl opacity-20 pointer-events-none transition-colors duration-500 ${
          state === 'success' ? 'bg-primary' :
          state === 'error' ? 'bg-destructive' :
          'bg-primary/30'
        }`}
      />
    </div>
  );
};
