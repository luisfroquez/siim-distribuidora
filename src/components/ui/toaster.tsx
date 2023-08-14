'use client'

import { Toaster as RadToaster } from 'sonner'

export function Toaster() {
  return (
    <RadToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'rgb(var(--background))',
          color: 'rgb(var(--foreground))',
          border: '1px solid rgb(var(--border))',
        },
      }}
    />
  )
}
