import { useEffect, useId, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { IconCheck, IconChevronDown } from '../Icons';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  hint?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  'aria-label'?: string;
  className?: string;
}

/**
 * A custom-styled dropdown that replaces the browser's native <select>,
 * whose open list can't be themed and looks jarringly out of place in a
 * dark UI (renders with the OS's light-mode list style in most browsers).
 *
 * Drop-in compatible with the previous native-select-based Select: it still
 * calls `onChange` with an event shaped like `{ target: { value } }`, so
 * every existing call site (`onChange={(e) => setX(e.target.value)}`)
 * keeps working unchanged.
 */
export default function Select({
  label,
  options,
  value,
  onChange,
  error,
  hint,
  id,
  disabled,
  placeholder = 'Select…',
  className = '',
  ...rest
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const listboxId = `${selectId}-listbox`;

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setHighlightedIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    // Scroll the highlighted option into view when opening.
    requestAnimationFrame(() => {
      const el = listRef.current?.querySelector<HTMLElement>('[data-highlighted="true"]');
      el?.scrollIntoView({ block: 'nearest' });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function commit(optionValue: string) {
    onChange?.({ target: { value: optionValue } } as ChangeEvent<HTMLSelectElement>);
    setOpen(false);
  }

  function moveHighlight(delta: number) {
    setHighlightedIndex((prev) => {
      let next = prev;
      for (let i = 0; i < options.length; i++) {
        next = (next + delta + options.length) % options.length;
        if (!options[next]?.disabled) break;
      }
      return next;
    });
  }

  function handleTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        moveHighlight(e.key === 'ArrowDown' ? 1 : -1);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        const opt = options[highlightedIndex];
        if (opt && !opt.disabled) commit(opt.value);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          id={selectId}
          disabled={disabled}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={handleTriggerKeyDown}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={rest['aria-label']}
          className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-surface-alt py-3 pl-3.5 pr-3 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60 ${
            error ? 'border-danger focus:border-danger' : open ? 'border-primary' : 'border-line hover:border-line-soft'
          } ${className}`}
        >
          <span className={selected ? 'truncate text-ink' : 'truncate text-mist'}>{selected ? selected.label : placeholder}</span>
          <IconChevronDown className={`h-4 w-4 shrink-0 text-mist transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-60 overflow-y-auto rounded-lg border border-line bg-surface py-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] animate-[fadeIn_0.15s_ease-out]"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isHighlighted = i === highlightedIndex;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  data-highlighted={isHighlighted}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onClick={() => !opt.disabled && commit(opt.value)}
                  className={`flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2.5 text-sm transition-colors ${
                    opt.disabled
                      ? 'cursor-not-allowed text-mist'
                      : isHighlighted
                        ? 'bg-surface-alt text-ink'
                        : 'text-ink hover:bg-surface-alt'
                  } ${isSelected ? 'font-medium' : ''}`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <IconCheck className="h-4 w-4 shrink-0 text-primary" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-mist">{hint}</p>
      ) : null}
    </div>
  );
}