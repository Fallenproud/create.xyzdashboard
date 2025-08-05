export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const navigationItems: NavigationItem[] = [
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'docs', label: 'Docs', href: '/docs' },
  { id: 'login', label: 'Login', href: '/login' }
] as const;

export const dashboardNavigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'build', label: 'Build', href: '/build' },
  { id: 'settings', label: 'Settings', href: '/dashboard/settings' }
] as const;

export const buildNavigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'projects', label: 'Projects', href: '/build' },
  { id: 'docs', label: 'Docs', href: '/docs' }
] as const;
