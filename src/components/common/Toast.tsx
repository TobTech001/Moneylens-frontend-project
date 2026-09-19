import { IconCheck } from '../Icons';

export default function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-24 z-[70] mx-auto flex max-w-sm items-center gap-2.5 rounded-lg border border-primary/25 bg-surface px-4 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] animate-[fadeIn_0.25s_ease-out] sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0"
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-tint text-primary">
        <IconCheck className="h-3.5 w-3.5" />
      </span>
      <p className="text-sm text-ink">{message}</p>
    </div>
  );
}