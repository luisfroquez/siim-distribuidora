import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const Hero = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-t-xl border border-border py-40">
      <div className="flex max-w-2xl flex-col items-center justify-items-center gap-4">
        <h1 className="overflow-hidden bg-gradient-to-r from-blue-400 to-primary bg-clip-text  text-3xl font-bold leading-tight tracking-tight text-transparent md:text-5xl lg:text-6xl ">
          SIIM Distribuidora®
        </h1>
        <p className="max-w-[46rem] pb-4 text-center text-lg text-muted-foreground sm:text-xl">
          Tus socios confiables en materiales y equipos para la detección y
          extinción de incendios, seguridad electrónica, ferretería y
          electricidad.
        </p>
        <div className="flex gap-4 ">
          <Link href="/contacto">
            <div
              className={cn(
                buttonVariants({
                  size: 'lg',
                }),
                'smooth-700 rounded-xl bg-gradient-to-r from-blue-400 to-primary hover:bg-blue-900'
              )}
            >
              Contáctanos
              <span className="sr-only">Contáctanos</span>
            </div>
          </Link>
          <Link href="/products">
            <div
              className={cn(
                buttonVariants({
                  size: 'lg',
                  variant: 'secondary',
                }),
                'rounded-xl '
              )}
            >
              Ver productos
              <span className="sr-only">Contáctanos</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
