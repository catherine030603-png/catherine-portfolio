'use client';

import { useEffect, useState } from 'react';

interface Note {
  id: string;
  title: string;
  created_time: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || '获取失败');

        setNotes(data.notes || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-xl text-zinc-400">正在从 Notion 同步你的学习笔记...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-red-950 border border-red-800 rounded-3xl p-12 text-center">
          <p className="text-xl text-red-400 mb-4">加载失败</p>
          <p className="text-zinc-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <span className="text-6xl">📚</span>
        <div>
          <h1 className="text-5xl font-bold tracking-tight">Daily Notes</h1>
          <p className="text-xl text-zinc-400 mt-2">从 Notion 实时同步的每日学习记录</p>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-20 text-center">
          <p className="text-4xl mb-6">📖</p>
          <p className="text-3xl text-zinc-400">还没有任何笔记</p>
          <p className="text-zinc-500 mt-6">去 Notion 的 Daily Notes 数据库添加记录后刷新页面</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className="group bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-3xl p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <h3 className="text-3xl font-semibold text-white mb-6 leading-tight">
                {note.title}
              </h3>
              <div className="flex items-center gap-3 text-zinc-500">
                <span>📅</span>
                <span className="text-sm">
                  创建于：{new Date(note.created_time).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}