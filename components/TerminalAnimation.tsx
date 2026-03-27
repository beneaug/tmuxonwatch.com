"use client";

import TerminalWindow from "./TerminalWindow";

/**
 * Hero terminal - release-prep output mirrored on the watch render.
 * The prompt text here matches the watch content.
 */
export default function TerminalAnimation() {
  return (
    <TerminalWindow>
      <div className="space-y-0 text-[11px]">
        {/* git push output */}
        <L>
          <span className="text-white/40">{"  └─ "}</span>
          <span className="text-white/70">[main ffed100] Tighten launch copy and watch preview for release</span>
        </L>
        <L>
          <span className="text-white/50">{"     4 files changed, 42 insertions(+), 19 deletions(-)"}</span>
        </L>
        <L>
          <span className="text-white/50">{"     To https://github.com/beneaug/tmuxonwatch.com.git"}</span>
        </L>
        <L>
          <span className="text-white/50">{"       7759159..ffed100  main -> main"}</span>
        </L>

        <Blank />

        {/* Release summary */}
        <L>
          <span className="text-blue-400">● </span>
          <span className="text-white/90">
            Release surface updated. The latest site preview now keeps the watch
            and terminal examples aligned with App Store-safe launch copy:
          </span>
        </L>

        <Blank />

        <L>
          <span className="text-white/60">{"  – "}</span>
          <span className="font-bold text-white/80">Clean terminal examples</span>
          <span className="text-white/50"> — no risky permission or brand callouts</span>
        </L>
        <L>
          <span className="text-white/60">{"  – "}</span>
          <span className="font-bold text-white/80">Review-ready screenshots</span>
          <span className="text-white/50"> — focused on tmux output and watch display</span>
        </L>
        <L>
          <span className="text-white/60">{"  – "}</span>
          <span className="font-bold text-white/80">Demo mode confirmed</span>
          <span className="text-white/50"> — reviewers can test without server setup</span>
        </L>

        <Blank />

        <L>
          <span className="text-white/60">
            The updated build preview should be live on tmuxonwatch.com within a
            minute or two.
          </span>
        </L>

        <Blank />

        {/* Progress note */}
        <L>
          <span className="text-white/50">✻ </span>
          <span className="text-white/40">Release check finished in 3m 28s</span>
        </L>

        <Blank />

        {/* Feedback prompt */}
        <L>
          <span className="text-blue-400">● </span>
          <span className="font-bold text-white/80">How does this launch look?</span>
          <span className="text-white/50"> (optional)</span>
        </L>
        <L>
          <span className="text-white/50">{"  1: Bad    2: Fine    3: Good    0: Dismiss"}</span>
        </L>

        <Blank />

        {/* Grey divider above input */}
        <div className="w-full" style={{ height: "1px", background: "rgba(255,255,255,0.15)", margin: "2px 0 6px" }} />

        {/* User prompt - same text as the watch display */}
        <L>
          <span className="text-white/60">❯ </span>
          <span className="text-white">
            prepare the launch screenshots and verify the watch view matches the
            phone layout
          </span>
          <span className="animate-blink text-green-400">▊</span>
        </L>

        {/* Grey divider below input */}
        <div className="w-full" style={{ height: "1px", background: "rgba(255,255,255,0.15)", margin: "6px 0 2px" }} />

        <Blank />

        {/* Launch mode toggle */}
        <L>
          <span className="text-white/40">{"  "}</span>
          <span className="text-green-400">►► live updates </span>
          <span className="text-green-400">on</span>
          <span className="text-white/30"> (shift+tab to cycle)</span>
        </L>
      </div>
    </TerminalWindow>
  );
}

function L({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-pre-wrap leading-[1.65]">{children}</div>;
}

function Blank() {
  return <div className="h-[1.1em]" />;
}
