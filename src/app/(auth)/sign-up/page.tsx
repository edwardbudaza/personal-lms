// app/(auth)/sign-up/page.tsx
import { AuthLayout } from '@/components/auth/auth-layout';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
