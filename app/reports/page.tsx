'use client';

import { useEffect, useState } from 'react';

interface Report {
  id: string;
  title: string;
  created_time: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch('/api/reports');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || '获取失败');

        setReports(data.reports || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-6 py-20 text-center text-zinc-400">正在加载学习报告...</div>;

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
        <span className="text-6xl">📈</span>
        <div>
          <h1 className="text-5xl font-bold tracking-tight">学习报告</h1>
          <p className="text-xl text-zinc-400">每日进度与数据可视化</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-20 text-center">
          <p className="text-3xl text-zinc-400">还没有生成报告</p>
          <p className="text-zinc-500 mt-6">完成学习后 Codex 会自动生成报告</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-zinc-900 border border-blue-800/50 hover:border-blue-500 rounded-3xl p-8 transition-all">
              <h3 className="text-2xl font-semibold mb-4">{report.title}</h3>
              <p className="text-zinc-500 text-sm">
                生成于：{new Date(report.created_time).toLocaleDateString('zh-CN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}