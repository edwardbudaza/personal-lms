export default function CheckEmailTips() {
  return (
    <div className="space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-slate-800/50">
      <h4 className="text-foreground text-sm font-semibold">Didn&apos;t receive the email?</h4>
      <ul className="text-muted-foreground space-y-1 text-xs">
        <li>• Check your spam or junk folder</li>
        <li>• Make sure you entered the correct email address</li>
        <li>• The email might take a few minutes to arrive</li>
        <li>• Check if your email provider is blocking emails</li>
      </ul>
    </div>
  );
}
