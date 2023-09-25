import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NavigationEvents } from '@/components/navigation-events'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'
import { ApolloClientProvider } from '@/lib/apollo/apollo-client-provider'
import { ClientCookiesProvider } from '@/lib/client-cookies-provider'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { cookies } from 'next/headers'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://distribuidora.siim.cl'),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    'Siim',
    'Siim Distribuidora',
    'Siim Ingeniería',
    'Siim Group',
    'Ingeniería',
    'Distribuidora de Materiales Contra Incendios',
    'Incendio',
    'Protección contra incendios',
    'Ecommerce',
  ],
  authors: [
    {
      name: 'Luis Roque',
      url: 'https://github.com/luisfroquez',
    },
  ],
  creator: 'luisfroquez',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@sadmann7',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ClientCookiesProvider value={cookies().getAll()}>
        <ApolloClientProvider>
          <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
              <head />

              {/* GOOGLE ANALYTICS */}
              <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-8XD5EK99JX"
              />
              <Script id="google-analytics">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-8XD5EK99JX');
               `}
              </Script>

              <body
                className={cn(
                  'min-h-screen bg-background font-sans antialiased',
                  fontSans.variable,
                  fontMono.variable
                )}
                suppressHydrationWarning={true}
              >
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  {children}
                  <Suspense fallback={null}>
                    <NavigationEvents />
                  </Suspense>
                  {/* <TailwindIndicator /> */}
                </ThemeProvider>
                <Toaster />
              </body>
            </html>
          </ClerkProvider>
        </ApolloClientProvider>
      </ClientCookiesProvider>
    </>
  )
}
