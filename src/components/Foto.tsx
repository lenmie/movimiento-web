import { posicionDe, type FotoInfo } from '../content'

interface Props {
  foto: FotoInfo
  /** Atributo `sizes` según el ancho que ocupa en pantalla. */
  sizes: string
  className?: string
  /** Solo la portada se carga sin esperar (§6.2). */
  prioritaria?: boolean
}

/** Foto con variantes AVIF/WebP, medidas declaradas y carga diferida (§6.2). */
export function Foto({ foto, sizes, className, prioritaria = false }: Props) {
  const { base, ancho, alto, anchos } = foto
  const srcset = (formato: string) => anchos.map((a) => `${base}-${a}.${formato} ${a}w`).join(', ')
  const mayor = anchos[anchos.length - 1]

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`${base}-${mayor}.webp`}
        alt={foto.alt}
        width={ancho}
        height={alto}
        loading={prioritaria ? 'eager' : 'lazy'}
        fetchPriority={prioritaria ? 'high' : undefined}
        decoding="async"
        style={{ objectPosition: posicionDe(foto.nota) }}
      />
    </picture>
  )
}
