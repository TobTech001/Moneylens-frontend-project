import type { SVGProps } from 'react';

// Single shared icon set for the whole app. Every component imports from
// here via '../icons' (one level up from any components/<folder>/ file).

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* ---------- landing / marketing icons ---------- */

export function IconCard(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 14.5h4" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5V9" />
      <path d="M10 20.5V3.5" />
      <path d="M16.5 20.5v-7" />
      <path d="M2.5 20.5h19" />
    </svg>
  );
}

export function IconTag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11.5 3.5h6a1 1 0 0 1 1 1v6a1 1 0 0 1-.3.7l-9 9a1 1 0 0 1-1.4 0l-6.5-6.5a1 1 0 0 1 0-1.4l9-9a1 1 0 0 1 .7-.3Z" />
      <circle cx="15" cy="8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconHandshake(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 11.5 7 7l3 2.2" />
      <path d="M21.5 11.5 17 7l-3 2.2" />
      <path d="M10 9.2 6 13l2.7 2.6a1.6 1.6 0 0 0 2.3 0l.3-.3" />
      <path d="M14 9.2 18 13l-2.7 2.6a1.6 1.6 0 0 1-2.3 0" />
      <path d="M9.3 14.6 12 17.2l2.3-2.2" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9.5a6 6 0 0 1 12 0c0 4 1.5 5.3 1.5 5.3H4.5S6 13.5 6 9.5Z" />
      <path d="M9.8 18.2a2.2 2.2 0 0 0 4.4 0" />
    </svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 22 20.5H2L12 3.5Z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBulb(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 18.5h6" />
      <path d="M10 21h4" />
      <path d="M12 3.5a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3.5Z" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16" />
      <path d="M13.5 5.5 20 12l-6.5 6.5" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 6.5h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 17.5h17" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 15.5V4" />
      <path d="M7.5 8.5 12 4l4.5 4.5" />
      <path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 21 8.5 12 13.5 3 8.5 12 3.5Z" />
      <path d="M3 13.5 12 18.5 21 13.5" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

/* ---------- auth / form icons ---------- */

export function IconEyeOff(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.7A10.6 10.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a13 13 0 0 1-3.1 3.8" />
      <path d="M6.4 6.9A13.3 13.3 0 0 0 2.5 12S6 18.5 12 18.5a10.4 10.4 0 0 0 4.2-.9" />
      <path d="M9.6 10.2a2.6 2.6 0 0 0 3.6 3.6" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5l5 5 10-10" />
    </svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12H4" />
      <path d="M10.5 5.5 4 12l6.5 6.5" />
    </svg>
  );
}

export function IconAlertTriangle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 22 20.5H2L12 3.5Z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------- dashboard / app-shell icons ---------- */

export function IconGrid(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.8" />
      <rect x="13" y="3" width="8" height="8" rx="1.8" />
      <rect x="3" y="13" width="8" height="8" rx="1.8" />
      <rect x="13" y="13" width="8" height="8" rx="1.8" />
    </svg>
  );
}

export function IconReceipt(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h12v18l-2.5-1.5L13 21l-1.5-1.5L10 21l-2.5-1.5L5 21V3h1Z" />
      <path d="M8.5 8h7" />
      <path d="M8.5 12h7" />
      <path d="M8.5 16h4" />
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H4.5a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h0a1.7 1.7 0 0 0 1-1.55V4.5a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v0a1.7 1.7 0 0 0 1.55 1h.09a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M20.5 20.5 16 16" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15.5 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5a2 2 0 0 0 2-2v-2" />
      <path d="M20.5 12H10" />
      <path d="M17 8.5 20.5 12 17 15.5" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5v15" />
      <path d="M4.5 12h15" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 8.5 12 15l6.5-6.5" />
    </svg>
  );
}

export function IconUserCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6 18.5a6.5 6.5 0 0 1 12 0" />
    </svg>
  );
}