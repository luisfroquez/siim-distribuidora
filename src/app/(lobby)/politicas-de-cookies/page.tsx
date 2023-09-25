import Breadcrumb from '@/components/ui/breadcrumb'
import Post from './post'

export const metadata = {
  title: 'Políticas de cookies',
  description:
    'Políticas de uso de cookies en la plataforma de SIIM Distribuidora.',
}

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Políticas de Cookies', href: '/cookies-policy' },
]

export default function Page() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto py-16">
      <Breadcrumb links={links} />
      <Post />
    </div>
  )
}
