import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { FormField } from './FormField';
import { ProviderButtons } from './ProviderButtons';
import { validators } from '@/lib/validate';
import { buttonHover, buttonTap, fadeInUp } from '@/lib/authAnimations';

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onGoogleSignIn: () => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  onGoogleSignIn,
  isLoading = false 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  const validateField = (field: 'email' | 'password', value: string) => {
    const result = validators[field](value);
    return result.isValid ? undefined : result.error;
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched({ ...touched, [field]: true });
    const value = field === 'email' ? email : password;
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
    
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }

    onSubmit(email, password, rememberMe);
  };

  return (
    <motion.form
      {...fadeInUp}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <FormField
        label="Email"
        type="email"
        placeholder="operator@tactical.squad"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : undefined}
        isValid={touched.email && !errors.email && email.length > 0}
        icon={<Mail size={18} />}
        disabled={isLoading}
      />

      <FormField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur('password')}
        error={touched.password ? errors.password : undefined}
        showPasswordToggle
        icon={<Lock size={18} />}
        disabled={isLoading}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
            className="
              w-4 h-4 rounded border-border bg-input
              text-primary focus:ring-2 focus:ring-ring focus:ring-offset-0
              cursor-pointer disabled:opacity-50
            "
          />
          <span className="text-sm text-foreground/80">Remember me</span>
        </label>

        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={isLoading ? {} : buttonHover}
        whileTap={isLoading ? {} : buttonTap}
        className="
          w-full px-4 py-3 rounded-lg font-rajdhani font-semibold text-base
          bg-primary text-primary-foreground
          hover:shadow-lg hover:shadow-primary/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          relative overflow-hidden
        "
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Authenticating...
          </span>
        ) : (
          'Deploy Mission'
        )}
      </motion.button>

      <ProviderButtons onGoogleSignIn={onGoogleSignIn} disabled={isLoading} />

      <p className="text-center text-sm text-muted-foreground">
        Protected by tactical-grade encryption 🔒
      </p>
    </motion.form>
  );
};
