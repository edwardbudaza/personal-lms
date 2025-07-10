// @/components/auth/signup-form.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AuthForm, AuthInput } from './auth-form';
import Link from 'next/link';

export function SignupForm() {
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

    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        router.push(`/check-email?email=${encodeURIComponent(email)}`);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className="text-center">
      <p className="text-muted-foreground text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );

  return (
    <AuthForm
      title="Create Account"
      subtitle="Sign up to access the LMS platform"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitText="Create Account"
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
        placeholder="Create a password (min 6 characters)"
      />
    </AuthForm>
  );
}
