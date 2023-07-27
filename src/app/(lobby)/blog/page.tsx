import { type Metadata } from 'next'

import { Header } from '@/components/header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore the latest news and updates from SIIM Distribuidora',
}

export default function BlogPage() {
  return (
    <Shell>
      {/* <Header
        title="Blog"
        description="Explore the latest news and updates from the community"
        size="sm"
      /> */}
      <div className="flex h-80 w-full flex-col items-center justify-center rounded-lg bg-border">
        <h2 className="text-2xl font-bold">Under construction</h2>
        <p className="mt-1.5 text-muted-foreground">Please check back later</p>
      </div>
    </Shell>
  )
}
