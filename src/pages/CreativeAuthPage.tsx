import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Mascot } from '@/components/mascot/Mascot';
import { AnimatedShapes } from '@/components/bg/AnimatedShapes';
import { AuthCard } from '@/components/auth/creative/AuthCard';
import { MascotState } from '@/components/mascot/mascotStates';
import { useToast } from '@/hooks/use-toast';
import { fadeInUp } from '@/lib/authAnimations';

const CreativeAuthPage = () => {
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const returnUrl = searchParams.get('returnUrl') || '/';

  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate(returnUrl);
    }
  }, [user, loading, navigate, returnUrl]);

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    setIsAuthLoading(true);
    setMascotState('thinking');

    // Mock delay for demonstration
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 300));

    try {
      // Test fail scenario
      if (email.includes('fail@')) {
        throw new Error('Invalid email or password');
      }

      const { error } = await signIn(email, password);
      
      if (error) throw error;

      setMascotState('success');
      toast({
        title: 'Mission accomplished! 🎖️',
        description: 'Welcome back to the squad',
      });

      // Redirect after success animation
      setTimeout(() => {
        navigate(returnUrl);
      }, 1500);
    } catch (err: any) {
      setMascotState('error');
      toast({
        title: 'Mission failed',
        description: err.message || 'Invalid credentials. Try again.',
        variant: 'destructive',
      });
      setTimeout(() => setMascotState('idle'), 3000);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setIsAuthLoading(true);
    setMascotState('thinking');

    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 300));

    try {
      // Test fail scenario
      if (email.includes('fail@')) {
        throw new Error('Registration failed. Email may already be in use.');
      }

      const { error } = await signUp(email, password, name);
      
      if (error) throw error;

      setMascotState('success');
      toast({
        title: 'Welcome to the squad! 🚀',
        description: 'Check your email to verify your account',
      });

      // Redirect after success
      setTimeout(() => {
        navigate(returnUrl);
      }, 1500);
    } catch (err: any) {
      setMascotState('error');
      toast({
        title: 'Recruitment failed',
        description: err.message || 'Unable to create account. Try again.',
        variant: 'destructive',
      });
      setTimeout(() => setMascotState('idle'), 3000);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    setMascotState('thinking');

    try {
      const { error } = await signInWithGoogle();
      
      if (error) throw error;

      setMascotState('success');
      // Google OAuth will handle redirect
    } catch (err: any) {
      setMascotState('error');
      toast({
        title: 'Google sign-in failed',
        description: err.message || 'Unable to authenticate with Google',
        variant: 'destructive',
      });
      setTimeout(() => setMascotState('idle'), 3000);
      setIsAuthLoading(false);
    }
  };

  const handleInputChange = () => {
    if (mascotState === 'idle') {
      setMascotState('typing');
      const timeoutId = setTimeout(() => {
        setMascotState(prev => prev === 'typing' ? 'idle' : prev);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/80">Loading mission briefing...</p>
        </div>
      </div>
    );
  }

  // Already logged in
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden" onInput={handleInputChange}>
      {/* Background Shapes */}
      <AnimatedShapes />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Mascot Zone (Desktop) */}
        <motion.div 
          {...fadeInUp}
          className="hidden lg:flex lg:w-3/5 items-center justify-center p-8"
        >
          <Mascot state={mascotState} showEyes={mascotState === 'idle'} />
        </motion.div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Mascot */}
            <motion.div 
              {...fadeInUp}
              className="lg:hidden mb-8 flex justify-center"
            >
              <div className="scale-75">
                <Mascot state={mascotState} showEyes={false} />
              </div>
            </motion.div>

            {/* Auth Card */}
            <AuthCard
              onLogin={handleLogin}
              onRegister={handleRegister}
              onGoogleSignIn={handleGoogleSignIn}
              isLoading={isAuthLoading}
            />

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-xs text-muted-foreground"
            >
              <p>
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeAuthPage;
