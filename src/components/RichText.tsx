import { useMemo, type ReactNode } from 'react'

/** 把 **加粗** 标记渲染为金色高亮 */
export function RichText({ text }: { text: string }) {
  const parts = useMemo<ReactNode[]>(() => {
    const segs = text.split(/(\*\*[^*]+\*\*)/g)
    return segs.map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return (
          <strong key={i} className="hl-gold">
            {seg.slice(2, -2)}
          </strong>
        )
      }
      return <span key={i}>{seg}</span>
    })
  }, [text])
  return <>{parts}</>
}
