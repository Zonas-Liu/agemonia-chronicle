import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Reveal } from '@/components/Reveal'

interface StarSpec {
  left: string
  top: string
  size: number
  dur: string
  delay: string
}

function Starfield({ count = 90 }: { count?: number }) {
  const stars = useMemo<StarSpec[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37.13) % 100}%`,
        top: `${(i * 53.77) % 100}%`,
        size: 1 + ((i * 7) % 3) * 0.7,
        dur: `${2.6 + ((i * 11) % 40) / 10}s`,
        delay: `${((i * 17) % 40) / 10}s`,
      })),
    [count],
  )
  return (
    <div className="starfield" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={
            {
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              '--tw-dur': s.dur,
              '--tw-delay': s.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

const STATS = [
  { label: '已历章节', value: '8 章', note: '六章正篇 · 两段幕间' },
  { label: '团队状态', value: '全员存活', note: '死亡物品清单：仅蘑菇若干' },
  { label: '信标进度', value: '1 / 3', note: '艾伊恩宝珠已归位裂天者' },
  { label: '当前使命', value: '寻找双珠', note: '奥古法宝珠 · 菲洛森宝珠' },
]

export default function Home() {
  const [mapOpen, setMapOpen] = useState(false)

  useEffect(() => {
    if (!mapOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMapOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mapOpen])

  return (
    <div>
      {/* 全屏横幅 */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <img
          src="images/hero-main.jpg"
          alt="四位英雄眺望裂天者的主视觉"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a66] via-[#0a0e1a2e] to-[#0a0e1a]" />
        <Starfield />
        <div className="relative z-10 px-4 pb-16 pt-24 text-center">
          <Reveal>
            <img src="images/team-logo.png" alt="啊对对队队徽" className="mx-auto mb-6 h-28 w-28 rounded-full ring-2 ring-[#a9882f88] shadow-[0_0_44px_rgba(169,136,47,0.5)]" />
            <p className="mb-4 text-xs tracking-[0.6em] text-[#8fa3cf]">AGEMONIA CHRONICLE</p>
            <h1 className="font-serif-sc text-6xl tracking-[0.18em] text-[#f0e6cd] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-7xl">
              啊对对队
            </h1>
            <p className="mt-5 font-serif-sc text-xl tracking-[0.5em] text-[#d9b64f] sm:text-2xl">
              阿格莫尼亚编年史
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#a9b4cc]">
              琥珀之门开启的那一夜，四个各怀秘密的异乡人登上一辆飞行马车。
              此后洪水、虫潮、恶魔与石首轮番而至——而他们，全员存活。
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#/chronicle"
                className="rounded border border-[#a9882f] bg-[#a9882f1e] px-8 py-3 font-serif-sc text-lg tracking-[0.3em] text-[#e8cf8a] transition-all hover:bg-[#a9882f38] hover:shadow-[0_0_28px_rgba(169,136,47,0.45)]"
              >
                翻开编年史
              </a>
              <a
                href="#/heroes"
                className="rounded border border-[#6db3f255] px-8 py-3 font-serif-sc text-lg tracking-[0.3em] text-[#9ccbf5] transition-all hover:bg-[#6db3f21a]"
              >
                见四位英雄
              </a>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-[#a9882f]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* 战役概览 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-center font-serif-sc text-3xl tracking-[0.35em] text-[#e8dcc0]">战役概览</h2>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-[#a9882f] to-transparent" />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="night-card p-6 text-center">
                <p className="text-xs tracking-[0.3em] text-[#77809a]">{s.label}</p>
                <p className="mt-3 font-serif-sc text-3xl text-[#d9b64f]">{s.value}</p>
                <p className="mt-2 text-xs text-[#8fa3cf]">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <div className="night-card mt-8 border-[#6db3f233] p-6 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="font-serif-sc text-lg tracking-[0.2em] text-[#9ccbf5]">石首的谕示</p>
                <p className="mt-3 text-sm leading-7 text-[#b8c0d8]">
                  「汝等必须点亮信标，以庇护众生免受暗克苏的腐化。」艾伊恩宝珠已归位裂天者中央容器；
                  魔法之球<strong className="hl-gold">奥古法宝珠</strong>的秘密掌握在宝石切割师手中，
                  自然之球<strong className="hl-gold">菲洛森宝珠</strong>的奥秘为最睿智的术士所通晓。
                  而黑暗之球暗克苏宝珠——切不可寻觅。
                </p>
              </div>
              <a href="#/chapter/ch5" className="shrink-0 rounded border border-[#a9882f66] px-5 py-2.5 font-serif-sc text-sm tracking-[0.25em] text-[#d9b64f] transition-colors hover:bg-[#a9882f1e]">
                回顾第五章 →
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 世界地图 */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal>
          <h2 className="text-center font-serif-sc text-3xl tracking-[0.35em] text-[#e8dcc0]">阿格莫尼亚世界地图</h2>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-[#a9882f] to-transparent" />
          <p className="mt-4 text-center text-xs text-[#77809a]">官方地图 · 点击可放大查看</p>
        </Reveal>
        <Reveal delay={120}>
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            className="night-card group mx-auto mt-8 block w-full max-w-3xl overflow-hidden p-2 transition-transform hover:scale-[1.01]"
            aria-label="放大查看世界地图"
          >
            <img
              src="images/Agemonia-world-map-1280x1280.png"
              alt="阿格莫尼亚官方世界地图"
              className="w-full rounded transition-opacity group-hover:opacity-90"
              loading="lazy"
            />
          </button>
        </Reveal>
        <Reveal delay={180}>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 text-center text-xs text-[#8fa3cf] sm:grid-cols-4">
            {['琥珀门 · 洪峰之夜', '灵树林 · 刀锋荆棘', '符文谷 · 帮派暗涌', '裂天者 · 信标之塔'].map((t) => (
              <div key={t} className="rounded border border-[#a9882f2b] bg-[#0d1221aa] px-3 py-2.5 tracking-wider">
                {t}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 编年史入口卡片 */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal>
          <a href="#/chronicle" className="night-card group relative block overflow-hidden p-8 sm:p-12">
            <img src="images/bg_dark.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 transition-opacity group-hover:opacity-35" />
            <div className="relative">
              <p className="text-xs tracking-[0.4em] text-[#a9882f]">THE CHRONICLE</p>
              <h3 className="mt-3 font-serif-sc text-3xl tracking-[0.25em] text-[#f0e6cd] sm:text-4xl">编年史 · 八章</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#a9b4cc]">
                从琥珀之门的咆哮，到裂天者塔顶的谕示。竖向时间轴串起每一章的地点、引子与完整正文，
                附定场诗、战报与出场人物表。
              </p>
              <span className="mt-6 inline-block font-serif-sc text-lg tracking-[0.3em] text-[#d9b64f] transition-transform group-hover:translate-x-2">
                进入时间轴 →
              </span>
            </div>
          </a>
        </Reveal>
      </section>

      {/* 地图灯箱 */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#05070dd9] p-4 backdrop-blur-sm"
          onClick={() => setMapOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src="images/Agemonia-world-map-1280x1280.png"
            alt="阿格莫尼亚官方世界地图（放大）"
            className="max-h-[92vh] max-w-[94vw] rounded border border-[#a9882f66] object-contain shadow-2xl"
          />
          <button
            type="button"
            className="absolute right-5 top-5 rounded border border-[#a9882f88] bg-[#0a0e1acc] px-4 py-2 font-serif-sc tracking-widest text-[#e8cf8a]"
            onClick={() => setMapOpen(false)}
          >
            关闭 ✕
          </button>
        </div>
      )}
    </div>
  )
}
