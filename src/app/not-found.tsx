import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
          <AlertTriangle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h1 className="text-foreground mb-2 text-2xl font-semibold">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </main>
    </div>
  );
}
