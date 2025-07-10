'use client';

import { Suspense } from 'react';
import EmailConfirmationCard from '@/components/auth/email-confirmation-card';
import { Mail, CheckCircle2 } from 'lucide-react';

function LoadingState() {
  return (
    <div className="mb-8 text-center">
      <div className="relative mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
        <Mail className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
      </div>
      <h1 className="text-foreground mb-2 text-2xl font-bold">Check Your Email</h1>
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="w-full max-w-md">
        <Suspense fallback={<LoadingState />}>
          <EmailConfirmationCard />
        </Suspense>
        <div className="text-muted-foreground mt-8 text-center text-xs">
          Still having trouble?{' '}
          <a href="/support" className="text-primary font-medium hover:underline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
