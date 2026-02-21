"use client";

import TerminalWindow from "./TerminalWindow";

const gitLogLines = [
  {
    parts: [
      { text: "$ ", color: "text-white/50" },
      { text: "git log --oneline --graph --all", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "* ", color: "text-red-400" },
      { text: "a3f7c2d ", color: "text-yellow-400" },
      { text: "(", color: "text-white/40" },
      { text: "HEAD -> main", color: "text-cyan-400" },
      { text: ") ", color: "text-white/40" },
      { text: "feat: ANSI 24-bit color support", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "* ", color: "text-red-400" },
      { text: "e91b4fa ", color: "text-yellow-400" },
      { text: "fix: watchOS haptic on command complete", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "* ", color: "text-red-400" },
      { text: "7d2e1c8 ", color: "text-yellow-400" },
      { text: "refactor: tmux bridge async polling", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "* ", color: "text-red-400" },
      { text: "b4a09ff ", color: "text-yellow-400" },
      { text: "(", color: "text-white/40" },
      { text: "origin/main", color: "text-green-400" },
      { text: ") ", color: "text-white/40" },
      { text: "add session switching API", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "|\\", color: "text-red-400" },
    ],
  },
  {
    parts: [
      { text: "| ", color: "text-red-400" },
      { text: "* ", color: "text-green-400" },
      { text: "c8f23a1 ", color: "text-yellow-400" },
      { text: "(", color: "text-white/40" },
      { text: "feature/themes", color: "text-cyan-400" },
      { text: ") ", color: "text-white/40" },
      { text: "add Dracula theme", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "| ", color: "text-red-400" },
      { text: "* ", color: "text-green-400" },
      { text: "91de7b3 ", color: "text-yellow-400" },
      { text: "add Gruvbox color scheme", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "|/", color: "text-red-400" },
    ],
  },
  {
    parts: [
      { text: "* ", color: "text-red-400" },
      { text: "4e1a2bc ", color: "text-yellow-400" },
      { text: "initial FastAPI server + auth", color: "text-white" },
    ],
  },
  {
    parts: [
      { text: "* ", color: "text-red-400" },
      { text: "0f8d3e7 ", color: "text-yellow-400" },
      { text: "init: project scaffold", color: "text-white" },
    ],
  },
];

export default function TerminalAnimation() {
  return (
    <TerminalWindow title="~/projects/terminalpulse — bash">
      <div className="space-y-0.5 min-h-[280px]">
        {gitLogLines.map((line, i) => (
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
          style={{ animationDelay: "6.5s" }}
        >
          <span className="text-white/50">$ </span>
          <span className="animate-blink text-green-400">▊</span>
        </div>
      </div>
    </TerminalWindow>
  );
}
