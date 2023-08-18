import type { SidebarNavItem } from '@/types'

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Cuenta',
      href: '/dashboard/account',
      icon: 'user',
      items: [],
    },
    {
      title: 'Cotizaciones',
      href: '/dashboard/quotes',
      icon: 'calculator',
      items: [],
    },
    // {
    //   title: 'Billing',
    //   href: '/dashboard/billing',
    //   icon: 'billing',
    //   items: [],
    // },
    // {
    //   title: 'Purchases',
    //   href: '/dashboard/purchases',
    //   icon: 'dollarSign',
    //   items: [],
    // },
  ],
}
