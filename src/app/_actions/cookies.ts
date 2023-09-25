'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const AddCookieConsent = () => {
  try {
    cookies().set('cookieConsent', 'true')
    revalidatePath('/')
  } catch (e) {
    console.log(e)
  }
}
