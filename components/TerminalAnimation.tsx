"use client";

import TerminalWindow from "./TerminalWindow";

const tmuxLines = [
  {
    parts: [
      { text: "$ ", color: "text-white/50" },
      { text: "npm run build", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "> ", color: "text-white/40" },
      { text: "stratum-quote@2.4.0 build", color: "text-white/60" },
    ],
  },
  {
    parts: [
      { text: "> ", color: "text-white/40" },
      { text: "next build", color: "text-white/60" },
    ],
  },
  {
    parts: [
      { text: "  ", color: "text-white" },
      { text: "▲ Next.js 15.1.3", color: "text-white/70" },
    ],
  },
  {
    parts: [
      { text: "  Creating an optimized production build", color: "text-white/60" },
      { text: " ...", color: "text-white/30" },
    ],
  },
  {
    parts: [
      { text: "  ✓ ", color: "text-green-400" },
      { text: "Compiled successfully in 4.2s", color: "text-white/80" },
    ],
  },
  {
    parts: [
      { text: "  ✓ ", color: "text-green-400" },
      { text: "Collecting page data", color: "text-white/80" },
    ],
  },
  {
    parts: [
      { text: "  ✓ ", color: "text-green-400" },
      { text: "Generating static pages ", color: "text-white/80" },
      { text: "(14/14)", color: "text-cyan-400" },
    ],
  },
  {
    parts: [
      { text: "  ✓ ", color: "text-green-400" },
      { text: "Finalizing page optimization", color: "text-white/80" },
    ],
  },
  {
    parts: [{ text: "", color: "text-white" }],
  },
  {
    parts: [
      { text: "  Route              ", color: "text-white/50" },
      { text: "Size     ", color: "text-white/50" },
      { text: "First Load", color: "text-white/50" },
    ],
  },
  {
    parts: [
      { text: "  ○ /                ", color: "text-white/80" },
      { text: "5.2 kB   ", color: "text-white/60" },
      { text: "89.1 kB", color: "text-green-400" },
    ],
  },
  {
    parts: [
      { text: "  ○ /api/quotes      ", color: "text-white/80" },
      { text: "0 B      ", color: "text-white/60" },
      { text: "83.9 kB", color: "text-green-400" },
    ],
  },
  {
    parts: [
      { text: "  ● /dashboard       ", color: "text-cyan-400" },
      { text: "12.4 kB  ", color: "text-white/60" },
      { text: "96.3 kB", color: "text-yellow-400" },
    ],
  },
];

// Condensed version of the same output for the watch
export const watchLines = [
  {
    parts: [
      { text: "$ ", color: "text-white/50" },
      { text: "npm run build", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "✓ ", color: "text-green-400" },
      { text: "Compiled 4.2s", color: "text-white/80" },
    ],
  },
  {
    parts: [
      { text: "✓ ", color: "text-green-400" },
      { text: "Pages ", color: "text-white/80" },
      { text: "(14/14)", color: "text-cyan-400" },
    ],
  },
  {
    parts: [
      { text: "✓ ", color: "text-green-400" },
      { text: "Optimized", color: "text-white/80" },
    ],
  },
  {
    parts: [
      { text: "/ ", color: "text-white/60" },
      { text: "89.1 kB", color: "text-green-400" },
    ],
  },
  {
    parts: [
      { text: "/dash ", color: "text-cyan-400" },
      { text: "96.3 kB", color: "text-yellow-400" },
    ],
  },
];

export default function TerminalAnimation() {
  return (
    <TerminalWindow title="tmux: main — bash">
      <div className="space-y-0.5 min-h-[280px]">
        {tmuxLines.map((line, i) => (
          <div key={i} className="terminal-line whitespace-pre">
            {line.parts.map((part, j) => (
              <span key={j} className={part.color}>
                {part.text}
              </span>
            ))}
          </div>
        ))}
        <div
          className="terminal-line mt-2"
          style={{ animationDelay: "7.5s" }}
        >
          <span className="text-white/50">$ </span>
          <span className="animate-blink text-green-400">▊</span>
        </div>
      </div>
    </TerminalWindow>
  );
}
