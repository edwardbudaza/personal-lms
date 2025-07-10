'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AuthCallbackUI } from './auth-callback-ui';

export type AuthState = 'loading' | 'success' | 'error' | 'expired' | 'invalid';

export function AuthCallbackContent() {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [message, setMessage] = useState('Confirming your account...');
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        const type = searchParams.get('type');

        if (error) {
          setAuthState('error');
          setMessage(errorDescription || 'Authentication failed. Please try again.');
          return;
        }

        if (type === 'recovery') {
          setAuthState('success');
          setMessage('Password reset confirmed! Redirecting to reset password...');
          setTimeout(() => router.push('/reset-password'), 2000);
          return;
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError.message);
          setAuthState('error');
          setMessage('Failed to confirm your account. Please try again.');
          return;
        }

        if (session) {
          setAuthState('success');
          setMessage('Account confirmed successfully! Redirecting to dashboard...');
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                setIsRedirecting(true);
                router.push('/');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          return () => clearInterval(timer);
        }

        setAuthState('expired');
        setMessage('The confirmation link has expired or is invalid.');
      } catch (err) {
        console.error('Auth callback error:', err);
        setAuthState('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleAuthRedirect();
  }, [router, searchParams, supabase]);

  const handleRetry = () => {
    setAuthState('loading');
    setMessage('Retrying confirmation...');
    window.location.reload();
  };

  return (
    <AuthCallbackUI
      state={authState}
      message={message}
      countdown={countdown}
      isRedirecting={isRedirecting}
      onRetry={handleRetry}
    />
  );
}
