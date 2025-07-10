import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function VerificationLoader() {
  return (
    <Card className="w-full max-w-md border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
      <CardContent className="p-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-foreground mb-2 text-xl font-semibold">Verifying Reset Link</h2>
        <p className="text-muted-foreground text-sm">
          Please wait while we verify your password reset link...
        </p>
      </CardContent>
    </Card>
  );
}
