'use client';

import { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { PageLoader } from '@/components/auth/page-loader';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <Suspense fallback={<PageLoader />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
