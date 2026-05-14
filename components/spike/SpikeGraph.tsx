'use client';
import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { demoNodes, demoEdges } from '@/data/spikeDemo';
import StudentNode     from './nodes/StudentNode';
import InterestNode    from './nodes/InterestNode';
import SubInterestNode from './nodes/SubInterestNode';
import ProblemNode     from './nodes/ProblemNode';
import NicheNode       from './nodes/NicheNode';
import SpikeNode       from './nodes/SpikeNode';

const nodeTypes = {
  student:     StudentNode,
  interest:    InterestNode,
  subinterest: SubInterestNode,
  problem:     ProblemNode,
  niche:       NicheNode,
  spike:       SpikeNode,
};

interface SpikeGraphProps {
  onNodeSelect: (id: string | null) => void;
  selectedNodeId: string | null;
}

export default function SpikeGraph({ onNodeSelect, selectedNodeId }: SpikeGraphProps) {
  const baseNodes = useMemo(() => demoNodes as unknown as Node[], []);
  const [nodes, , onNodesChange] = useNodesState(baseNodes);
  const [edges, , onEdgesChange] = useEdgesState(demoEdges);

  // Dim unselected nodes when something is selected
  const displayNodes = useMemo(() => {
    if (!selectedNodeId) return nodes;
    return nodes.map((n) => ({
      ...n,
      style: {
        ...n.style,
        opacity: n.id === selectedNodeId ? 1 : 0.18,
        transition: 'opacity 0.25s ease',
      },
    }));
  }, [nodes, selectedNodeId]);

  const displayEdges = useMemo(() => {
    if (!selectedNodeId) return edges;
    return edges.map((e) => ({
      ...e,
      style: {
        ...e.style,
        opacity: (e.source === selectedNodeId || e.target === selectedNodeId) ? 1 : 0.08,
        transition: 'opacity 0.25s ease',
      },
    }));
  }, [edges, selectedNodeId]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    onNodeSelect(node.id);
  }, [onNodeSelect]);

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <>
      <style>{`
        .react-flow__node:focus,
        .react-flow__node:focus-visible { outline: none !important; }
        .react-flow__controls {
          background: rgba(6,10,18,0.95) !important;
          border: 1px solid rgba(255,255,255,0.07) !important;
          border-radius: 6px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important;
          overflow: hidden;
        }
        .react-flow__controls-button {
          background: transparent !important;
          border: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.05) !important;
          color: rgba(255,255,255,0.3) !important;
          width: 28px !important;
          height: 28px !important;
          transition: all 0.15s ease !important;
        }
        .react-flow__controls-button:last-child { border-bottom: none !important; }
        .react-flow__controls-button:hover {
          background: rgba(255,255,255,0.04) !important;
          color: rgba(255,255,255,0.7) !important;
        }
        .react-flow__controls-button svg { fill: currentColor !important; }
        .react-flow__edge-text { display: none; }
        @keyframes panelFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
      `}</style>
      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12, maxZoom: 0.9 }}
        minZoom={0.15}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#070b14' }}
        panOnScroll
        selectionOnDrag={false}
        nodesDraggable={false}
        elevateNodesOnSelect={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={32}
          size={0.8}
          color="rgba(255,255,255,0.035)"
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
          style={{ bottom: 24, left: 24 }}
        />
      </ReactFlow>
    </>
  );
}
