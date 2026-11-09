import { fotosDe, type FotoInfo, type Seccion } from '../content'
import { Foto } from './Foto'
import { TituloPractica } from './TituloPractica'

interface Props {
  practica: {
    id: string
    numeral: string
    titulo: string
    texto: string[]
    cronologia: { cuando: string; texto: string }[]
  }
}

// Cada grupo de fotos según su "uso" en fotos.json (§3: ancha, fila de 2, verticales, cuadradas).
const GRUPOS: { uso: string; clase: string; sizes: string }[] = [
  { uso: 'fila de 2', clase: 'fotos--fila2', sizes: '(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw' },
  {
    uso: 'vertical',
    clase: 'fotos--verticales',
    sizes: '(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw',
  },
  { uso: 'cuadrada', clase: 'fotos--cuadradas', sizes: '(min-width: 1280px) 400px, 33vw' },
]

/** S3–S5: una práctica (título con paralaje, texto, cronología, fotos). */
export function Practica({ practica }: Props) {
  const fotos = fotosDe(practica.id as Seccion)
  const ancha = fotos.find((f) => f.uso === 'ancha')
  const deUso = (uso: string): FotoInfo[] => fotos.filter((f) => f.uso === uso)
  const tituloId = `titulo-${practica.id}`

  return (
    <section id={practica.id} className="practica" aria-labelledby={tituloId}>
      <div className="contenedor">
        <TituloPractica id={tituloId} numeral={practica.numeral} titulo={practica.titulo} />
        <div className="practica__cuerpo">
          <div className="practica__texto">
            {practica.texto.map((p) => (
              <p key={p} className="aparece">
                {p}
              </p>
            ))}
          </div>
          <ol className="cronologia" aria-label={`Cronología: ${practica.titulo}`}>
            {practica.cronologia.map((h) => (
              <li key={h.cuando} className="aparece">
                <span className="etiqueta">{h.cuando}</span>
                <span>{h.texto}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Dentro del contenedor: mismo margen a los costados que Protagonistas y El Libro. */}
        {ancha && (
          <Foto
            foto={ancha}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="foto foto--ancha aparece"
          />
        )}

        {GRUPOS.map(({ uso, clase, sizes }) => {
          const grupo = deUso(uso)
          if (!grupo.length) return null
          return (
            <div key={uso} className={`fotos ${clase}`}>
              {grupo.map((f) => (
                <Foto key={f.archivo} foto={f} sizes={sizes} className="foto aparece" />
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
