'use client';

import React, { useCallback, useState } from 'react';
import { 
  ReactFlow, 
  Node, 
  Edge, 
  addEdge, 
  Connection, 
  useNodesState, 
  useEdgesState, 
  Controls, 
  Background 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: 'root',
    position: { x: 500, y: 100 },
    data: { 
      label: '我的知识生命树', 
      description: '从这里开始，每天都在生长 🌱' 
    },
    style: { 
      background: '#1f2937', 
      border: '3px solid #60a5fa', 
      color: '#fff',
      borderRadius: '16px',
      padding: '16px',
      fontSize: '18px',
      fontWeight: 'bold'
    },
  },
];

const initialEdges: Edge[] = [];

export default function KnowledgeTreePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showModal, setShowModal] = useState(false);
  const [newNode, setNewNode] = useState({ 
    label: '', 
    description: '', 
    parentId: '' 
  });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const addNewNode = () => {
    if (!newNode.label.trim() || !newNode.description.trim()) {
      alert("请填写标题和详细解释！");
      return;
    }

    const newId = Date.now().toString();
    const parentNode = nodes.find((n) => n.id === newNode.parentId);

    const newNodeObj: Node = {
      id: newId,
      position: parentNode 
        ? { x: parentNode.position.x + 180, y: parentNode.position.y + 120 }
        : { x: Math.random() * 600 + 200, y: Math.random() * 400 + 150 },
      data: { 
        label: newNode.label, 
        description: newNode.description 
      },
      style: { 
        background: '#27272a', 
        border: '2px solid #60a5fa', 
        color: '#e5e7eb',
        borderRadius: '12px',
        padding: '12px',
        width: 200
      },
    };

    // 关键修复：使用函数式更新确保状态正确更新
    setNodes((nds) => [...nds, newNodeObj]);

    if (newNode.parentId) {
      setEdges((eds) => addEdge({
        id: `e${newNode.parentId}-${newId}`,
        source: newNode.parentId,
        target: newId,
        animated: true,
        style: { stroke: '#60a5fa', strokeWidth: 2 },
      }, eds));
    }

    // 清空表单并关闭弹窗
    setNewNode({ label: '', description: '', parentId: '' });
    setShowModal(false);

    // 成功提示
    alert(`已成功添加知识点：${newNode.label}`);
  };

  return (
    <div className="h-screen w-full bg-zinc-950">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-5xl">🌳</span>
          <div>
            <h1 className="text-4xl font-bold">知识生命树</h1>
            <p className="text-zinc-400 mt-1">我的交互式知识森林 · 每天都在生长</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-2xl text-white font-medium text-lg transition-all"
        >
          <Plus size={24} />
          添加新知识点
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#3f3f46" />
        <Controls />
      </ReactFlow>

      {/* 添加节点弹窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">添加新知识点到生命树</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">知识点标题</label>
                <input
                  type="text"
                  value={newNode.label}
                  onChange={(e) => setNewNode({ ...newNode, label: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-lg"
                  placeholder="例如：机会成本"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">详细解释与补充</label>
                <textarea
                  value={newNode.description}
                  onChange={(e) => setNewNode({ ...newNode, description: e.target.value })}
                  rows={6}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4"
                  placeholder="在这里写详细解释、查漏补缺的内容、关联知识等..."
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">所属父概念（可选）</label>
                <select
                  value={newNode.parentId}
                  onChange={(e) => setNewNode({ ...newNode, parentId: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4"
                >
                  <option value="">作为独立根节点</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.data?.label as string}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 rounded-2xl border border-zinc-700 hover:bg-zinc-800"
              >
                取消
              </button>
              <button
                onClick={addNewNode}
                disabled={!newNode.label.trim() || !newNode.description.trim()}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 rounded-2xl transition-colors"
              >
                添加到知识树
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}