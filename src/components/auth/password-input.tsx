import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
  placeholder: string;
  autoComplete: string;
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  show,
  onToggleShow,
  placeholder,
  autoComplete,
}: PasswordInputProps) {
  return (
    <>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="focus:ring-primary focus:border-primary h-11 pr-10 focus:ring-2"
          placeholder={placeholder}
          required
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </>
  );
}
