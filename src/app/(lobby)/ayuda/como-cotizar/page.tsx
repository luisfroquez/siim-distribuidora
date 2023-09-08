'use client'

import { type Metadata } from 'next'
import HelloWorld from './hello.mdx'

export const metadata: Metadata = {
  title: '¿Cómo cotizar?',
  description: 'Paso a paso para realizar una cotización en SIIM Distribuidora',
}

export default function Page() {
  return (
    <article className="prose lg:prose-xl  dark:prose-invert ">
      <HelloWorld />
    </article>
  )
}
