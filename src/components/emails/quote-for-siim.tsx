import { type Quote } from '@/db/schema'
import { RequestQuoteInputTypes } from '@/lib/validations/quote'
import { type QuoteLineItem } from '@/types'
import { getSingleWpImageUrl } from '@/utils/get-wp-image-url'
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

interface QuoteForSIIMProps {
  input: RequestQuoteInputTypes
  quote?: Quote
  quoteLineItems: QuoteLineItem[]
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

// const prueba = [
//   {
//     id: 'cHJvZHVjdDoxMzMx',
//     name: 'Palanca Manual Direccionable Doble Acción',
//     sku: '91076',
//     slug: 'palanca-manual-direccionable-doble-accion',
//     attributes: null,
//     productCategories: {
//       nodes: [
//         {
//           name: 'Palancas',
//           uri: '/categoria-producto/sistemas-de-proteccion-contra-incendio/deteccion-de-incendio/palancas/',
//         },
//       ],
//     },
//     featuredImage: {
//       node: {
//         uri: 'cG9zdDoxMzI1',
//         altText: '',
//         guid: '`${NEXT_PUBLIC_CONTENT_URL}/uploads/2022/06/Palanca-Manual-Direccionable-Doble-Accion.png',
//       },
//     },

//     quantity: 1,
//   },
//   {
//     id: 'cHJvZHVjdDoxMzMx',
//     name: 'Palanca Manual Direccionable Doble Acción',
//     sku: '91076',
//     slug: 'palanca-manual-direccionable-doble-accion',
//     attributes: null,
//     productCategories: {
//       nodes: [
//         {
//           name: 'Palancas',
//           uri: '/categoria-producto/sistemas-de-proteccion-contra-incendio/deteccion-de-incendio/palancas/',
//         },
//       ],
//     },
//     featuredImage: {
//       node: {
//         uri: 'cG9zdDoxMzI1',
//         altText: '',
//         guid: '`${NEXT_PUBLIC_CONTENT_URL}/uploads/2022/06/Palanca-Manual-Direccionable-Doble-Accion.png',
//       },
//     },

//     quantity: 25,
//   },
// ] satisfies QuoteLineItem[]

export const QuoteForSIIM = ({
  input,
  quote,
  quoteLineItems,
}: QuoteForSIIMProps) => {
  const previewText = `¡Nueva solicitud de cotización recibida desde distribudora.siim.cl!`

  const objectDate = quote?.createdAt ?? new Date()
  const day = objectDate.getDate()
  const month = objectDate.getMonth() + 1
  const year = objectDate.getFullYear()
  const date = `${day}/${month}/${year}`

  const total = quoteLineItems.reduce((acc, q) => acc + (q.quantity ?? 0), 0)
  return (
    <Html>
      <Head>
        <title>{`Solicitud de Cotización N°${quote?.id ?? '-'}`}</title>
      </Head>
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Column>
              <Img
                src="https://wp.siim.cl/wp-content/uploads/2023/09/Isotipo-Distribuidora.png"
                width="42"
                height="42"
                alt="SIIM Logo"
                style={{ objectFit: 'contain' }}
              />
            </Column>

            <Column align="right" style={tableCell}>
              <Text style={heading}>Solicitud de Cotización</Text>
            </Column>
          </Section>

          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Nombre</Text>
                    <Text style={informationTableValue}>
                      {input?.name ?? '-'} {input?.lastName ?? '-'}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>
                      Fecha de cotización
                    </Text>
                    <Text style={informationTableValue}>{date}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>
                      ID de la cotización
                    </Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: '#15c',
                        textDecoration: 'underline',
                      }}
                    >
                      {quote?.id ?? '-'}
                    </Link>
                  </Column>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Teléfono</Text>
                    <Text style={informationTableValue}>
                      {input?.phone ?? '-'}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Correo</Text>
                    <Text style={informationTableValue}>
                      {input?.email ?? '-'}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Comentario</Text>
                    <Text style={informationTableValue}>
                      {input?.comments ?? '-'}
                    </Text>
                  </Column>
                </Row>
              </Column>

              <Column style={informationTableColumn} colSpan={2}>
                <Text style={informationTableLabel}>Cotizar a</Text>
                <Text style={informationTableValue}>
                  {input?.razonSocial ?? '-'}
                </Text>
                <Text style={informationTableValue}>{input?.rut ?? '-'}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={productTitleTable}>
            <Text style={productsTitle}>Items</Text>
          </Section>
          {quoteLineItems.map((q, i) => (
            <Section
              key={i}
              style={i > 0 ? { marginTop: '16px' } : { marginTop: '0' }}
            >
              <Column style={{ width: '64px' }}>
                <Img
                  src={getSingleWpImageUrl(q.featuredImage?.node)}
                  width="64"
                  height="64"
                  alt={q.featuredImage?.node?.altText ?? q.name}
                  style={productIcon}
                />
              </Column>
              <Column style={{ paddingLeft: '22px' }}>
                <Link
                  href={`${baseUrl}/tienda/producto/${q.slug}`}
                  aria-label={`Ir a ${q.name}`}
                  style={productTitle}
                >
                  {q.name}
                </Link>
                <Text style={productDescription}>
                  <strong>SKU: </strong>
                  {q.sku}
                </Text>
                <Text style={productDescription}>
                  <strong>Categoría:</strong>{' '}
                  {q.productCategories.nodes[0]?.name ?? ''}
                </Text>
              </Column>

              <Column style={productPriceWrapper} align="right">
                <Text style={productPrice}>{q.quantity}</Text>
              </Column>
            </Section>
          ))}

          <Hr style={productPriceLine} />
          <Section align="right">
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>CANTIDAD TOTAL DE ITEMS</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>{total}</Text>
            </Column>
          </Section>
          <Hr style={productPriceLineBottom} />

          <Text style={footerLinksWrapper}>
            <Link href="https://distribuidora.siim.cl/">Configurar cuenta</Link>{' '}
            •{' '}
            <Link href="https://distribuidora.siim.cl/">
              Términos y condiciones
            </Link>{' '}
            •{' '}
            <Link href="https://distribuidora.siim.cl/">
              Políticas de privacidad{' '}
            </Link>
          </Text>
          <Text style={footerCopyright}>
            Copyright © 2023 SIIM Distribuidora <br />{' '}
            <Link href="https://distribuidora.siim.cl/">
              Todos los derechos reservados
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default QuoteForSIIM

const main = {
  fontFamily: '"Inter",sans-serif',
  backgroundColor: '#ffffff',
}

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
}

const tableCell = { display: 'table-cell' }

const heading = {
  fontSize: '32px',
  fontWeight: '300',
  color: '#888888',
}

const cupomText = {
  textAlign: 'center' as const,
  margin: '36px 0 40px 0',
  fontSize: '14px',
  fontWeight: '500',
  color: '#111111',
}

const supStyle = {
  fontWeight: '300',
}

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
  marginTop: '16px',
}

const informationTableRow = {
  height: '46px',
}

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
}

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
}

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
}

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
}

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
}

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
}

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText }

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
}

const productLink = {
  fontSize: '12px',
  color: 'rgb(0,112,201)',
  textDecoration: 'none',
}

const divisor = {
  marginLeft: '4px',
  marginRight: '4px',
  color: 'rgb(51,51,51)',
  fontWeight: 200,
}

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
}

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
}

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
}

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
}

const productPriceLine = { margin: '30px 0 0 0' }

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
}

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' }

const productPriceLineBottom = { margin: '0 0 75px 0' }

const block = { display: 'block' }

const ctaTitle = {
  display: 'block',
  margin: '15px 0 0 0',
}

const ctaText = { fontSize: '24px', fontWeight: '500' }

const walletWrapper = { display: 'table-cell', margin: '10px 0 0 0' }

const walletLink = { color: 'rgb(0,126,255)', textDecoration: 'none' }

const walletImage = {
  display: 'inherit',
  paddingRight: '8px',
  verticalAlign: 'middle',
}

const walletBottomLine = { margin: '65px 0 20px 0' }

const footerText = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '0',
  lineHeight: 'auto',
  marginBottom: '16px',
}

const footerTextCenter = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '20px 0',
  lineHeight: 'auto',
  textAlign: 'center' as const,
}

const footerLink = { color: 'rgb(0,115,255)' }

const footerIcon = { display: 'block', margin: '40px 0 0 0' }

const footerLinksWrapper = {
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
}

const walletLinkText = {
  fontSize: '14px',
  fontWeight: '400',
  textDecoration: 'none',
}
