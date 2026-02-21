"use client";

import Image from "next/image";

/**
 * Apple Watch bezel with realistic Claude Code terminal content.
 * Matches the actual watch app appearance — wrapping text, green dividers,
 * readable font sizes, and real conversation content.
 */
export default function WatchScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/watch-bezel.png"
        alt="Apple Watch"
        width={260}
        height={400}
        className="relative z-10 w-full h-auto pointer-events-none select-none"
        priority
      />
      {/* Screen content — calibrated to the watch-bezel.png transparent region */}
      <div
        className="absolute z-0 overflow-hidden bg-black"
        style={{
          top: "22.5%",
          left: "11%",
          width: "78%",
          height: "55%",
          borderRadius: "16% / 11%",
        }}
      >
        <div
          className="w-full h-full flex flex-col overflow-hidden"
          style={{ padding: "8% 7%" }}
        >
          {/* Status line — dim, like the real watch */}
          <p
            className="text-white/40 font-mono"
            style={{ fontSize: "clamp(5px, 1.2vw, 8px)", marginBottom: "4%" }}
          >
            <span className="text-white/60">*</span> Worked for 7m 31s
          </p>

          {/* Tool use output — cyan Read, green Edit */}
          <div
            className="font-mono"
            style={{
              fontSize: "clamp(5.5px, 1.3vw, 8.5px)",
              lineHeight: 1.6,
              marginBottom: "3%",
            }}
          >
            <div>
              <span className="text-cyan-400">Read </span>
              <span className="text-white/50">WatchScreen.tsx</span>
            </div>
            <div>
              <span className="text-green-400">Edit </span>
              <span className="text-white/50">WatchScreen.tsx</span>
            </div>
            <div className="text-white/30" style={{ fontSize: "90%" }}>
              &nbsp;&nbsp;✓ height: 48% → 55%
            </div>
          </div>

          {/* Green divider — matches the real watch */}
          <div
            className="text-green-500/40 font-mono leading-none overflow-hidden whitespace-nowrap"
            style={{
              fontSize: "clamp(5px, 1.2vw, 8px)",
              marginBottom: "4%",
            }}
          >
            ──────────────────────────
          </div>

          {/* User prompt — wraps naturally like the real watch */}
          <div
            className="font-mono text-white/90 flex-1"
            style={{
              fontSize: "clamp(5.5px, 1.3vw, 8.5px)",
              lineHeight: 1.55,
            }}
          >
            <span className="text-white/50">›</span>{" "}
            the display in apple watch bezel on site is still wrong, please
            ensure it is visually perfect and cohesive
            <span className="animate-blink text-green-400">█</span>
          </div>

          {/* Green divider */}
          <div
            className="text-green-500/40 font-mono leading-none overflow-hidden whitespace-nowrap"
            style={{
              fontSize: "clamp(5px, 1.2vw, 8px)",
              marginTop: "4%",
              marginBottom: "4%",
            }}
          >
            ──────────────────────────
          </div>

          {/* Status bar — red arrows, green "on" */}
          <div
            className="font-mono mt-auto"
            style={{
              fontSize: "clamp(5px, 1.2vw, 8px)",
              lineHeight: 1.5,
            }}
          >
            <div>
              <span className="text-red-400">►►</span>
              <span className="text-white/60"> bypass permissions</span>
            </div>
            <div>
              <span className="text-green-400">on</span>
              <span className="text-white/35"> (shift+tab to cycle)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
