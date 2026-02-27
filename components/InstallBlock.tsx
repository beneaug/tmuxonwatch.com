"use client";

import { useState } from "react";

const INSTALL_CMD =
  "brew tap beneaug/tmuxonwatch && brew install tmuxonwatch && tmuxonwatch-install";

export default function InstallBlock() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <p className="font-mono text-green-400 text-sm tracking-wider uppercase">
            Install
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready? One command.
          </h2>
        </div>

        {/* Command block */}
        <button
          onClick={copy}
          className="group relative w-full text-left cursor-pointer"
        >
          <div className="relative rounded-xl border border-white/10 bg-[#1a1a1a] p-6 hover:border-green-400/30 transition-colors duration-300">
            {/* Terminal dots */}
            <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
            </div>

            <div className="flex items-center justify-between gap-4">
              <code className="font-mono text-sm sm:text-base text-green-400 break-all">
                <span className="text-white/50">$ </span>
                {INSTALL_CMD}
              </code>

              <div className="shrink-0 text-white/30 group-hover:text-green-400 transition-colors duration-200">
                {copied ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Copy feedback */}
          <div
            className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono transition-opacity duration-200 ${
              copied ? "opacity-100 text-green-400" : "opacity-0"
            }`}
          >
            Copied to clipboard
          </div>
        </button>

        {/* Notes */}
        <div className="space-y-2 text-sm text-white/40">
          <p>
            Works with{" "}
            <a
              href="https://tailscale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white underline underline-offset-2 transition-colors"
            >
              Tailscale
            </a>{" "}
            for remote access
          </p>
          <p>Requires macOS, Python 3.10+, and tmux</p>
        </div>
      </div>
    </section>
  );
}
