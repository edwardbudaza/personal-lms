'use client';

import { Suspense } from 'react';
import { AuthCallbackLoading } from '@/components/auth/auth-callback-loading';
import { AuthCallbackContent } from '@/components/auth/auth-callback-content';

export default function AuthCallback() {
  return (
    <Suspense fallback={<AuthCallbackLoading />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
