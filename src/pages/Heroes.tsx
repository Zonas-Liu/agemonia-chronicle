import { heroes, teamItems } from '@/data/heroes'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

const ACCENT: Record<string, { ring: string; text: string; label: string }> = {
  aiun: { ring: '#6db3f2', text: 'text-[#9ccbf5]', label: '艾伊恩' },
  aox: { ring: '#c0392b', text: 'text-[#e07856]', label: '暗克苏猎手' },
  aog: { ring: '#a9882f', text: 'text-[#d9b64f]', label: '奥古法' },
  ferox: { ring: '#4f9d69', text: 'text-[#7fc794]', label: '菲洛森' },
}

export default function Heroes() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6">
      <Reveal>
        <p className="text-center text-xs tracking-[0.5em] text-[#a9882f]">THE PARTY</p>
        <h1 className="mt-3 text-center font-serif-sc text-4xl tracking-[0.3em] text-[#f0e6cd]">英雄图鉴</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-7 text-[#a9b4cc]">
          一位流亡的圣骑士、一位身世成谜的剑圣、一位算账成瘾的心灵术士、一块想不起名字的石头。
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {heroes.map((h, i) => {
          const ac = ACCENT[h.accent]
          return (
            <Reveal key={h.id} delay={(i % 2) * 120}>
              <article className="hero-card night-card overflow-hidden">
                {/* 立绘区 */}
                <div className="relative flex items-end justify-center overflow-hidden bg-gradient-to-b from-[#131a2e] to-[#0a0e1a] pt-8">
                  <div
                    className="absolute inset-x-8 bottom-0 h-24 rounded-[50%] blur-2xl"
                    style={{ background: `${ac.ring}22` }}
                    aria-hidden
                  />
                  <img
                    src={h.portrait}
                    alt={`${h.name}官方立绘`}
                    className="hero-portrait relative z-10 h-64 w-64 object-contain sm:h-72 sm:w-72"
                    loading="lazy"
                  />
                  <span
                    className="absolute right-4 top-4 rounded-full border px-3 py-1 text-xs tracking-[0.2em]"
                    style={{ borderColor: `${ac.ring}66`, color: ac.ring }}
                  >
                    {ac.label}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-serif-sc text-2xl tracking-[0.1em] text-[#f0e6cd]">{h.name}</h2>
                    <span className="text-xs tracking-wider text-[#77809a]">玩家 · {h.player}</span>
                  </div>
                  <p className={cn('mt-1.5 text-xs tracking-[0.2em]', ac.text)}>
                    {h.race} · {h.cls}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.15em] text-[#8fa3cf]">专精 · {h.specialty}</p>
                  <p className="mt-2 font-serif-sc text-sm text-[#d9b64f]">「{h.tagline}」</p>
                  <p className="mt-4 text-sm leading-7 text-[#b8c0d8]">{h.story}</p>

                  {/* 技能 */}
                  <p className="mt-6 font-serif-sc text-sm tracking-[0.3em] text-[#a9882f]">当前技能</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {h.skills.map((s) => (
                      <li
                        key={s.name}
                        className="rounded border border-[#a9882f3d] bg-[#a9882f10] px-3 py-1.5 text-xs text-[#e8dcc0]"
                        title={s.chapter}
                      >
                        {s.name}
                        <span className="ml-1.5 text-[10px] text-[#8fa3cf]">{s.chapter}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 装备 */}
                  <p className="mt-6 font-serif-sc text-sm tracking-[0.3em] text-[#a9882f]">装备与随身物品</p>
                  <ul className="mt-3 space-y-2">
                    {h.gear.map((g) => (
                      <li key={g.name} className="text-sm leading-6">
                        <span className="text-[#e8dcc0]">{g.name}</span>
                        <span className="ml-2 text-xs text-[#8fa3cf]">{g.note}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 幻象物品 */}
                  {h.visionItem && (
                    <div className="mt-5 rounded border border-[#6db3f22e] bg-[#6db3f20d] p-4">
                      <p className="font-serif-sc text-sm tracking-[0.25em] text-[#9ccbf5]">
                        幻象赠礼 · {h.visionItem.name}
                      </p>
                      <p className="mt-1.5 text-xs leading-6 text-[#8fa3cf]">{h.visionItem.note}</p>
                    </div>
                  )}

                  <p className="mt-5 border-t border-[#ffffff0d] pt-4 font-serif-sc text-sm leading-7 text-[#c8b78a]">
                    {h.fateLine}
                  </p>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* 团队公共物品 */}
      <Reveal className="mt-16">
        <h2 className="text-center font-serif-sc text-2xl tracking-[0.35em] text-[#e8dcc0]">团队公共物品</h2>
        <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#a9882f] to-transparent" />
        <div className="night-card mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#a9882f2e] text-xs tracking-[0.2em] text-[#a9882f]">
                <th className="px-4 py-3 font-normal">物品</th>
                <th className="px-4 py-3 font-normal">来源</th>
                <th className="px-4 py-3 font-normal">状态</th>
              </tr>
            </thead>
            <tbody>
              {teamItems.map((t) => (
                <tr key={t.name} className="border-b border-[#ffffff09] last:border-0">
                  <td className="px-4 py-3 font-serif-sc text-[#e8dcc0]">{t.name}</td>
                  <td className="px-4 py-3 text-[#b8c0d8]">{t.source}</td>
                  <td className="px-4 py-3 text-[#8fa3cf]">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  )
}
