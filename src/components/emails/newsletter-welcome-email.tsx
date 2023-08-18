import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface NewsletterWelcomeEmailProps {
  firstName?: string
  fromEmail: string
  token: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

// For previewing we need to put images in the .react-email/public folder
// In production we need to put images in the root public folder

export default function NewsletterWelcomeEmail({
  firstName = '',
  fromEmail,
  token,
}: NewsletterWelcomeEmailProps) {
  const previewText = `Hola ${firstName}, ¡Bienvenid@ al boletín informativo de SIIM Distribuidora!`

  return (
    <Html>
      <Head>
        <title>Boletín informativo - SIIM Distribuidora</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans p-8">
          <Container className="mx-auto my-[40px] max-w-2xl rounded-2xl p-4 bg-white">
            <Section className="bg-gray-100 w-full p-8 rounded">
              <Img
                src="https://distribuidora.siim.cl/wp-content/uploads/2023/08/Logo-Horizontal.png"
                alt="Logo SIIM Distribuidora"
                className="aspect-[2.43/1] w-40 object-cover mx-auto"
              />
            </Section>
            <Section className="bg-gray-100 w-full p-8 rounded">
              <Img
                src="https://distribuidora.siim.cl/wp-content/uploads/2023/08/Logo-Horizontal.png"
                alt="Logo SIIM Distribuidora"
                className="aspect-[2.43/1] w-40 object-cover mx-auto"
              />
            </Section>
            <Section className="text-gray-900 px-8">
              <Heading className="text-center text-3xl mt-8 font-bold text-blue-600">
                ¡Bienvenid@ a nuestro Boletín Informativo!
              </Heading>
            </Section>
            <Section className="text-gray-900 px-8 flex flex-col gap-4 text-left">
              <Text>
                Estamos emocionados de darte la bienvenida a nuestra comunidad.
                En SIIM Distribuidora, no solo somos expertos en materiales y
                equipos para la detección y extinción de incendios, seguridad
                electrónica, ferretería y electricidad, ¡sino que también somos
                tus socios confiables en cada paso del camino!
              </Text>

              <Text>
                Nuestro compromiso es proporcionarte información valiosa y
                actualizada sobre las últimas novedades en el mundo de la
                seguridad y la tecnología. A través de este boletín, estarás al
                tanto de las tendencias más recientes, consejos de expertos y
                promociones especiales que hemos preparado exclusivamente para
                ti.
              </Text>

              <Text>
                Desde soluciones innovadoras hasta productos de alta calidad,
                SIIM Distribuidora se enorgullece de ser tu fuente de confianza
                para todas tus necesidades en seguridad y electricidad. Estamos
                aquí para responder a tus preguntas, brindarte asesoramiento
                personalizado y asegurarnos de que cuentes con los recursos
                necesarios para tomar decisiones informadas.
              </Text>
            </Section>
            <Section>
              <Img
                src="https://distribuidora.siim.cl/wp-content/uploads/2023/08/newsletter-image.png"
                alt="SIIM Imagen de Boletin Informativo"
                height={424}
                className="aspect-video w-full object-cover mb-0 mt-4 rounded-t"
              />
            </Section>
            <Section className="bg-gray-100 w-full p-8 rounded-b text-center text-zinc-400">
              <Text>
                Te estaremos enviando nuestro boletín una vez por mes. <br /> Si
                tienes alguna pregunta, por favor no dudes en contactarnos a:{' '}
                <Link
                  href={`mailto:${fromEmail}`}
                  className="underline text-blue-500 "
                >
                  {fromEmail}
                </Link>
              </Text>
              <Text className="mt-4">
                @ SIIM Distribuidora {new Date().getFullYear()}
              </Text>
              <Text>
                Si no deseas recibir nuestros correos, puedes{' '}
                <Link
                  href={`${baseUrl}/email-preferences?token=${token}`}
                  className="text-blue-600"
                >
                  darte de baja aquí
                </Link>
                .
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
