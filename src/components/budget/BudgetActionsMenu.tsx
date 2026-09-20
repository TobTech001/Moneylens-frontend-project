import { useEffect, useRef, useState } from 'react';

interface BudgetActionsMenuProps {
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BudgetActionsMenu({ onViewDetails, onEdit, onDelete }: BudgetActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function handle(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Budget actions"
        aria-haspopup="menu"
        aria-expanded={open}
        className="grid h-8 w-8 place-items-center rounded-md text-mist transition-colors hover:bg-surface-alt hover:text-ink"
      >
        ⋯
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-line bg-surface shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
        >
          <button role="menuitem" type="button" onClick={() => handle(onViewDetails)} className="block w-full px-3.5 py-2.5 text-left text-sm text-ink hover:bg-surface-alt">
            View Details
          </button>
          <button role="menuitem" type="button" onClick={() => handle(onEdit)} className="block w-full px-3.5 py-2.5 text-left text-sm text-ink hover:bg-surface-alt">
            Edit Budget
          </button>
          <button role="menuitem" type="button" onClick={() => handle(onDelete)} className="block w-full px-3.5 py-2.5 text-left text-sm text-danger hover:bg-danger/10">
            Delete Budget
          </button>
        </div>
      )}
    </div>
  );
}