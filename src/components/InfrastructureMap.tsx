import React, { useState, useEffect, useRef } from "react";

type Node = {
  id: string;
  label: string;
  letter: string;
  x: number;
  y: number;
  color: string;
  type: string;
  description: string;
};

type Edge = {
  from: string;
  to: string;
};

const NODES: Node[] = [
  {
    id: "client",
    label: "CLIENT",
    letter: "C",
    x: 15,
    y: 47,
    color: "#00e5ff",
    type: "Browser / User",
    description: "Entry point for all user requests. React frontend running Vite, served over HTTPS via CDN edge nodes.",
  },
  {
    id: "edge",
    label: "EDGE",
    letter: "E",
    x: 32,
    y: 47,
    color: "#00e5ff",
    type: "Vercel Edge",
    description: "Distributed infrastructure that serves content from the nearest global node. Handles routing, caching, and middleware execution.",
  },
  {
    id: "engine",
    label: "ENGINE",
    letter: "F",
    x: 52,
    y: 25,
    color: "#ff2d78",
    type: "React Engine / BBS",
    description: "State management, 3D orchestration, and terminal logic. Drives all real-time UI interactions and component trees.",
  },
  {
    id: "analytics",
    label: "ANALYTICS",
    letter: "A",
    x: 70,
    y: 13,
    color: "#00e5ff",
    type: "Data Sink",
    description: "Captures real-time user metrics, performance vitals, and error tracking. Pipes into dashboards for observability.",
  },
  {
    id: "api",
    label: "API",
    letter: "A",
    x: 52,
    y: 65,
    color: "#00e5ff",
    type: "Spring Boot / REST",
    description: "Core backend API layer. Handles authentication (JWT), business logic, and database transactions via Spring Boot microservices.",
  },
  {
    id: "smtp",
    label: "SMTP",
    letter: "S",
    x: 70,
    y: 77,
    color: "#00e5ff",
    type: "Mail / Notification",
    description: "Email delivery pipeline. Handles transactional emails, alerts, and async notification dispatch via SMTP relay.",
  },
  {
    id: "db",
    label: "DATABASE",
    letter: "D",
    x: 87,
    y: 50,
    color: "#ff2d78",
    type: "PostgreSQL / Redis",
    description: "Primary persistence layer. PostgreSQL for relational data with B+ Tree indexing. Redis for hot-path caching and pub/sub.",
  },
];

const EDGES: Edge[] = [
  { from: "client", to: "edge" },
  { from: "edge", to: "engine" },
  { from: "edge", to: "api" },
  { from: "engine", to: "analytics" },
  { from: "engine", to: "db" },
  { from: "api", to: "smtp" },
  { from: "api", to: "db" },
];

type TrafficDot = {
  id: number;
  edge: Edge;
  progress: number;
  speed: number;
};

export const InfrastructureMap = ({ onClose }: { onClose: () => void }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [simulatingTraffic, setSimulatingTraffic] = useState(false);
  const [trafficDots, setTrafficDots] = useState<TrafficDot[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const animFrameRef = useRef<number>();
  const dotsRef = useRef<TrafficDot[]>([]);
  const dotIdRef = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodePos = (nodeId: string, svgW: number, svgH: number) => {
    const node = NODES.find((n) => n.id === nodeId)!;
    return { x: (node.x / 100) * svgW, y: (node.y / 100) * svgH };
  };

  useEffect(() => {
    if (!simulatingTraffic) {
      dotsRef.current = [];
      setTrafficDots([]);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const spawnInterval = setInterval(() => {
      const randomEdge = EDGES[Math.floor(Math.random() * EDGES.length)];
      const newDot: TrafficDot = {
        id: dotIdRef.current++,
        edge: randomEdge,
        progress: 0,
        speed: Math.random() * 0.008 + 0.004,
      };
      dotsRef.current = [...dotsRef.current, newDot];
    }, 300);

    const animate = () => {
      dotsRef.current = dotsRef.current
        .map((d) => ({ ...d, progress: d.progress + d.speed }))
        .filter((d) => d.progress <= 1);
      setTrafficDots([...dotsRef.current]);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(spawnInterval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [simulatingTraffic]);

  const getTrafficDotPos = (dot: TrafficDot, svgW: number, svgH: number) => {
    const from = getNodePos(dot.edge.from, svgW, svgH);
    const to = getNodePos(dot.edge.to, svgW, svgH);
    return {
      x: from.x + (to.x - from.x) * dot.progress,
      y: from.y + (to.y - from.y) * dot.progress,
    };
  };

  const svgW = 1000;
  const svgH = 520;

  return (
    <div className="fixed inset-0 z-[20000] bg-[#020408] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-8 pt-6 pb-2 flex-shrink-0">
        <div>
          <div className="text-[#00e5ff] font-mono font-bold text-xl tracking-widest">
            SYSTEM_TOPOLOGY
          </div>
          <div className="text-[#ff2d78] font-mono text-[10px] tracking-widest mt-0.5 opacity-80">
            Live Architectural Schematic
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setSimulatingTraffic((v) => !v)}
            className={`font-mono text-[11px] tracking-widest px-5 py-2 rounded-full border transition-all duration-300 ${
              simulatingTraffic
                ? "border-[#ff2d78] text-[#ff2d78] bg-[#ff2d78]/10 shadow-[0_0_20px_rgba(255,45,120,0.3)]"
                : "border-[#00e5ff]/50 text-[#00e5ff] hover:border-[#00e5ff] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            }`}
          >
            {simulatingTraffic ? "STOP_TRAFFIC" : "SIMULATE_TRAFFIC"}
          </button>
          <button
            onClick={onClose}
            className="font-mono text-[11px] tracking-widest px-5 py-2 rounded-full border border-white/20 text-white/60 hover:border-white/50 hover:text-white transition-all duration-300"
          >
            CLOSE_MAP
          </button>
        </div>
      </div>

      {/* SVG Topology */}
      <div className="flex-1 relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-pink">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-dot">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {EDGES.map((edge, i) => {
            const from = getNodePos(edge.from, svgW, svgH);
            const to = getNodePos(edge.to, svgW, svgH);
            const isActive =
              hoveredNode === edge.from || hoveredNode === edge.to;
            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={isActive ? "#00e5ff" : "#00e5ff"}
                  strokeOpacity={isActive ? 0.5 : 0.18}
                  strokeWidth={isActive ? 1.5 : 1}
                />
                {/* Arrow dot */}
                <circle
                  cx={from.x + (to.x - from.x) * 0.55}
                  cy={from.y + (to.y - from.y) * 0.55}
                  r={2.5}
                  fill="#00e5ff"
                  opacity={isActive ? 0.8 : 0.3}
                />
              </g>
            );
          })}

          {/* Traffic Dots */}
          {trafficDots.map((dot) => {
            const pos = getTrafficDotPos(dot, svgW, svgH);
            return (
              <circle
                key={dot.id}
                cx={pos.x}
                cy={pos.y}
                r={4}
                fill="#00e5ff"
                filter="url(#glow-dot)"
                opacity={0.9}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const pos = getNodePos(node.id, svgW, svgH);
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode?.id === node.id;
            const r = isHovered || isSelected ? 28 : 24;
            return (
              <g
                key={node.id}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setSelectedNode(selectedNode?.id === node.id ? null : node)
                }
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer glow ring */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r + 8}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={1}
                  opacity={isHovered || isSelected ? 0.4 : 0.1}
                />
                {/* Main circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill="#020408"
                  stroke={node.color}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter={node.color === "#ff2d78" ? "url(#glow-pink)" : "url(#glow-cyan)"}
                  opacity={isHovered || isSelected ? 1 : 0.9}
                />
                {/* Letter */}
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize={14}
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="2"
                >
                  {node.letter}
                </text>
                {/* Label below */}
                <text
                  x={pos.x}
                  y={pos.y + r + 16}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={9}
                  fontFamily="monospace"
                  letterSpacing="2"
                  opacity={0.5}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Info Panel — positioned relative to clicked node */}
        {selectedNode && (() => {
          // Position panel so it stays on screen based on node location
          const isRight = selectedNode.x > 55;
          const isBottom = selectedNode.y > 55;
          const panelStyle: React.CSSProperties = {
            pointerEvents: "all",
            position: "absolute",
            width: "288px",
            ...(isRight  ? { right: "5%"  } : { left: "5%"  }),
            ...(isBottom ? { bottom: "12%" } : { top: "12%"  }),
          };
          return (
            <div
              className="bg-[#0a0a0e] border-l-2 border-[#ff2d78] p-5 shadow-[0_0_40px_rgba(255,45,120,0.15)] animate-in slide-in-from-right-4 fade-in duration-200"
              style={panelStyle}
            >
              <div className="font-bold text-white text-lg mb-1">
                {selectedNode.label}
              </div>
              <div className="text-[#ff2d78] text-xs font-mono mb-3 tracking-widest">
                {selectedNode.type}
              </div>
              <div className="text-white/70 text-sm leading-relaxed">
                {selectedNode.description}
              </div>
              <div className="mt-4 flex gap-2 text-[10px] font-mono">
                <span className="px-2 py-1 rounded border border-[#00e5ff]/30 text-[#00e5ff]/70">
                  STATUS: ONLINE
                </span>
                <span className="px-2 py-1 rounded border border-green-500/30 text-green-400/70">
                  LATENCY: {Math.floor(Math.random() * 20 + 2)}ms
                </span>
              </div>
            </div>
          );
        })()}

        {/* Legend */}
        <div className="absolute bottom-6 left-8 font-mono text-[10px] tracking-widest opacity-40 text-white space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-[#00e5ff] inline-block" />
            SERVICE NODE
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-[#ff2d78] inline-block" />
            CORE ENGINE
          </div>
          <div className="mt-2 opacity-60">CLICK NODE FOR DETAILS</div>
        </div>

        {/* Live indicator */}
        <div className="absolute top-2 right-8 flex items-center gap-2 font-mono text-[10px] tracking-widest">
          <span
            className={`w-2 h-2 rounded-full ${
              simulatingTraffic
                ? "bg-[#ff2d78] animate-ping"
                : "bg-[#00e5ff] opacity-50"
            }`}
          />
          <span className={simulatingTraffic ? "text-[#ff2d78]" : "text-white/30"}>
            {simulatingTraffic ? "TRAFFIC_ACTIVE" : "IDLE"}
          </span>
        </div>
      </div>
    </div>
  );
};
