interface Props {
  numeral: string
  titulo: string
  id: string
}

/**
 * Título de práctica que entra espejado y gira hasta leerse derecho con el scroll (R4).
 * Es solo CSS: el texto del HTML siempre es el real (R4.2).
 */
export function TituloEspejado({ numeral, titulo, id }: Props) {
  return (
    <h2 className="practica__titulo" id={id}>
      <span className="practica__numeral">{numeral}</span>{' '}
      <span className="espejado">{titulo}</span>
    </h2>
  )
}
