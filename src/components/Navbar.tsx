import { cn } from '@/lib/utils'

const LINKS = [
  { to: '#/', label: '卷首', key: 'home' },
  { to: '#/chronicle', label: '编年史', key: 'chronicle' },
  { to: '#/heroes', label: '英雄图鉴', key: 'heroes' },
  { to: '#/world', label: '世界一隅', key: 'world' },
]

export function Navbar({ active }: { active: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#a9882f33] bg-[#0a0e1acc] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#/" className="flex items-center gap-2.5">
          <img src="images/Logo.png" alt="啊对对队徽标" className="h-7 w-7 rounded-sm ring-1 ring-[#a9882f66]" />
          <span className="font-serif-sc text-lg tracking-widest text-[#e8dcc0]">
            啊对对队
            <span className="ml-2 hidden text-xs tracking-[0.3em] text-[#a9882f] sm:inline">编年史</span>
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.to}
              className={cn(
                'rounded px-2.5 py-1.5 font-serif-sc text-sm tracking-wider transition-colors sm:px-3.5',
                active === l.key
                  ? 'bg-[#a9882f22] text-[#d9b64f] shadow-[inset_0_0_0_1px_#a9882f55]'
                  : 'text-[#b8c0d8] hover:text-[#e8dcc0]',
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
