import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ErrorAlert } from './error-alert';
import { SuccessAlert } from './success-alert';
import { PasswordForm } from './password-form';
import { BackToLoginLink } from './back-to-login-link';

interface ResetPasswordCardProps {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  error: string;
  success: boolean;
  loading: boolean;
  countdown: number;
  onSubmit: (e: React.FormEvent) => void;
}

export function ResetPasswordCard({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  error,
  success,
  loading,
  countdown,
  onSubmit,
}: ResetPasswordCardProps) {
  return (
    <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{success ? 'Success' : 'Reset Password'}</CardTitle>
        <CardDescription>
          {success
            ? 'You can now log in with your new password'
            : 'Enter your new password to complete the reset process'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && <ErrorAlert message={error} />}

        {success ? (
          <SuccessAlert countdown={countdown} />
        ) : (
          <PasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            loading={loading}
            onSubmit={onSubmit}
          />
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <BackToLoginLink success={success} />
      </CardFooter>
    </Card>
  );
}
