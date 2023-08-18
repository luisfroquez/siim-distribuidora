export default function filtrarCaracteres(str: string): string {
  // Utilizar una expresión regular para eliminar los caracteres no deseados
  const caracteresPermitidos = /[A-Za-z0-9]/g
  const caracteresFiltrados = str.match(caracteresPermitidos)

  if (caracteresFiltrados) {
    return caracteresFiltrados.join('')
  } else {
    return ''
  }
}
