interface Props {
  numeral: string
  titulo: string
  id: string
}

/**
 * Título de práctica. El nombre sale de atrás de la sección anterior con el scroll (paralaje, R4)
 * y el numeral queda quieto; es solo CSS (`.practica__nombre` en app.css) y el texto del HTML
 * siempre es el real (R4.2).
 */
export function TituloPractica({ numeral, titulo, id }: Props) {
  return (
    <h2 className="practica__titulo" id={id}>
      <span className="practica__numeral">{numeral}</span>{' '}
      <span className="practica__nombre">{titulo}</span>
    </h2>
  )
}
