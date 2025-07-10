'use client';

import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  Shield,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AuthState } from './auth-callback-content';

interface AuthCallbackUIProps {
  state: AuthState;
  message: string;
  countdown: number;
  isRedirecting: boolean;
  onRetry: () => void;
}

export function AuthCallbackUI({
  state,
  message,
  countdown,
  isRedirecting,
  onRetry,
}: AuthCallbackUIProps) {
  const renderIcon = () => {
    switch (state) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />;
      case 'success':
        return <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />;
      case 'expired':
        return <Mail className="h-8 w-8 text-orange-600 dark:text-orange-400" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <>
            <h2 className="mb-2 text-xl font-semibold">Confirming Your Account</h2>
            <p className="text-muted-foreground text-sm">{message}</p>
          </>
        );
      case 'success':
        return (
          <>
            <h2 className="mb-2 text-xl font-semibold text-green-700 dark:text-green-400">
              Account Confirmed!
            </h2>
            <p className="text-muted-foreground mb-4 text-sm">{message}</p>
            {countdown > 0 && (
              <div className="text-muted-foreground flex items-center justify-center space-x-2 text-sm">
                <ArrowRight className="h-4 w-4" />
                <span>Redirecting in {countdown} seconds...</span>
              </div>
            )}
            <Alert className="mt-4 border-green-200 bg-green-50 dark:bg-green-950/30">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-sm font-medium text-green-700 dark:text-green-400">
                Your email has been verified and your account is now active.
              </AlertDescription>
            </Alert>
          </>
        );
      case 'error':
        return (
          <>
            <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-400">
              Confirmation Failed
            </h2>
            <p className="text-muted-foreground mb-4 text-sm">{message}</p>
            <Alert
              variant="destructive"
              className="mb-4 border-red-200 bg-red-50 dark:bg-red-950/30"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm font-medium">
                Please try requesting a new confirmation email or contact support if the problem
                persists.
              </AlertDescription>
            </Alert>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={onRetry} variant="outline" className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Link href="/login">
                <Button variant="default" className="w-full sm:w-auto">
                  Back to Login
                </Button>
              </Link>
            </div>
          </>
        );
      case 'expired':
        return (
          <>
            <h2 className="mb-2 text-xl font-semibold text-orange-700 dark:text-orange-400">
              Link Expired
            </h2>
            <p className="text-muted-foreground mb-4 text-sm">{message}</p>
            <Alert className="mb-4 border-orange-200 bg-orange-50 dark:bg-orange-950/30">
              <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <AlertDescription className="text-sm font-medium text-orange-700 dark:text-orange-400">
                For security reasons, confirmation links expire after 24 hours. Please request a new
                one.
              </AlertDescription>
            </Alert>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/signup">
                <Button variant="outline" className="w-full sm:w-auto">
                  Request New Link
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="default" className="w-full sm:w-auto">
                  Back to Login
                </Button>
              </Link>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="w-full max-w-md">
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
          <CardContent className="space-y-4 p-8 text-center">
            <div className="bg-muted inline-flex h-16 w-16 items-center justify-center rounded-full">
              {renderIcon()}
            </div>
            {renderContent()}
          </CardContent>
        </Card>

        {isRedirecting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg bg-white p-6 text-center dark:bg-slate-800">
              <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
              <p className="text-muted-foreground text-sm">Redirecting to your dashboard...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
