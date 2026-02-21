"use client";

import TerminalWindow from "./TerminalWindow";

/**
 * Hero terminal — Claude Code conversation that matches the watch display.
 * The user prompt here is the same text shown on the watch web render.
 */
export default function TerminalAnimation() {
  return (
    <TerminalWindow>
      <div className="space-y-0 text-[11px]">
        {/* git push output */}
        <L>
          <span className="text-white/40">{"  └─ "}</span>
          <span className="text-white/70">[main ffed100] Pixel-match watch display to reference screenshot</span>
        </L>
        <L>
          <span className="text-white/50">{"     1 file changed, 37 insertions(+), 65 deletions(-)"}</span>
        </L>
        <L>
          <span className="text-white/50">{"     To https://github.com/beneaug/tmuxonwatch.com.git"}</span>
        </L>
        <L>
          <span className="text-white/50">{"       7759159..ffed100  main -> main"}</span>
        </L>

        <Blank />

        {/* Claude Code response */}
        <L>
          <span className="text-blue-400">● </span>
          <span className="text-white/90">
            Pushed successfully. Vercel will auto-deploy from the main branch.
            The latest WatchScreen.tsx now includes every element from your
            reference screenshot:
          </span>
        </L>

        <Blank />

        <L>
          <span className="text-white/60">{"  – "}</span>
          <span className="font-bold text-white/80">✻ Worked for 7m 31s</span>
          <span className="text-white/50"> — with the exact ✻ symbol</span>
        </L>
        <L>
          <span className="text-white/60">{"  – "}</span>
          <span className="font-bold text-white/80">[Image #17] [Image #18]</span>
          <span className="text-white/50"> — indented, muted</span>
        </L>
        <L>
          <span className="text-white/60">{"  – "}</span>
          <span className="font-bold text-white/80">(↑ to select)</span>
          <span className="text-white/50"> — dimmed hint</span>
        </L>

        <Blank />

        <L>
          <span className="text-white/60">
            All using fluid clamp() font sizing for responsive scaling. The
            deployment should be live on tmuxonwatch.com within a minute or two.
          </span>
        </L>

        <Blank />

        {/* Cogitated */}
        <L>
          <span className="text-white/50">✻ </span>
          <span className="text-white/40">Cogitated for 3m 28s</span>
        </L>

        <Blank />

        {/* Feedback prompt */}
        <L>
          <span className="text-blue-400">● </span>
          <span className="font-bold text-white/80">How is Claude doing this session?</span>
          <span className="text-white/50"> (optional)</span>
        </L>
        <L>
          <span className="text-white/50">{"  1: Bad    2: Fine    3: Good    0: Dismiss"}</span>
        </L>

        <Blank />

        {/* User prompt — SAME text as the watch display */}
        <L>
          <span className="text-white/60">❯ </span>
          <span className="text-cyan-300/70">
            the display in apple watch bezel on site is still wrong, the display
            is a div short. please ensure it is visually perfect and cohesive
          </span>
          <span className="animate-blink text-green-400">▊</span>
        </L>

        <Blank />

        {/* Bypass permissions — fully red */}
        <L>
          <span className="text-white/40">{"  "}</span>
          <span className="text-red-400">►► bypass permissions </span>
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
