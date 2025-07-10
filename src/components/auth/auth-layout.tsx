// @/components/auth/auth-layout.tsx
'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="w-full max-w-md">
        {children}

        {/* Footer Help */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            Need help?{' '}
            <a href="/support" className="text-primary font-medium hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
