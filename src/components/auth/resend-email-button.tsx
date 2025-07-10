'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock } from 'lucide-react';

export default function ResendEmailButton({ onResend }: { onResend: () => void }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleClick = async () => {
    setIsResending(true);
    await onResend();
    setTimeLeft(60);
    setIsResending(false);
  };

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <Button
      onClick={handleClick}
      disabled={timeLeft > 0 || isResending}
      variant="outline"
      className="h-11 w-full font-medium"
    >
      {isResending ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Resending...
        </>
      ) : timeLeft > 0 ? (
        <>
          <Clock className="mr-2 h-4 w-4" />
          Resend in {formatTime(timeLeft)}
        </>
      ) : (
        <>
          <RefreshCw className="mr-2 h-4 w-4" />
          Resend Confirmation
        </>
      )}
    </Button>
  );
}
