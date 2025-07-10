import { Check, X } from 'lucide-react';

interface PasswordMatchIndicatorProps {
  password: string;
  confirmPassword: string;
}

export function PasswordMatchIndicator({ password, confirmPassword }: PasswordMatchIndicatorProps) {
  const isMatch = password === confirmPassword;

  return (
    <div className="flex items-center space-x-2 text-xs">
      {isMatch ? (
        <>
          <Check className="h-3 w-3 text-green-500" />
          <span className="text-green-600">Passwords match</span>
        </>
      ) : (
        <>
          <X className="h-3 w-3 text-red-500" />
          <span className="text-red-600">Passwords don&apos;t match</span>
        </>
      )}
    </div>
  );
}
