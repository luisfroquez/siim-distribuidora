import { type Metadata } from 'next'

import { Header } from '@/components/header'
import { Icons } from '@/components/icons'
import { Shell } from '@/components/shell'
import Text from '@/components/ui/text'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { sections } from './config'

export const metadata: Metadata = {
  title: 'Ayuda, información y más',
  description: 'Toda la información y ayuda del uso de nuestra plataforma',
}

export default function BlogPage() {
  return (
    <Shell className="max-w-5xl">
      <Header
        title="¿Cómo podemos ayudarte?"
        description="Ayuda, información y más..."
        size="sm"
      />

      <div className="flex flex-col w-full">
        {sections.map((s, i) => (
          <section key={i} className="w-full flex flex-col first:pt-0 pt-8">
            <Text variant="sectionHeading" className="!text-lg">
              {s.sectionTitle}
            </Text>

            <div className="flex flex-col w-full rounded-xl overflow-hidden gap-px">
              {s.items.map((item, i) => {
                const Icon = Icons[item.icon ?? 'addCircle']
                return (
                  <Link
                    href={item.link}
                    className="flex w-full p-4 items-center bg-border gap-4 hover:bg-border/80 smooth-500 min-h-[80px]"
                  >
                    <Icon className="mx-2" />
                    <div className="flex flex-col w-full">
                      <p className="font-bold">{item.title}</p>
                      {item.description && (
                        <p className="">{item.description}</p>
                      )}
                    </div>
                    <ChevronRight className="mx-2" />
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </Shell>
  )
}
