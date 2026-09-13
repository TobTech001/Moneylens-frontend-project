import { IconAlertTriangle } from '../Icons';

interface AuthErrorProps {
  title?: string;
  message: string;
}

export default function AuthError({ title = 'Unable to continue', message }: AuthErrorProps) {
  return (
    <div role="alert" className="mb-6 flex items-start gap-3 rounded-lg border border-danger/25 bg-danger/10 p-3.5">
      <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate">{message}</p>
      </div>
    </div>
  );
}