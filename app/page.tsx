export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-7xl">🚀</span>
            <h1 className="text-6xl font-bold tracking-tighter">AI 学习系统</h1>
          </div>
          <p className="text-2xl text-zinc-400">Lila 的个人知识飞轮</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* 笔记库 */}
          <a href="/notes" className="group">
            <div className="bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-semibold mb-3">笔记库</h3>
              <p className="text-zinc-400 mb-8">所有学习笔记在这里沉淀</p>
              <div className="text-blue-400 group-hover:text-blue-300 font-medium">进入笔记库 →</div>
            </div>
          </a>

          {/* 概念库 */}
          <a href="/concepts" className="group">
            <div className="bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl mb-6">🧠</div>
              <h3 className="text-2xl font-semibold mb-3">概念库</h3>
              <p className="text-zinc-400 mb-8">核心概念与知识框架</p>
              <div className="text-blue-400 group-hover:text-blue-300 font-medium">进入概念库 →</div>
            </div>
          </a>

          {/* 错题本 */}
          <a href="/wrong" className="group">
            <div className="bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl mb-6">❌</div>
              <h3 className="text-2xl font-semibold mb-3">错题本</h3>
              <p className="text-zinc-400 mb-8">记录错题与解析</p>
              <div className="text-blue-400 group-hover:text-blue-300 font-medium">查看错题 →</div>
            </div>
          </a>

          {/* 学习报告 */}
          <a href="/reports" className="group">
            <div className="bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl mb-6">📈</div>
              <h3 className="text-2xl font-semibold mb-3">学习报告</h3>
              <p className="text-zinc-400 mb-8">每日进度与数据可视化</p>
              <div className="text-blue-400 group-hover:text-blue-300 font-medium">查看报告 →</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}