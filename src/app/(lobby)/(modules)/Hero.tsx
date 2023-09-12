import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Hero = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-t-xl border border-border py-16 md:py-40 ">
      <div className="flex flex-col items-center justify-items-center gap-6 md:gap-4 max-w-[16rem] md:max-w-2xl text-center">
        <h1 className="overflow-hidden bg-gradient-to-r from-blue-400 to-primary bg-clip-text  text-3xl font-bold leading-tight tracking-tight text-transparent md:text-5xl lg:text-6xl ">
          SIIM Distribuidora®
        </h1>
        <p className="text-center max-w-[16rem] md:max-w-[46rem] pb-4 md:text-lg text-muted-foreground text-sm">
          Tus socios confiables en materiales y equipos para la detección y
          extinción de incendios, seguridad electrónica, ferretería y
          electricidad.
        </p>
        <div className="flex gap-4 md:flex-row flex-col items-center">
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
          <Link href="/tienda">
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
