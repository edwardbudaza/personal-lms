import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';

interface ResetPasswordHeaderProps {
  success: boolean;
  error: string;
}

export function ResetPasswordHeader({ success, error }: ResetPasswordHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
        {success ? (
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        ) : error ? (
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        ) : (
          <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        )}
      </div>
      <h1 className="text-foreground mb-2 text-2xl font-bold">
        {success ? 'Password Updated!' : 'Reset Your Password'}
      </h1>
      <p className="text-muted-foreground text-sm">
        {success
          ? 'Your password has been successfully updated'
          : 'Create a new secure password for your account'}
      </p>
    </div>
  );
}
