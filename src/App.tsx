import { contenido } from './content'
import { Autora } from './components/Autora'
import { Cierre } from './components/Cierre'
import { Cita } from './components/Cita'
import { Hero } from './components/Hero'
import { Practica } from './components/Practica'
import { Protagonistas } from './components/Protagonistas'
import { origenDeLaVisita } from './lib/descarga'

const origen = origenDeLaVisita(window.location.search)

/** La página completa, en el orden de spec §3. */
export function App() {
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
        <Cierre origen={origen} />
      </main>
    </>
  )
}
