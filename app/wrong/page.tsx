'use client';

import { useEffect, useState } from 'react';

interface WrongItem {
  id: string;
  title: string;
  created_time: string;
}

export default function WrongPage() {
  const [wrongs, setWrongs] = useState<WrongItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWrongs() {
      try {
        const res = await fetch('/api/wrong');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || '获取失败');

        setWrongs(data.wrongs || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWrongs();
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-6 py-20 text-center text-zinc-400">正在加载错题本...</div>;

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
        <span className="text-6xl">❌</span>
        <div>
          <h1 className="text-5xl font-bold tracking-tight">错题本</h1>
          <p className="text-xl text-zinc-400">记录错误与解析</p>
        </div>
      </div>

      {wrongs.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-20 text-center">
          <p className="text-3xl text-zinc-400">错题本还是空的</p>
          <p className="text-zinc-500 mt-6">做题时出现错误会自动记录在这里</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {wrongs.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-red-800/50 hover:border-red-500 rounded-3xl p-8 transition-all">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">{item.title}</h3>
              <p className="text-zinc-500 text-sm">
                记录于：{new Date(item.created_time).toLocaleDateString('zh-CN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}