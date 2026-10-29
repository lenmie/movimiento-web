import { describe, expect, it } from 'vitest'
import fotosJson from '../../assets/fotos.json'
import generado from '../../src/content/fotos.generado.json'
import { contenido, fotosDe, posicionDe } from '../../src/content'

describe('contenido', () => {
  it('nunca expone el apodo (D7)', () => {
    const conApodo = (fotosJson.protagonistas as { apodo?: string }[]).filter((f) => f.apodo)
    expect(conApodo.length).toBeGreaterThan(0)
    // Lo único que llega al navegador es el manifiesto generado y contenido.json.
    expect(JSON.stringify(generado)).not.toMatch(/apodo|Cacho|Chuzamun|Kawaii/)
    expect(JSON.stringify(contenido)).not.toMatch(/Cacho|Chuzamun|Kawaii/)
  })

  it('tiene las tres prácticas en orden (§3)', () => {
    expect(contenido.practicas.map((p) => p.titulo)).toEqual(['Contorsión', 'Acrobacia aérea', 'Danza'])
  })

  it('cada foto tiene texto alternativo (§7 Accesibilidad)', () => {
    for (const s of ['portada', 'contorsion', 'acrobacia', 'danza', 'protagonistas', 'autora', 'cierre'] as const)
      for (const f of fotosDe(s)) expect(f.alt.length).toBeGreaterThan(10)
  })

  it('lee object-position de la nota', () => {
    expect(posicionDe('object-position: 40% center')).toBe('40% center')
    expect(posicionDe(undefined)).toBeUndefined()
  })
})
