import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface SuccessAlertProps {
  countdown: number;
}

export function SuccessAlert({ countdown }: SuccessAlertProps) {
  return (
    <div className="space-y-4">
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950/30">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-sm font-medium text-green-700 dark:text-green-400">
          Your password has been successfully updated!
        </AlertDescription>
      </Alert>

      <div className="text-muted-foreground flex items-center justify-center space-x-2 text-sm">
        <ArrowRight className="h-4 w-4" />
        <span>Redirecting to login in {countdown} seconds...</span>
      </div>
    </div>
  );
}
