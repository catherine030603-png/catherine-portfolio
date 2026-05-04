export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">关于我</h1>
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-12">
        <p className="text-xl text-zinc-400">这是 Lila 的个人 AI 学习系统网站。</p>
        <p className="mt-6 text-zinc-400">目标：用 Notion + Next.js + Codex 打造全自动学习飞轮。</p>
      </div>
    </div>
  );
}