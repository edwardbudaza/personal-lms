import Link from 'next/link';

interface BackToLoginLinkProps {
  success: boolean;
}

export function BackToLoginLink({ success }: BackToLoginLinkProps) {
  return (
    <div className="w-full text-center">
      <Link
        href="/login"
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
      >
        {success ? 'Go to Login Now' : 'Back to Login'}
      </Link>
    </div>
  );
}
