import { Loader2 } from 'lucide-react';
import { Header } from '@/components/header';

export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-foreground mb-2 text-xl font-semibold">Loading...</h1>
        <p className="text-muted-foreground text-sm">
          Just a moment while we get everything ready.
        </p>
      </main>
    </div>
  );
}
