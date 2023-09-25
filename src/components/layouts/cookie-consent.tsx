'use client'

import { cn } from '@/lib/utils'
import { useCookies } from 'next-client-cookies'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icons } from '../icons'
import { buttonVariants } from '../ui/button'

const CookieConsent = () => {
  const cookies = useCookies()
  const [render, setRender] = useState(true)

  useEffect(() => {
    if (cookies.get('cookieConsent')) setRender(false)
  }, [])

  const setConsent = () => {
    cookies.set('cookieConsent', 'true')
    setRender(false)
  }

  if (!render) {
    return null
  }

  return (
    <div className="flex items-center gap-8 bg-gradient-to-b from-muted/10 to-muted border border-border absolute bottom-4 mx-auto max-w-2xl rounded-xl p-8 left-0 right-0 z-50 backdrop-blur-xl">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg">Bienvenido a SIIM Distribuidora 🙌🏼</h2>
        <span className="text-sm leading-snug">
          Al utilizar este sitio web, estás aceptando nuestras{' '}
          <Link
            href="/politicas-de-cookies"
            className="smooth-500 hover:text-primary font-bold"
          >
            Políticas de Cookies
          </Link>{' '}
          y nuestras{' '}
          <Link
            href="/politicas-de-privacidad"
            className="smooth-500 hover:text-primary font-bold"
          >
            Políticas de Privacidad
          </Link>
          . Las cookies nos ayudan a mejorar tu experiencia en nuestro sitio.
          ¡Disfruta de tu visita!
        </span>
      </div>

      <div
        className={cn(
          buttonVariants({
            size: 'sm',
          }),
          'cursor-pointer'
        )}
        onClick={setConsent}
      >
        <Icons.check className="w-4 h-4" />
        <span className="sr-only">Entendido</span>
      </div>
    </div>
  )
}

export default CookieConsent
