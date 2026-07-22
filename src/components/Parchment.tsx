import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** 羊皮纸 / 卷轴质感卡片（定场诗、战报专用） */
export function Parchment({
  children,
  className,
  title,
}: {
  children: ReactNode
  className?: string
  title?: string
}) {
  return (
    <div className={cn('parchment', className)}>
      {title && <div className="parchment-title">{title}</div>}
      {children}
    </div>
  )
}
