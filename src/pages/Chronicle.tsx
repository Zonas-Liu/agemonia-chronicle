import { chapters } from '@/data/chapters'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

const PARTY_SCENES = [
  { img: 'images/scene-lunara.png', name: '露娜拉', caption: '琥珀之门的流亡圣骑士' },
  { img: 'images/scene-jonai.png', name: '乔奈', caption: '身世成谜的裂隙剑圣' },
  { img: 'images/scene-zuvasai.png', name: '祖法赛', caption: '算账成瘾的珂蓝安水法师' },
  { img: 'images/scene-torrax.png', name: '泰拉克斯', caption: '想不起名字的奥古拉守护者' },
]

export default function Chronicle() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6">
      <Reveal>
        <p className="text-center text-xs tracking-[0.5em] text-[#a9882f]">THE CHRONICLE</p>
        <h1 className="mt-3 text-center font-serif-sc text-4xl tracking-[0.3em] text-[#f0e6cd]">编年史</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-7 text-[#a9b4cc]">
          六章正篇与两段幕间，一条时间轴。点击任意节点，细读该章完整正文、定场诗与战报。
        </p>
      </Reveal>

      {/* 征途群像 · 官方场景插画 */}
      <Reveal delay={120}>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PARTY_SCENES.map((s) => (
            <figure key={s.name} className="night-card group overflow-hidden p-3">
              <div className="flex h-36 items-end justify-center overflow-hidden rounded bg-[radial-gradient(ellipse_at_bottom,#1a2138_0%,#0a0e1a_78%)] sm:h-44">
                <img
                  src={s.img}
                  alt={`${s.name}官方场景插画`}
                  loading="lazy"
                  className="max-h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 text-center">
                <p className="font-serif-sc text-base tracking-[0.25em] text-[#e8dcc0]">{s.name}</p>
                <p className="mt-1 text-[11px] tracking-wider text-[#8fa3cf]">{s.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <div className="relative mt-14">
        <div className="timeline-rail" aria-hidden />
        <ol className="space-y-10 md:space-y-14">
          {chapters.map((c, i) => {
            const left = i % 2 === 0
            return (
              <li key={c.id} className="relative">
                <span className="timeline-dot" aria-hidden />
                <Reveal
                  className={cn(
                    'pl-12 md:w-[calc(50%-2.5rem)] md:pl-0',
                    left ? 'md:mr-auto' : 'md:ml-auto',
                  )}
                  delay={80}
                >
                  <a href={`#/chapter/${c.id}`} className="timeline-node night-card block overflow-hidden p-6 sm:p-7">
                    <img
                      src={`images/banner-${c.id}.jpg`}
                      alt={`${c.shortTitle}场景缩略图`}
                      loading="lazy"
                      className="-mx-6 -mt-6 mb-5 h-36 w-[calc(100%+3rem)] max-w-none object-cover opacity-90 transition-opacity hover:opacity-100 sm:-mx-7 sm:-mt-7 sm:w-[calc(100%+3.5rem)]"
                    />
                    <div className="flex items-baseline justify-between gap-3">
                      <span className={cn(
                        'font-serif-sc text-sm tracking-[0.3em]',
                        c.id.startsWith('interlude') ? 'text-[#9ccbf5]' : 'text-[#a9882f]',
                      )}>
                        {c.order}
                      </span>
                      <span className="text-xs text-[#77809a]">{c.time}</span>
                    </div>
                    <h2 className="mt-2 font-serif-sc text-2xl tracking-[0.12em] text-[#f0e6cd]">
                      {c.shortTitle}
                    </h2>
                    <p className="mt-1.5 text-xs tracking-wider text-[#8fa3cf]">📍 {c.location}</p>
                    <p className="mt-3 text-sm leading-7 text-[#b8c0d8]">{c.hook}</p>
                    <p className="mt-4 font-serif-sc text-sm tracking-[0.25em] text-[#d9b64f]">
                      阅读全章 →
                    </p>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
