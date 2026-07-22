# 啊对对队 · 阿格莫尼亚编年史

一场仍在进行中的 [Agemonia](https://agemonia.com) 跑团战役记录网站：
六章正篇 + 两段幕间的完整正文、竖向时间轴、英雄图鉴、世界观设定与生灵图鉴。

- 线上地址：<https://zonas-liu.github.io/agemonia-chronicle/>
- 技术栈：Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- 路由：自实现 hash 路由（`src/lib/router.ts`），`base: './'`，可整站离线打开

## 目录结构

```
website/
├── src/
│   ├── pages/            # 卷首 / 编年史 / 章节详情 / 英雄图鉴 / 世界一隅
│   ├── components/       # Navbar / Footer / Reveal 等
│   ├── data/
│   │   ├── chapters.ts           # 章节元数据（地点/引子/NPC/物品/伏笔，手工维护）
│   │   ├── chapters.generated.ts # 章节正文（脚本生成，勿手改）
│   │   ├── heroes.ts             # 四位英雄与团队物品
│   │   └── lore.ts               # 世界观词条 + 生灵图鉴
│   └── lib/
├── public/images/        # 美术素材（官方 + AI 生成队徽，全部本地化）
├── scripts/
│   ├── gen-chapters.py   # 从 ../docs/*.md 逐字转录生成章节正文
│   ├── deploy_pages.py   # 部署 dist/ 到 gh-pages 分支（走 GitHub API）
│   └── sync_source.py    # 同步源码到 main 分支（走 GitHub API）
└── docs/（仓库外，上级目录）# 跑团正文 Markdown，内容的唯一来源
```

## 本地预览

```bash
export PATH="/e/Agemonia/.bin:$PATH"   # Git Bash 下提供 npm 垫片
cd website
npm install
npm run dev
```

## 内容更新流程

1. 正文写在 `../docs/*.md`（如 `第六章：极乐洞穴.md`）
2. 重新生成章节数据：`python scripts/gen-chapters.py`
3. 手工维护 `src/data/chapters.ts` 中的元数据（引子、NPC、物品变化等）
4. `npm run build` 验证

## 部署与同步

本机网络直连 github.com 的 git push 会被拦截，因此两个脚本都走 api.github.com：

```bash
# 部署线上站点（dist/ → gh-pages 分支）
GH_TOKEN=<token> python scripts/deploy_pages.py

# 同步源码（整个工作树 → main 分支，单提交）
GH_TOKEN=<token> python scripts/sync_source.py
```

`main` 分支保存源码，`gh-pages` 分支保存构建产物，GitHub Pages 从后者发布。

## 素材说明

- 英雄立绘、场景插画、世界地图、怪物图鉴均来自 [agemonia.com](https://agemonia.com) 官方素材，仅作个人跑团记录用途
- 队徽 `public/images/team-logo.png` 为 AI 生成后手工抠图处理
