// Mascot state machine configuration

export type MascotState = 'idle' | 'typing' | 'success' | 'error' | 'thinking';

export interface MascotBehavior {
  animation: string;
  message: string;
  duration?: number;
  confetti?: boolean;
}

export const mascotBehaviors: Record<MascotState, MascotBehavior> = {
  idle: {
    animation: '/lottie/idle.json',
    message: "Ready when you are! 🎯",
    duration: Infinity
  },
  typing: {
    animation: '/lottie/typing.json',
    message: "Looking tactical! 💪",
    duration: Infinity
  },
  success: {
    animation: '/lottie/success.json',
    message: "Mission accomplished! 🎖️",
    duration: 3000,
    confetti: true
  },
  error: {
    animation: '/lottie/error.json',
    message: "Mission failed, let's try again 🤔",
    duration: 3000
  },
  thinking: {
    animation: '/lottie/typing.json',
    message: "Processing... ⚙️",
    duration: Infinity
  }
};
