import { useEffect } from 'react'
import { contenido } from './content'
import { Autora } from './components/Autora'
import { Cierre } from './components/Cierre'
import { Cita } from './components/Cita'
import { ElLibro } from './components/ElLibro'
import { Hero } from './components/Hero'
import { Practica } from './components/Practica'
import { Protagonistas } from './components/Protagonistas'
import { observarAparicion } from './lib/aparecer'
import { origenDeLaVisita } from './lib/descarga'

const origen = origenDeLaVisita(window.location.search)

/** La página completa, en el orden de spec §3. */
export function App() {
  useEffect(() => observarAparicion(), []) // R10

  return (
    <>
      <Hero />
      <main>
        <Cita />
        {contenido.practicas.map((p) => (
          <Practica key={p.id} practica={p} />
        ))}
        <Protagonistas />
        <Autora />
        <ElLibro />
        <Cierre origen={origen} />
      </main>
    </>
  )
}
