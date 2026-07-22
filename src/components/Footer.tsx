export function Footer() {
  return (
    <footer className="border-t border-[#a9882f2b] bg-[#070a12] py-10">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <img src="images/team-logo.png" alt="啊对对队队徽" className="mx-auto mb-4 h-12 w-12 rounded-full opacity-80" />
        <p className="font-serif-sc text-sm tracking-[0.35em] text-[#a9882f]">啊对对队 · 阿格莫尼亚编年史</p>
        <p className="mt-3 text-xs leading-relaxed text-[#77809a]">
          一场仍在进行中的 Agemonia 跑团战役记录 · 已历时八章 · 全员存活
        </p>
        <p className="mt-2 text-xs text-[#5a627a]">
          素材来自 agemonia.com，仅作个人跑团记录用途。
        </p>
      </div>
    </footer>
  )
}
