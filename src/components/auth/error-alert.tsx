import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-950/30">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-sm font-medium">{message}</AlertDescription>
    </Alert>
  );
}
