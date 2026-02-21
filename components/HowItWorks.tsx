"use client";

import TerminalWindow from "./TerminalWindow";

const steps = [
  {
    number: "01",
    title: "Install",
    description: "One command. Python venv, auth token, launchd service — all automatic.",
    visual: (
      <TerminalWindow title="bash">
        <div className="space-y-1 text-xs sm:text-sm">
          <div>
            <span className="text-white/50">$ </span>
            <span className="text-white">bash &lt;(curl -sSL tmuxonwatch.com/install)</span>
          </div>
          <div className="text-cyan-400">{"=>"} Checking prerequisites...</div>
          <div>
            <span className="text-green-400">{"✓"}</span>
            <span className="text-white/80"> Found Python 3.12</span>
          </div>
          <div>
            <span className="text-green-400">{"✓"}</span>
            <span className="text-white/80"> Found tmux 3.4</span>
          </div>
          <div>
            <span className="text-green-400">{"✓"}</span>
            <span className="text-white/80"> Server running on port 8787</span>
          </div>
        </div>
      </TerminalWindow>
    ),
  },
  {
    number: "02",
    title: "Scan",
    description: "The installer prints a QR code. Point your iPhone camera at it.",
    visual: (
      <div className="relative mx-auto w-48 h-80 rounded-[2rem] border-2 border-white/10 bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
        <div className="absolute top-3 w-20 h-5 bg-black rounded-full" />
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto border-2 border-green-400/60 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10 text-green-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
            </svg>
          </div>
          <p className="text-xs text-white/40 font-mono">Scan QR Code</p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Watch",
    description: "Your tmux sessions appear on your wrist in full color. That's it.",
    visual: (
      <div className="relative mx-auto w-40 h-48 rounded-[1.5rem] border-2 border-white/10 bg-[#1a1a1a] overflow-hidden flex flex-col">
        <div className="px-3 pt-3 pb-1">
          <span className="text-[8px] font-mono text-green-400/60">main — bash</span>
        </div>
        <div className="px-3 pb-3 space-y-0.5 text-[9px] font-mono leading-tight">
          <div>
            <span className="text-red-400">* </span>
            <span className="text-yellow-400">a3f7c2d </span>
            <span className="text-white/80">feat: ANSI color</span>
          </div>
          <div>
            <span className="text-red-400">* </span>
            <span className="text-yellow-400">e91b4fa </span>
            <span className="text-white/80">fix: haptic</span>
          </div>
          <div>
            <span className="text-red-400">* </span>
            <span className="text-yellow-400">7d2e1c8 </span>
            <span className="text-white/80">refactor: bridge</span>
          </div>
          <div>
            <span className="text-red-400">* </span>
            <span className="text-yellow-400">b4a09ff </span>
            <span className="text-white/80">session API</span>
          </div>
        </div>
        {/* Watch band hint */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/5 rounded-t-lg" />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/5 rounded-b-lg" />
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="font-mono text-green-400 text-sm tracking-wider uppercase">
            Setup
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Three steps. Under a minute.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center space-y-6">
              <div className="flex justify-center">{step.visual}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-green-400/60 text-sm">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
