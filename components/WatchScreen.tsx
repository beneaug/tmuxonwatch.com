"use client";

import Image from "next/image";

/**
 * Apple Watch bezel with Claude Code terminal content.
 * Pixel-matched to the real Apple Watch screenshot.
 */
export default function WatchScreen({ className = "" }: { className?: string }) {
  const fs = "clamp(5px, 1.1vw, 7.5px)";

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
      {/* Screen content — calibrated to watch-bezel.png transparent region */}
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
          className="w-full h-full flex flex-col overflow-hidden font-mono text-left"
          style={{ padding: "6% 8%", fontSize: fs, lineHeight: 1.6 }}
        >
          {/* ✻ Worked for 7m 31s */}
          <p className="text-white/50" style={{ marginBottom: "3%" }}>
            <span className="text-white/70">✻</span> Worked for 7m 31s
          </p>

          {/* [Image #17] [Image #18] */}
          <p className="text-white/60" style={{ marginBottom: "1%" }}>
            &nbsp;&nbsp;[Image #17] [Image #18]
          </p>

          {/* (↑ to select) */}
          <p className="text-white/35" style={{ marginBottom: "3%" }}>
            (↑ to select)
          </p>

          {/* Grey divider above input */}
          <div
            className="w-full shrink-0"
            style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "4%" }}
          />

          {/* User prompt — same text as the mac terminal */}
          <div
            className="text-white/90 flex-1"
            style={{ lineHeight: 1.5 }}
          >
            <span className="text-white/60 font-bold">›</span> the display
            in apple watch bezel on site is still wrong, the display is a div
            short. please ensure it is visually perfect and cohesive
            <span className="animate-blink text-green-400">█</span>
          </div>

          {/* Grey divider below input */}
          <div
            className="w-full shrink-0"
            style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginTop: "4%", marginBottom: "4%" }}
          />

          {/* ►► bypass permissions — red */}
          <div style={{ lineHeight: 1.5 }} className="mt-auto shrink-0">
            <div>
              <span className="text-red-400">►► bypass permissions</span>
            </div>
            <div>
              <span className="text-red-400">on</span>
              <span className="text-white/35"> (shift+tab to cycle)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
