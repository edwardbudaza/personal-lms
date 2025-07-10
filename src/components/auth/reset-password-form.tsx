'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ResetPasswordHeader } from './reset-password-header';
import { ResetPasswordCard } from './reset-password-card';
import { SecurityNotice } from './security-notice';
import { VerificationLoader } from './verification-loader';

export function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [countdown, setCountdown] = useState(5);

  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const code = params.get('code');

    if (!code) {
      setError('Invalid or expired reset link.');
      setVerifying(false);
      return;
    }

    const handleExchange = async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setError('Could not verify reset token. The link may have expired.');
        }
      } catch {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setVerifying(false);
      }
    };

    handleExchange();
  }, [params, supabase]);

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      router.push('/login');
    }
  }, [success, countdown, router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return <VerificationLoader />;
  }

  return (
    <div className="w-full max-w-md">
      <ResetPasswordHeader success={success} error={error} />
      <ResetPasswordCard
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        error={error}
        success={success}
        loading={loading}
        countdown={countdown}
        onSubmit={handleReset}
      />
      <SecurityNotice />
    </div>
  );
}
