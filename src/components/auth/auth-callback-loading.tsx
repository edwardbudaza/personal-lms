'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function AuthCallbackLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="w-full max-w-md">
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
          <CardContent className="p-8">
            <div className="space-y-4 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-foreground mb-2 text-xl font-semibold">Loading...</h2>
                <p className="text-muted-foreground text-sm">Preparing authentication...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
