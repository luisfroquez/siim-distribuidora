import type { SidebarNavItem } from '@/types'

export type AdminConfig = {
  sidebarNav: SidebarNavItem[]
}

export const AdminConfig: AdminConfig = {
  sidebarNav: [
    {
      title: 'Productos',
      href: '/admin/products',
      icon: 'product',
      items: [],
    },
    {
      title: 'Usuarios',
      href: '/admin/users',
      icon: 'user',
      items: [],
    },
  ],
}
