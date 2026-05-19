import { motion } from "framer-motion";

const nodes = [
  { id: "in",   x: 50,  y: 200, label: "Input" },
  { id: "cls",  x: 220, y: 200, label: "Classifier" },
  { id: "med",  x: 400, y: 100, label: "Diagnosis" },
  { id: "rag",  x: 400, y: 300, label: "RAG" },
  { id: "tri",  x: 560, y: 100, label: "Triage" },
  { id: "sum",  x: 560, y: 300, label: "Summary" },
  { id: "out",  x: 720, y: 200, label: "Insight" },
];

const edges: [string, string][] = [
  ["in","cls"], ["cls","med"], ["cls","rag"],
  ["med","tri"], ["rag","sum"], ["tri","out"], ["sum","out"],
];

function node(id: string) { return nodes.find((n) => n.id === id)!; }

export function AgentNetwork() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-4">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <svg viewBox="0 0 800 400" className="relative h-[300px] w-full sm:h-[360px]">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.18 295)" />
            <stop offset="100%" stopColor="oklch(0.82 0.18 165)" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="oklch(0.78 0.18 295 / 0.6)" />
            <stop offset="100%" stopColor="oklch(0.78 0.18 295 / 0)" />
          </radialGradient>
        </defs>

        {edges.map(([a, b], i) => {
          const A = node(a), B = node(b);
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="oklch(1 0 0 / 0.1)" strokeWidth="1" />
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="url(#edge)" strokeWidth="1.5" className="flow-line" />
            </g>
          );
        })}

        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="36" fill="url(#nodeGlow)" />
            <motion.circle
              cx={n.x} cy={n.y} r="14"
              fill="oklch(0.21 0.05 270)"
              stroke="url(#edge)" strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
            />
            <text x={n.x} y={n.y + 36} textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 260)" fontFamily="Inter">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
