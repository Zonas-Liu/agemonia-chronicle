import { useHashRoute } from '@/lib/router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Home from '@/pages/Home'
import Chronicle from '@/pages/Chronicle'
import ChapterDetail from '@/pages/ChapterDetail'
import Heroes from '@/pages/Heroes'
import World from '@/pages/World'

export default function App() {
  const route = useHashRoute()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar active={route.name === 'chapter' ? 'chronicle' : route.name} />
      <main className="flex-1">
        {route.name === 'home' && <Home />}
        {route.name === 'chronicle' && <Chronicle />}
        {route.name === 'chapter' && <ChapterDetail id={route.id} />}
        {route.name === 'heroes' && <Heroes />}
        {route.name === 'world' && <World />}
      </main>
      <Footer />
    </div>
  )
}
