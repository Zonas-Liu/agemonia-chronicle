import { getChapter, chapterNav } from '@/data/chapters'
import { Reveal } from '@/components/Reveal'
import { RichText } from '@/components/RichText'
import { Parchment } from '@/components/Parchment'
import { cn } from '@/lib/utils'

function OrnamentDivider() {
  return (
    <div className="ornament-divider" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
      </svg>
    </div>
  )
}

export default function ChapterDetail({ id }: { id: string }) {
  const chapter = getChapter(id)

  if (!chapter) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 text-center">
        <p className="font-serif-sc text-2xl text-[#e8dcc0]">这一页尚未写入编年史。</p>
        <a href="#/chronicle" className="mt-6 inline-block font-serif-sc tracking-[0.25em] text-[#d9b64f]">
          ← 返回编年史
        </a>
      </div>
    )
  }

  const { prev, next } = chapterNav(id)
  let firstParaDone = false

  return (
    <div className="relative pb-24 pt-20">
      {/* 氛围背景：本章场景晕染，填充两侧留白 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={`images/banner-${chapter.id}.jpg`}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-[0.12] blur-2xl"
        />
        <div className="absolute inset-0 bg-[#0a0e1acc]" />
      </div>

      {/* 左侧栏：竖排章名（宽屏显示） */}
      <aside
        aria-hidden
        className="pointer-events-none fixed left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex 2xl:left-10"
      >
        <span className="font-serif-sc text-xs tracking-[0.35em] text-[#a9882f80] [writing-mode:vertical-rl]">
          {chapter.order}
        </span>
        <span className="h-20 w-px bg-gradient-to-b from-transparent via-[#a9882f55] to-transparent" />
        <span className="font-serif-sc text-xl tracking-[0.45em] text-[#e8dcc099] [writing-mode:vertical-rl]">
          {chapter.shortTitle}
        </span>
        <span className="h-20 w-px bg-gradient-to-b from-transparent via-[#a9882f55] to-transparent" />
        <span className="text-[10px] tracking-[0.3em] text-[#77809a80] [writing-mode:vertical-rl]">
          AGEMONIA
        </span>
      </aside>

      {/* 右侧栏：本章指引卡（宽屏显示） */}
      <aside className="fixed right-5 top-28 z-20 hidden w-44 xl:block 2xl:right-10">
        <div className="night-card overflow-hidden">
          <img src={`images/banner-${chapter.id}.jpg`} alt="" className="h-24 w-full object-cover" />
          <div className="space-y-1.5 p-3.5 text-[11px] leading-5 text-[#8fa3cf]">
            <p className="font-serif-sc text-xs tracking-[0.25em] text-[#d9b64f]">本 章 指 引</p>
            <p>📍 {chapter.location}</p>
            <p>🕰 {chapter.time}</p>
          </div>
        </div>
        <nav className="mt-3 space-y-2 text-[11px] tracking-wider">
          {prev && (
            <a
              href={`#/chapter/${prev.id}`}
              className="night-card block p-2.5 text-[#8fa3cf] transition-colors hover:text-[#d9b64f]"
            >
              ← {prev.order}
            </a>
          )}
          {next && (
            <a
              href={`#/chapter/${next.id}`}
              className="night-card block p-2.5 text-right text-[#8fa3cf] transition-colors hover:text-[#d9b64f]"
            >
              {next.order} →
            </a>
          )}
        </nav>
      </aside>

      <div className="relative z-10">
      {/* 章首 */}
      <section className="relative overflow-hidden py-14">
        <img src="images/bg_dark.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a55] to-[#0a0e1a]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <a href="#/chronicle" className="text-xs tracking-[0.3em] text-[#77809a] transition-colors hover:text-[#d9b64f]">
              ← 返回编年史
            </a>
            <p className={cn(
              'mt-6 font-serif-sc text-sm tracking-[0.5em]',
              chapter.id.startsWith('interlude') ? 'text-[#9ccbf5]' : 'text-[#a9882f]',
            )}>
              {chapter.order}
            </p>
            <h1 className="mt-3 font-serif-sc text-4xl tracking-[0.15em] text-[#f0e6cd] sm:text-5xl">
              {chapter.shortTitle}
            </h1>
            <p className="mt-4 text-xs tracking-wider text-[#8fa3cf]">
              📍 {chapter.location}　·　🕰 {chapter.time}
            </p>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#a9b4cc]">{chapter.hook}</p>
          </Reveal>
        </div>
      </section>

      {/* 章节场景横幅 */}
      <Reveal>
        <div className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
          <img
            src={`images/banner-${chapter.id}.jpg`}
            alt={`${chapter.shortTitle} · 场景插画`}
            loading="lazy"
            className="w-full rounded-lg border border-[#a9882f33] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
          <p className="mt-3 text-center text-[11px] tracking-[0.2em] text-[#5a627a]">
            ◈ 场景插画 · AI 依据本章剧情绘制 ◈
          </p>
        </div>
      </Reveal>

      {/* 正文 */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        {chapter.blocks.map((b, i) => {
          if (b.kind === 'hr') return <OrnamentDivider key={i} />
          if (b.kind === 'h2') return <h2 key={i} className="chapter-h2">{b.text}</h2>
          const dropcap = !firstParaDone
          firstParaDone = true
          return (
            <p
              key={i}
              className={cn(
                'mb-5 text-[0.95rem] leading-[1.95] text-[#c6cddd]',
                dropcap && 'dropcap',
              )}
            >
              <RichText text={b.text} />
            </p>
          )
        })}

        <p className="mt-10 text-center font-serif-sc text-lg tracking-[0.4em] text-[#a9882f]">
          {chapter.endMark}
        </p>

        {/* 定场诗 */}
        <Reveal className="mt-12">
          <Parchment title="定 场 诗">
            <div className="flex flex-col items-center gap-1.5 py-2 font-serif-sc text-lg leading-9 tracking-[0.2em] text-[#4a3a1e]">
              {chapter.poem.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </Parchment>
        </Reveal>

        {/* 战报 */}
        <Reveal className="mt-8">
          <Parchment title="战 报" className="italic">
            <p className="text-center text-sm leading-8 text-[#4a3a1e]">{chapter.battleReport}</p>
          </Parchment>
        </Reveal>

        {/* 出场 NPC */}
        <Reveal className="mt-14">
          <h2 className="chapter-h2">出场人物</h2>
          <div className="night-card overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#a9882f2e] text-xs tracking-[0.2em] text-[#a9882f]">
                  <th className="px-4 py-3 font-normal">NPC</th>
                  <th className="px-4 py-3 font-normal">身份</th>
                  <th className="px-4 py-3 font-normal">状态</th>
                  <th className="px-4 py-3 font-normal">与团队关系</th>
                </tr>
              </thead>
              <tbody>
                {chapter.npcs.map((n) => (
                  <tr key={n.name} className="border-b border-[#ffffff09] last:border-0">
                    <td className="px-4 py-3 font-serif-sc text-[#e8dcc0]">{n.name}</td>
                    <td className="px-4 py-3 text-[#b8c0d8]">{n.role}</td>
                    <td className="px-4 py-3 text-[#8fa3cf]">{n.status}</td>
                    <td className="px-4 py-3 text-[#8fa3cf]">{n.relation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* 关键剧情节点 */}
        <Reveal className="mt-12">
          <h2 className="chapter-h2">关键剧情节点</h2>
          <ol className="space-y-3">
            {chapter.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-3.5 text-sm leading-7 text-[#b8c0d8]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#a9882f66] font-serif-sc text-xs text-[#d9b64f]">
                  {i + 1}
                </span>
                <span>{k}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* 物品变动 */}
        <Reveal className="mt-12">
          <h2 className="chapter-h2">物品获得与消耗</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="night-card p-5">
              <p className="font-serif-sc tracking-[0.3em] text-[#9ccbf5]">获 得</p>
              {chapter.itemsGained.length ? (
                <ul className="mt-3 space-y-2.5">
                  {chapter.itemsGained.map((it) => (
                    <li key={it.name} className="text-sm leading-6">
                      <span className="hl-gold">{it.name}</span>
                      <span className="ml-2 text-xs text-[#8fa3cf]">{it.note}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-[#77809a]">无</p>
              )}
            </div>
            <div className="night-card p-5">
              <p className="font-serif-sc tracking-[0.3em] text-[#e07856]">消 耗</p>
              {chapter.itemsConsumed.length ? (
                <ul className="mt-3 space-y-2.5">
                  {chapter.itemsConsumed.map((it) => (
                    <li key={it.name} className="text-sm leading-6">
                      <span className="text-[#e0a191]">{it.name}</span>
                      <span className="ml-2 text-xs text-[#8fa3cf]">{it.note}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-[#77809a]">无</p>
              )}
            </div>
          </div>
        </Reveal>

        {/* 伏笔 */}
        <Reveal className="mt-12">
          <h2 className="chapter-h2">悬而未决</h2>
          <div className="night-card border-[#c0392b33] p-5">
            <ul className="space-y-2.5">
              {chapter.foreshadow.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-7 text-[#b8c0d8]">
                  <span className="text-[#c0392b]">◆</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-[#ffffff0d] pt-3 font-serif-sc text-sm tracking-wider text-[#d9b64f]">
              {chapter.nextHook}
            </p>
          </div>
        </Reveal>

        {/* 上一章 / 下一章 */}
        <nav className="mt-16 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <a href={`#/chapter/${prev.id}`} className="night-card timeline-node p-5">
              <p className="text-xs tracking-[0.3em] text-[#77809a]">← 上一章</p>
              <p className="mt-2 font-serif-sc text-lg text-[#e8dcc0]">
                {prev.order} · {prev.shortTitle}
              </p>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={`#/chapter/${next.id}`} className="night-card timeline-node p-5 text-right">
              <p className="text-xs tracking-[0.3em] text-[#77809a]">下一章 →</p>
              <p className="mt-2 font-serif-sc text-lg text-[#e8dcc0]">
                {next.order} · {next.shortTitle}
              </p>
            </a>
          ) : (
            <div className="night-card p-5 text-right">
              <p className="text-xs tracking-[0.3em] text-[#77809a]">下一章 →</p>
              <p className="mt-2 font-serif-sc text-lg text-[#8fa3cf]">未完待续……</p>
            </div>
          )}
        </nav>
      </article>
      </div>
    </div>
  )
}
