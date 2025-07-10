'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const supabase = createClient();
  //const router = useRouter()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for a reset link.');
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setMessage('');
    setError('');
    setEmail('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <Mail className="text-primary h-8 w-8" />
          </div>
          <h1 className="text-foreground mb-2 text-2xl font-bold">Forgot Password?</h1>
          <p className="text-muted-foreground text-sm">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
          {!isSubmitted ? (
            <>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Reset your password</CardTitle>
                <CardDescription>
                  Enter your email address and we&apos;ll send you a link to reset your password
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleReset}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="border-red-200 bg-red-50 dark:bg-red-950/30"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-primary focus:border-primary h-11 focus:ring-2"
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-2">
                  <Button
                    type="submit"
                    className="h-11 w-full font-medium"
                    disabled={loading || !email.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Reset Link
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <Link
                      href="/login"
                      className="text-muted-foreground hover:text-primary inline-flex items-center text-sm font-medium transition-colors"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Back to Login
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl text-green-700 dark:text-green-400">
                  Check your email
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-center">
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950/30">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-sm font-medium text-green-700 dark:text-green-400">
                    We&apos;ve sent a password reset link to{' '}
                    <span className="font-semibold">{email}</span>
                  </AlertDescription>
                </Alert>

                <div className="text-muted-foreground space-y-2 text-sm">
                  <p>
                    Click the link in the email to reset your password. If you don&apos;t see it,
                    check your spam folder.
                  </p>
                  <p className="text-xs">The link will expire in 1 hour for security reasons.</p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleTryAgain}
                  className="h-11 w-full font-medium"
                >
                  Try another email
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-muted-foreground hover:text-primary inline-flex items-center text-sm font-medium transition-colors"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </>
          )}
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button onClick={handleTryAgain} className="text-primary font-medium hover:underline">
              try again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
