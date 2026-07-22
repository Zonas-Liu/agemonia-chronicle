import { useCallback, useEffect, useState } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'chronicle' }
  | { name: 'chapter'; id: string }
  | { name: 'heroes' }
  | { name: 'world' }

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#/, '') || '/'
  const parts = h.split('/').filter(Boolean)
  if (parts.length === 0) return { name: 'home' }
  if (parts[0] === 'chronicle') return { name: 'chronicle' }
  if (parts[0] === 'chapter' && parts[1]) return { name: 'chapter', id: decodeURIComponent(parts[1]) }
  if (parts[0] === 'heroes') return { name: 'heroes' }
  if (parts[0] === 'world') return { name: 'world' }
  return { name: 'home' }
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function useNavigate() {
  return useCallback((to: string) => {
    window.location.hash = to
  }, [])
}
