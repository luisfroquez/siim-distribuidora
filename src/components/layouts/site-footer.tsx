import Link from 'next/link'

import { Icons } from '@/components/icons'
import { ThemeToggle } from '@/components/layouts/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  return (
    <footer className="h-32 w-full border-t bg-background pb-12">
      <div className="container flex flex-col items-center justify-between space-y-1 py-5 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-0">
          <span className="text-center text-base text-muted-foreground max-w-[20rem] md:max-w-none">
            Copyright © 2023 SIIM Distribuidora, empresa de{' '}
            <a
              aria-label="Link a página de SIIM Group"
              href="https://siim-group.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-slate-950 dark:hover:text-slate-200"
            >
              SIIM Group
            </a>
          </span>
          <span className="text-muted-foreground text-xs">
            Made with 🖤 by{' '}
            <a
              aria-label="Link a página del desarrollador Luis Roque"
              href="https://www.roque.dev/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-slate-950 dark:hover:text-slate-200"
            >
              roque.dev
            </a>
          </span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 md:gap-0 pt-5">
          <div className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })
                )}
              >
                <Icons.linkedin className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })
                )}
              >
                <Icons.instagram className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 md:gap-1 text-xs text-muted-foreground">
            <Link href="/politica_privacidad">Políticas de privacidad</Link>
            <Link href="/reembolso_devoluciones">
              Políticas de devoluciones y reembolsos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
