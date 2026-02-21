"use client";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({
  title = "bash",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-white/40 font-mono ml-2">{title}</span>
      </div>
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  );
}
