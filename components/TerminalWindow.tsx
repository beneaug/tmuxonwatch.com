"use client";

interface TerminalWindowProps {
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#1e1e2e] shadow-2xl overflow-hidden ${className}`}
    >
      {/* macOS title bar */}
      <div className="flex items-center px-4 py-2.5 bg-[#2b2b3d] border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-xs text-white/40 font-mono">
          augustbenedikt — tmux a — 120×30
        </span>
      </div>

      {/* tmux tab bar */}
      <div className="flex items-center h-7 bg-[#1a1a2a] border-b border-white/5 text-[10px] font-mono px-0 overflow-hidden">
        <div className="flex items-center gap-0.5 px-2.5 py-1 text-white/35 border-r border-white/5 whitespace-nowrap">
          <span className="text-white/20 mr-1">›</span>
          …sp · claude --dangerously-skip-perm…
          <span className="text-amber-400/60 ml-1.5">🔔</span>
        </div>
        <div className="flex items-center px-2.5 py-1 text-white/30 border-r border-white/5 whitespace-nowrap">
          ~ — -zsh
        </div>
        <div className="flex items-center px-3 py-1 text-white/70 bg-[#2b2b3d] border-x border-white/10 whitespace-nowrap">
          ~ — tmux a
        </div>
        <div className="flex-1" />
        <div className="flex items-center px-2.5 text-white/25">+</div>
      </div>

      {/* Terminal content */}
      <div className="p-4 pb-0 font-mono text-[11px] leading-[1.65] min-h-[320px]">
        {children}
      </div>

      {/* tmux status bar */}
      <div className="flex items-center justify-between h-6 bg-[#1a1a2a] border-t border-white/5 px-2 font-mono text-[10px]">
        <div className="flex items-center gap-1">
          <span className="bg-red-500 text-black px-1.5 rounded-sm font-bold text-[9px]">
            0
          </span>
          <span className="text-white/50">1:2.1.49*</span>
        </div>
        <span className="text-white/40">19:25</span>
      </div>
    </div>
  );
}
