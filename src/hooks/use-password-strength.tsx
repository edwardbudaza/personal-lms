import { useEffect, useState } from 'react';

interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export function usePasswordStrength(password: string) {
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false,
  });

  const validatePassword = (pwd: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;

    // Length check
    if (pwd.length >= 8) {
      score += 20;
    } else {
      feedback.push('At least 8 characters long');
    }

    // Uppercase check
    if (/[A-Z]/.test(pwd)) {
      score += 20;
    } else {
      feedback.push('At least one uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(pwd)) {
      score += 20;
    } else {
      feedback.push('At least one lowercase letter');
    }

    // Number check
    if (/\d/.test(pwd)) {
      score += 20;
    } else {
      feedback.push('At least one number');
    }

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      score += 20;
    } else {
      feedback.push('At least one special character');
    }

    return {
      score,
      feedback,
      isValid: score >= 80,
    };
  };

  useEffect(() => {
    if (password) {
      setPasswordStrength(validatePassword(password));
    } else {
      setPasswordStrength({ score: 0, feedback: [], isValid: false });
    }
  }, [password]);

  return passwordStrength;
}
