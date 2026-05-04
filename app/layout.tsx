import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 学习系统 - Lila',
  description: 'Lila 的个人 AI 驱动学习网站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-zinc-950 text-zinc-200">
        {/* 导航栏 */}
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <span className="text-3xl">🧠</span>
      <div className="font-bold text-xl">AI 学习系统</div>
    </div>

    <div className="flex items-center gap-9 text-sm font-medium">
      <a href="/" className="hover:text-white transition-colors">首页</a>
      <a href="/notes" className="hover:text-white transition-colors">笔记库</a>
      <a href="/concepts" className="hover:text-white transition-colors">概念库</a>
      <a href="/wrong" className="hover:text-white transition-colors">错题本</a>
      <a href="/reports" className="hover:text-white transition-colors">报告</a>
      <a href="/about" className="hover:text-white transition-colors">关于我</a>
    </div>

    <div className="text-xs text-zinc-500 hidden md:block">
      Powered by Next.js + Notion
    </div>
  </div>
</nav>

        <main>{children}</main>
      </body>
    </html>
  );
}