import { NEXT_PUBLIC_WORDPRESS_API_URL } from '@/app/config'

export function getWpImageUrl(guid: string | null | undefined) {
  const url = guid ?? '/images/product-placeholder.webp'

  //   return `${NEXT_PUBLIC_WORDPRESS_API_URL}${url}`
  return url
}
