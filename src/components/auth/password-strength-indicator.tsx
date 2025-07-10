import { Check, X } from 'lucide-react';

interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

interface PasswordStrengthIndicatorProps {
  passwordStrength: PasswordStrength;
  password: string;
}

export function PasswordStrengthIndicator({
  passwordStrength,
  password,
}: PasswordStrengthIndicatorProps) {
  const getStrengthColor = (score: number) => {
    if (score < 40) return 'bg-red-500';
    if (score < 60) return 'bg-orange-500';
    if (score < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score < 40) return 'Weak';
    if (score < 60) return 'Fair';
    if (score < 80) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs">Password strength:</span>
        <span
          className={`text-xs font-medium ${
            passwordStrength.score >= 80
              ? 'text-green-600'
              : passwordStrength.score >= 60
                ? 'text-yellow-600'
                : 'text-red-600'
          }`}
        >
          {getStrengthText(passwordStrength.score)}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
          style={{ width: `${passwordStrength.score}%` }}
        />
      </div>

      <div className="space-y-1">
        {[
          { check: password.length >= 8, text: 'At least 8 characters' },
          { check: /[A-Z]/.test(password), text: 'One uppercase letter' },
          { check: /[a-z]/.test(password), text: 'One lowercase letter' },
          { check: /\d/.test(password), text: 'One number' },
          { check: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'One special character' },
        ].map((req, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            {req.check ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-red-500" />
            )}
            <span className={req.check ? 'text-green-600' : 'text-muted-foreground'}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
