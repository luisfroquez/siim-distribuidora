'use client'

import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'

import 'mapbox-gl/dist/mapbox-gl.css'

const Contacto = () => {
  return (
    <div className="relative flex min-h-[80vh] w-full flex-col-reverse overflow-hidden md:flex-row items-center gap-16">
      <div className="relative w-full h-[700px] rounded-xl overflow-hidden ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0480521645595!2d-70.64815892353478!3d-33.44805459739081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5737cbe894d%3A0xdb2ee09bc925e3f4!2sSIIM!5e0!3m2!1sen!2scl!4v1693238655384!5m2!1sen!2scl"
          width="100%"
          height="700"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          lang="es"
        ></iframe>
      </div>

      <div className="flex h-full w-full flex-col justify-between bg-background py-24 text-left md:py-32 md:text-right ">
        <div className=" flex flex-col items-start gap-6 md:items-end md:gap-6">
          <Text variant="heading">¡CONTÁCTANOS!</Text>

          <p className="max-w-xl text-end text-base md:text-xl xl:text-xl">
            Conversar es la mejor manera de manifestar su necesidad y nosotros
            aportar la solución.
          </p>

          <Link
            href="https://api.whatsapp.com/send/?phone=56952083031&text=Hola%2C+me+gustar%C3%ADa+informaci%C3%B3n+sobre+un+producto+y%2Fo+cotizaci%C3%B3n.&type=phone_number&app_absent=0"
            target="_blank"
          >
            <Button className="gap-2">
              <Icons.whatsapp /> Contáctanos
            </Button>
          </Link>
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-8 pt-6 md:items-end xl:flex-row-reverse">
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center justify-center gap-2">
              <PhoneOutlined width="24px" rev={undefined} />
              <Text>+56 2 3301 0928</Text>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MailOutlined width="24px" rev={undefined} />
              <Text>ventas@siim.cl</Text>
            </div>
            <div className="flex items-center justify-center gap-2">
              <PushpinOutlined width="24px" rev={undefined} />
              <Text>Eleuterio Ramírez 731, Local A, Santiago.</Text>
            </div>
          </div>

          <div className="flex flex-col">
            <Text className="font-bold"> Síguenos</Text>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Link
                href="https://www.facebook.com/SIIMSPAgroup"
                target="_blank"
              >
                <FacebookOutlined width="24px" rev={undefined} />
              </Link>
              <Link
                href="https://www.instagram.com/siimdistribuidora/"
                target="_blank"
              >
                <InstagramOutlined width="24px" rev={undefined} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/siim-group-43b2bb1b9/"
                target="_blank"
              >
                <LinkedinOutlined width="24px" rev={undefined} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
