// @/components/auth/login-form.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AuthForm, AuthInput } from './auth-form';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className="space-y-4">
      {/* Forgot Password */}
      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-muted-foreground hover:text-primary text-sm transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-primary font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your LMS account"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitText="Sign In"
      footer={footer}
    >
      <AuthInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        placeholder="Enter your email"
      />

      <AuthInput
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        required
        placeholder="Enter your password"
      />
    </AuthForm>
  );
}
