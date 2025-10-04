import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { scaleIn } from '@/lib/authAnimations';

type AuthMode = 'login' | 'register';

interface AuthCardProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
  onRegister: (name: string, email: string, password: string) => void;
  onGoogleSignIn: () => void;
  isLoading?: boolean;
  defaultMode?: AuthMode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ 
  onLogin, 
  onRegister, 
  onGoogleSignIn,
  isLoading = false,
  defaultMode = 'login'
}) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);

  return (
    <motion.div 
      {...scaleIn}
      className="w-full max-w-md mx-auto glass-panel p-8 rounded-2xl"
    >
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6 bg-muted/30 p-1 rounded-lg">
        {(['login', 'register'] as AuthMode[]).map((tabMode) => (
          <button
            key={tabMode}
            onClick={() => setMode(tabMode)}
            disabled={isLoading}
            className="relative flex-1 py-2.5 px-4 text-sm font-rajdhani font-semibold rounded-md transition-colors disabled:cursor-not-allowed"
          >
            {mode === tabMode && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-md"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 ${mode === tabMode ? 'text-primary' : 'text-muted-foreground'}`}>
              {tabMode === 'login' ? 'Mission Login' : 'Recruit'}
            </span>
          </button>
        ))}
      </div>

      {/* Titles */}
      <div className="mb-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-3xl font-rajdhani font-bold mb-2">
              {mode === 'login' ? 'Welcome back, warrior! 🎯' : 'Join the tactical squad! 🚀'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' 
                ? 'Enter your credentials to continue the mission' 
                : 'Create your account and start your journey'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <LoginForm 
            key="login"
            onSubmit={onLogin}
            onGoogleSignIn={onGoogleSignIn}
            isLoading={isLoading}
          />
        ) : (
          <RegisterForm 
            key="register"
            onSubmit={onRegister}
            onGoogleSignIn={onGoogleSignIn}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            disabled={isLoading}
            className="text-primary hover:text-primary/80 font-medium transition-colors disabled:cursor-not-allowed"
          >
            {mode === 'login' ? 'Join now' : 'Sign in'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};
