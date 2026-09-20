import type { ComponentType, SVGProps } from 'react';
import { IconChart, IconTarget, IconHandshake, IconBell } from '../Icons';
import { IconGrid, IconReceipt, IconUserCircle, IconSettings } from '../Icons';

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: IconGrid },
      { label: 'Transactions', href: '/transactions', icon: IconReceipt },
      { label: 'Analytics', href: '/analytics', icon: IconChart },
    ],
  },
  {
    title: 'Financial Management',
    items: [
      { label: 'Budget', href: '/budget', icon: IconTarget },
      { label: 'Borrow & Lend', href: '/borrow-lend', icon: IconHandshake },
      { label: 'Subscriptions', href: '/subscriptions', icon: IconBell },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', href: '/profile', icon: IconUserCircle },
      { label: 'Settings', href: '/settings', icon: IconSettings },
    ],
  },
];

// Most important pages for the mobile bottom nav.
export const MOBILE_PRIMARY_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: IconGrid },
  { label: 'Transactions', href: '/transactions', icon: IconReceipt },
  { label: 'Analytics', href: '/analytics', icon: IconChart },
  { label: 'Budget', href: '/budget', icon: IconTarget },
  { label: 'Borrow & Lend', href: '/borrow-lend', icon: IconHandshake },
];