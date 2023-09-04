import { Icons } from '@/components/icons'

export interface HelpProps {
  sectionTitle: string
  items: {
    title: string
    link: string
    icon: keyof typeof Icons
    description?: string
  }[]
}
