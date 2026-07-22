import { useEffect, useRef, useState } from 'react'
import { loreSections } from '@/data/lore'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

const SECTION_COLORS: Record<string, string> = {
  magic: '#6db3f2',
  races: '#4f9d69',
  places: '#a9882f',
  factions: '#c0392b',
  npcs: '#9ccbf5',
  bestiary: '#b05cc0',
}

export default function World() {
  const [active, setActive] = useState(loreSections[0].id)
  const refs = useRef<Record<string, HTMLElement | null>>({})

  // 滚动时高亮左侧目录
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id.replace('lore-', ''))
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const s of loreSections) {
      const el = refs.current[s.id]
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6">
      <Reveal>
        <p className="text-center text-xs tracking-[0.5em] text-[#a9882f]">THE WORLD</p>
        <h1 className="mt-3 text-center font-serif-sc text-4xl tracking-[0.3em] text-[#f0e6cd]">世界一隅</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-7 text-[#a9b4cc]">
          只收录与啊对对队已踏足的剧情相关的设定——四种魔法、出场种族、关键地点、势力与人物。
        </p>
      </Reveal>

      <div className="mt-12 flex gap-10">
        {/* 侧边目录 */}
        <aside className="sticky top-24 hidden h-fit w-40 shrink-0 md:block">
          <nav className="space-y-1.5">
            {loreSections.map((s) => (
              <a
                key={s.id}
                href={`#lore-${s.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  refs.current[s.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={cn(
                  'block rounded px-3 py-2 font-serif-sc text-sm tracking-[0.2em] transition-colors',
                  active === s.id
                    ? 'bg-[#a9882f1c] text-[#d9b64f] shadow-[inset_0_0_0_1px_#a9882f44]'
                    : 'text-[#8fa3cf] hover:text-[#e8dcc0]',
                )}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* 条目 */}
        <div className="min-w-0 flex-1 space-y-16">
          {loreSections.map((s) => {
            const color = SECTION_COLORS[s.id] ?? '#a9882f'
            return (
              <section
                key={s.id}
                id={`lore-${s.id}`}
                ref={(el) => {
                  refs.current[s.id] = el
                }}
                className="scroll-mt-24"
              >
                <Reveal>
                  <h2 className="font-serif-sc text-2xl tracking-[0.3em] text-[#f0e6cd]">
                    <span style={{ color }}>◆ </span>
                    {s.title}
                  </h2>
                  {s.intro && <p className="mt-3 text-sm leading-7 text-[#8fa3cf]">{s.intro}</p>}
                </Reveal>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {s.entries.map((e, i) => (
                    <Reveal key={e.name} delay={(i % 2) * 80}>
                      <article className="night-card h-full p-5" style={{ borderTopColor: `${color}55`, borderTopWidth: 2 }}>
                        {e.img && (
                          <div className="mb-4 flex h-44 items-end justify-center overflow-hidden rounded bg-[radial-gradient(ellipse_at_center,#1a2138_0%,#0a0e1a_75%)]">
                            <img
                              src={e.img}
                              alt={e.name}
                              loading="lazy"
                              className="max-h-full object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}
                        <h3 className="font-serif-sc text-lg tracking-[0.1em] text-[#e8dcc0]">
                          {e.name}
                          {e.en && <span className="ml-2 text-xs tracking-wider text-[#77809a]">{e.en}</span>}
                        </h3>
                        {e.tag && (
                          <span className="mt-2 inline-block rounded border border-[#a9882f55] bg-[#a9882f14] px-2 py-0.5 text-[11px] tracking-wider text-[#d9b64f]">
                            {e.tag}
                          </span>
                        )}
                        <p className="mt-2.5 text-sm leading-7 text-[#b8c0d8]">{e.desc}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
