import { Shield } from 'lucide-react';

export function SecurityNotice() {
  return (
    <div className="mt-8 text-center">
      <p className="text-muted-foreground text-xs">
        <Shield className="mr-1 inline h-3 w-3" />
        Your password is encrypted and stored securely
      </p>
    </div>
  );
}
