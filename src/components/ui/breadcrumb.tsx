import { cn } from '@/lib/utils'
import Link from 'next/link'

interface BreadcrumbProps {
  links: { label: string; href: string }[]
}

const Breadcrumb = async ({ links }: BreadcrumbProps) => {
  return (
    <div className="mb-4 flex w-full gap-2 py-2 text-xs">
      {links.map((data, i) => {
        const isLast = i === links.length - 1

        return (
          <>
            <Link
              href={data.href}
              aria-label={`Ir a ${data.label}`}
              key={i}
              className={cn('hover:underline', {
                'font-bold': isLast,
              })}
            >
              {data.label}
            </Link>
            {!isLast && <p>/</p>}
          </>
        )
      })}
    </div>
  )
}

export default Breadcrumb
