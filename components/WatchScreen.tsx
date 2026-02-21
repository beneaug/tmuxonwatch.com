"use client";

import Image from "next/image";

/**
 * Apple Watch bezel with Claude Code terminal content.
 *
 * The bezel PNG is 260×400. The transparent screen region measured from the image:
 *   top: ~82px (20.5%), bottom: ~308px (77%), left: ~26px (10%), right: ~234px (90%)
 *   → screen area: top 20.5%, left 10%, width 80%, height 56.5%
 *
 * Font sizes use CSS container query units (cqw) so they scale proportionally
 * with the watch size, not the viewport. This ensures text fits identically
 * whether the watch is 110px or 200px wide.
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
      {/* Screen content — precisely calibrated to bezel transparent region */}
      <div
        className="absolute z-0 overflow-hidden bg-black"
        style={{
          top: "20.5%",
          left: "10%",
          width: "80%",
          height: "56.5%",
          borderRadius: "18% / 10%",
          containerType: "inline-size",
        }}
      >
        <div
          className="w-full h-full flex flex-col overflow-hidden font-mono text-left"
          style={{
            padding: "6% 7%",
            /* cqw = % of the screen container width — scales with watch size */
            fontSize: "4.2cqw",
            lineHeight: 1.55,
          }}
        >
          {/* ✻ Worked for 7m 31s */}
          <p className="text-white/50 shrink-0" style={{ marginBottom: "2%" }}>
            <span className="text-white/70">✻</span> Worked for 7m 31s
          </p>

          {/* [Image #17] [Image #18] */}
          <p className="text-white/60 shrink-0" style={{ marginBottom: "1%" }}>
            &nbsp;&nbsp;[Image #17] [Image #18]
          </p>

          {/* (↑ to select) */}
          <p className="text-white/35 shrink-0" style={{ marginBottom: "2%" }}>
            (↑ to select)
          </p>

          {/* Grey divider above input */}
          <div
            className="w-full shrink-0"
            style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "3%" }}
          />

          {/* User prompt — same text as the mac terminal */}
          <div
            className="text-white/90 flex-1 min-h-0 overflow-hidden"
            style={{ lineHeight: 1.45 }}
          >
            <span className="text-white/60 font-bold">›</span> the display
            in apple watch bezel on site is still wrong, the display is a div
            short. please ensure it is visually perfect and cohesive
            <span className="animate-blink text-green-400">█</span>
          </div>

          {/* Grey divider below input */}
          <div
            className="w-full shrink-0"
            style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginTop: "3%", marginBottom: "3%" }}
          />

          {/* ►► bypass permissions — red */}
          <div style={{ lineHeight: 1.45 }} className="shrink-0">
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
