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

// The real delivery pipeline of this site — every node here actually exists.
const NODES: Node[] = [
  {
    id: "client",
    label: "CLIENT",
    letter: "C",
    x: 15,
    y: 47,
    color: "#00e5ff",
    type: "Browser / Visitor",
    description: "You, right now. The React single-page app runs entirely in your browser — terminal, carousels, and this map included. No server round-trips after first load.",
  },
  {
    id: "cdn",
    label: "CDN",
    letter: "E",
    x: 33,
    y: 47,
    color: "#00e5ff",
    type: "GitHub Pages / Fastly Edge",
    description: "Static assets served over HTTPS from GitHub Pages' global CDN (Fastly), with the custom domain utkarshcode.com mapped via CNAME.",
  },
  {
    id: "app",
    label: "APP",
    letter: "A",
    x: 52,
    y: 25,
    color: "#ff2d78",
    type: "React 18 + Vite SPA",
    description: "TypeScript, Tailwind, and Radix primitives bundled by Vite. State is plain React hooks — no server, no database, nothing to break at 3am.",
  },
  {
    id: "forms",
    label: "FORMS",
    letter: "F",
    x: 70,
    y: 13,
    color: "#00e5ff",
    type: "FormSubmit Relay",
    description: "The contact form POSTs to FormSubmit's AJAX endpoint, which relays the message to my inbox — the only third-party API call on the site.",
  },
  {
    id: "repo",
    label: "REPO",
    letter: "R",
    x: 52,
    y: 68,
    color: "#00e5ff",
    type: "GitHub Repository",
    description: "Source of truth. Public repo — you can read the code behind this exact screen at github.com/Utkarsh-patel26/utkarsh-patel26.github.io.",
  },
  {
    id: "ci",
    label: "CI/CD",
    letter: "G",
    x: 70,
    y: 77,
    color: "#00e5ff",
    type: "GitHub Actions",
    description: "Every push to main runs npm ci, vite build, and deploys the dist artifact to Pages. Commit to live site in under two minutes.",
  },
  {
    id: "inbox",
    label: "INBOX",
    letter: "I",
    x: 87,
    y: 47,
    color: "#ff2d78",
    type: "Email",
    description: "Where your message lands if you use the contact form. I usually reply within 24 hours.",
  },
];

const EDGES: Edge[] = [
  { from: "client", to: "cdn" },
  { from: "cdn", to: "app" },
  { from: "app", to: "forms" },
  { from: "forms", to: "inbox" },
  { from: "repo", to: "ci" },
  { from: "ci", to: "cdn" },
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
            How this site actually ships — real stack, no fiction
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
                  COST: $0/mo
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
