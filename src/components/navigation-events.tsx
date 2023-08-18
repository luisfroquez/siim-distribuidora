'use client'

import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import { useEffect } from 'react'

export function NavigationEvents() {
  useEffect(() => {
    Router.events.on('routeChangeStart', () => nProgress.start())
    Router.events.on('routeChangeComplete', () => nProgress.done())
    Router.events.on('routeChangeError', () => nProgress.done())

    return () => {
      Router.events.off('routeChangeStart', () => nProgress.start())
      Router.events.off('routeChangeComplete', () => nProgress.done())
      Router.events.off('routeChangeError', () => nProgress.done())
    }
  }, [])

  return (
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
    </Head>
  )
}
