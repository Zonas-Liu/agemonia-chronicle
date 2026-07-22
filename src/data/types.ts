// 数据类型定义：章节 / 英雄 / 世界观

export type BlockKind = 'p' | 'hr' | 'h2'

export interface ChapterBlock {
  kind: BlockKind
  text: string
}

/** 由 scripts/gen-chapters.py 从 docs/ 逐字转录生成的正文部分 */
export interface ChapterBody {
  title: string
  endMark: string
  blocks: ChapterBlock[]
  poem: string[]
  battleReport: string
}

export interface NpcEntry {
  name: string
  role: string
  status: string
  relation: string
}

export interface ItemChange {
  name: string
  note: string
}

/** 手工整理的章节元数据（地点/时间/引子/NPC/节点/物品/伏笔） */
export interface ChapterMeta {
  id: string
  order: string // 第一章 / 幕间 …
  shortTitle: string // 不含序号的标题
  location: string
  time: string
  hook: string
  npcs: NpcEntry[]
  keyPoints: string[]
  itemsGained: ItemChange[]
  itemsConsumed: ItemChange[]
  foreshadow: string[]
  nextHook: string
}

export interface Chapter extends ChapterMeta, ChapterBody {}

export interface SkillEntry {
  name: string
  chapter: string // 领悟章节
}

export interface GearEntry {
  name: string
  note: string
}

export interface Hero {
  id: string
  name: string
  player: string
  race: string
  cls: string
  specialty: string
  portrait: string
  tagline: string
  story: string
  skills: SkillEntry[]
  gear: GearEntry[]
  visionItem: GearEntry | null
  fateLine: string
  accent: 'aiun' | 'aox' | 'aog' | 'ferox'
}

export interface TeamItem {
  name: string
  source: string
  status: string
}

export interface LoreEntry {
  name: string
  en?: string
  desc: string
  img?: string
  tag?: string
}

export interface LoreSection {
  id: string
  title: string
  intro?: string
  entries: LoreEntry[]
}
