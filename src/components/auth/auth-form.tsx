// @/components/auth/auth-form.tsx
'use client';

import { ReactNode, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

interface AuthFormProps {
  title: string;
  subtitle: string;
  onSubmit: (e: FormEvent) => void;
  loading?: boolean;
  error?: string;
  submitText: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthForm({
  title,
  subtitle,
  onSubmit,
  loading = false,
  error,
  submitText,
  children,
  footer,
}: AuthFormProps) {
  return (
    <div className="rounded-lg border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-foreground mb-2 text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-950/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
          </Alert>
        )}

        {/* Form Fields */}
        <div className="space-y-4">{children}</div>

        {/* Submit Button */}
        <Button type="submit" className="h-11 w-full font-medium" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitText}
        </Button>

        {/* Footer */}
        {footer && <div className="pt-2">{footer}</div>}
      </form>
    </div>
  );
}

interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export function AuthInput({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="h-11"
      />
    </div>
  );
}
