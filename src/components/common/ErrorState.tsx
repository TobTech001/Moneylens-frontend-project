import { IconAlertTriangle } from '../Icons';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load your financial information.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-danger/20 bg-danger/5 px-6 py-10 text-center">
      <IconAlertTriangle className="mb-3 h-6 w-6 text-danger" />
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate">{message}</p>
      {onRetry && (
        <Button type="button" variant="secondary" onClick={onRetry} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
}