'use client';

import { useEffect, useState } from 'react';

interface Concept {
  id: string;
  title: string;
  created_time: string;
}

export default function ConceptsPage() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConcepts() {
      try {
        const res = await fetch('/api/concepts');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || '获取失败');

        setConcepts(data.concepts || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchConcepts();
  }, []);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-center text-zinc-400">正在从 Notion 同步概念库...</div>;
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-red-950 border border-red-800 rounded-3xl p-12 text-center">
          <p className="text-red-400">加载失败</p>
          <p className="text-zinc-500 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <span className="text-6xl">🧠</span>
        <div>
          <h1 className="text-5xl font-bold tracking-tight">Concept Library</h1>
          <p className="text-xl text-zinc-400">核心概念知识库</p>
        </div>
      </div>

      {concepts.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-20 text-center">
          <p className="text-3xl text-zinc-400">概念库还是空的</p>
          <p className="text-zinc-500 mt-6">去 Notion 添加几个核心概念后刷新</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {concepts.map((concept) => (
            <div key={concept.id} className="bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-3xl p-8 transition-all">
              <h3 className="text-2xl font-semibold mb-4">{concept.title}</h3>
              <p className="text-zinc-500 text-sm">
                添加于：{new Date(concept.created_time).toLocaleDateString('zh-CN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}