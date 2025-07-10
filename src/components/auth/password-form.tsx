import { Button } from '@/components/ui/button';
import { Loader2, Shield } from 'lucide-react';
import { PasswordInput } from './password-input';
import { PasswordStrengthIndicator } from './password-strength-indicator';
import { PasswordMatchIndicator } from './password-match-indicator';
import { usePasswordStrength } from '@/hooks/use-password-strength';

interface PasswordFormProps {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function PasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
  onSubmit,
}: PasswordFormProps) {
  const passwordStrength = usePasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    if (!passwordStrength.isValid) {
      return;
    }

    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <PasswordInput
          id="password"
          label="New Password"
          value={password}
          onChange={setPassword}
          show={showPassword}
          onToggleShow={() => setShowPassword(!showPassword)}
          placeholder="Enter your new password"
          autoComplete="new-password"
        />

        {password && (
          <PasswordStrengthIndicator passwordStrength={passwordStrength} password={password} />
        )}
      </div>

      <div className="space-y-2">
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          show={showConfirmPassword}
          onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
          placeholder="Confirm your new password"
          autoComplete="new-password"
        />

        {confirmPassword && (
          <PasswordMatchIndicator password={password} confirmPassword={confirmPassword} />
        )}
      </div>

      <Button
        type="submit"
        className="h-11 w-full font-medium"
        disabled={loading || !passwordStrength.isValid || password !== confirmPassword}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating Password...
          </>
        ) : (
          <>
            <Shield className="mr-2 h-4 w-4" />
            Update Password
          </>
        )}
      </Button>
    </form>
  );
}
