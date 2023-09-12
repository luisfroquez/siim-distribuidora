import Breadcrumb from '@/components/ui/breadcrumb'
import Post from './post'

export const metadata = {
  title: '¿Cómo cotizar?',
  description:
    'Paso a paso para realizar una solicitud de cotización en la plataforma de SIIM Distribuidora.',
}

const links = [
  { label: 'Ayuda', href: '/ayuda' },
  { label: '¿Cómo cotizar?', href: '/ayuda/como-cotizar' },
]

export default function Page() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto py-16">
      <Breadcrumb links={links} />
      <Post />
    </div>
  )
}
