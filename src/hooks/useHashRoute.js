import { useEffect, useState } from 'react'

const readHash = () => window.location.hash.replace(/^#\/?/, '')

// Enrutado minimo basado en el hash (#/seccion/parametro) sin dependencias externas.
export function useHashRoute() {
  const [path, setPath] = useState(readHash)

  useEffect(() => {
    const handleChange = () => setPath(readHash())
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  return path.split('/').filter(Boolean).map(decodeURIComponent)
}
