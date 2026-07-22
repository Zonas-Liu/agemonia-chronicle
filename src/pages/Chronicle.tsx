import { chapters } from '@/data/chapters'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

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
                  <a href={`#/chapter/${c.id}`} className="timeline-node night-card block p-6 sm:p-7">
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
