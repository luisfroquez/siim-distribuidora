'use client'

// import PinIcon from "public/icons/PinIcon";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { Map, Marker, NavigationControl } from 'react-map-gl'

import { NEXT_PUBLIC_MAPBOX_API_TOKEN } from '@/app/config'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'

import 'mapbox-gl/dist/mapbox-gl.css'

const Contacto = () => {
  const LATITUDE = -33.44797
  const LONGITUDE = -70.64559
  return (
    <div className="relative flex min-h-[80vh] w-full flex-col-reverse overflow-hidden md:flex-row">
      <Map
        initialViewState={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          zoom: 12,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: '100%', height: '100%' }}
        crossSourceCollisions
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={NEXT_PUBLIC_MAPBOX_API_TOKEN}
        attributionControl={false}
        scrollZoom={false}
      >
        <NavigationControl position="bottom-left" />

        <Marker
          key={1}
          longitude={LONGITUDE}
          latitude={LATITUDE}
          anchor="top"
          // onClick={(e) => {
          //   // If we let the click event propagates to the map, it will immediately close the popup
          //   // with `closeOnClick: true`
          //   e.originalEvent.stopPropagation()
          //   setShowPopup(true)
          // }}
        >
          <Icons.check transform={'scale(2)'} />
        </Marker>

        {/* {showPopup && (
          <Popup
            longitude={LONGITUDE}
            latitude={LATITUDE}
            anchor="top"
            closeButton={false}
            closeOnClick={false}
            offset={[0, 24] as Offset}
            onClose={() => setShowPopup(false)}
            style={{ minWidth: '350px' }}
          >
            <HStack lineHeight="0.9rem" p={4}>
              <VStack w="100%" spacing={1}>
                <Text fontWeight="bold" textAlign="left" w="100%">
                  Eleuterio Ramírez 731, Local A.
                </Text>
                <Text>8330253 Santiago, Región Metropolitana, Chile</Text>
              </VStack>
              <Link
                href="https://www.google.com/maps/place/Eleuterio+Ram%C3%ADrez+731,+8330253+Santiago,+Regi%C3%B3n+Metropolitana,+Chile/@-33.448038,-70.646019,18z/data=!4m5!3m4!1s0x9662c50b2c987881:0x7bb9883a07ee293!8m2!3d-33.4480591!4d-70.645584?hl=en-US"
                target="_blank"
              >
                <VStack>
                  <Text minW="max-content" lineHeight="none" textAlign="center">
                    ¿Cómo llegar?
                  </Text>
                </VStack>
              </Link>
            </HStack>

            <Button
              variant="secondary"
              size="xs"
              lineHeight="none"
              pos="absolute"
              top={2}
              fontSize="0.5rem"
              right={2}
              onClick={() => setShowPopup(false)}
            >
              X
            </Button>
          </Popup>
        )} */}
      </Map>

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

      {/* <div className="bg-[linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 100%)] md:bg-[linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 100%)] absolute right-0 top-0 z-10 h-full w-full" /> */}
    </div>
  )
}

export default Contacto
