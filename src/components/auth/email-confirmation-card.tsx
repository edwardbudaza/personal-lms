'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CheckEmailTips from './check-email-tips';
import ResendEmailButton from './resend-email-button';

export default function EmailConfirmationCard() {
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const supabase = createClient();

  const handleResend = async () => {
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) setResendError(error.message);
      else setResendMessage('Confirmation email sent successfully!');
    } catch (err) {
      console.error(err);
      setResendError('Failed to resend email. Please try again.');
    }
  };

  return (
    <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-400">
          Confirm Your Email
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          We&apos;ve sent a confirmation link to{' '}
          <span className="text-foreground font-semibold">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Check your inbox and click the confirmation link to activate your account.
          </AlertDescription>
        </Alert>

        {resendMessage && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/30">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-sm font-medium text-green-700 dark:text-green-400">
              {resendMessage}
            </AlertDescription>
          </Alert>
        )}

        {resendError && (
          <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-950/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm font-medium">{resendError}</AlertDescription>
          </Alert>
        )}

        <CheckEmailTips />
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 pt-2">
        <ResendEmailButton onResend={handleResend} />
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
    </Card>
  );
}
