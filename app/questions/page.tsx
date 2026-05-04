export default function QuestionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">❓ 智能题库</h1>
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-12 text-center">
        <p className="text-2xl text-zinc-400 mb-6">Codex 将在这里自动生成练习题</p>
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-medium transition">
          开始测试（后续接入）
        </button>
      </div>
    </div>
  );
}