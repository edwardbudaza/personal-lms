'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <Bug className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-foreground mb-2 text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We encountered an unexpected error. Try again or go back to home.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => reset()}>
            Try Again
          </Button>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
