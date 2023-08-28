import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from '../icons'
import { buttonVariants } from '../ui/button'

const FloatingContactButton = () => {
  return (
    <Link
      href="https://api.whatsapp.com/send/?phone=56952083031&text=Hola%2C+me+gustar%C3%ADa+informaci%C3%B3n+sobre+un+producto+y%2Fo+cotizaci%C3%B3n.&type=phone_number&app_absent=0"
      target="_blank"
      className="absolute bottom-6 right-6 z-50"
    >
      <span
        className={cn(
          buttonVariants({
            className: 'rounded-full p-3 h-auto',
          })
        )}
      >
        <Icons.whatsapp className="text-xl" />
      </span>
    </Link>
  )
}

export default FloatingContactButton
