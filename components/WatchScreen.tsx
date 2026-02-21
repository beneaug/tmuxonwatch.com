"use client";

import Image from "next/image";

/**
 * Apple Watch bezel with realistic Claude Code terminal content inside.
 * Mimics the actual watch app appearance with wrapping text, dividers,
 * and real conversation content.
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
        <div className="w-full h-full px-[6%] py-[5%] font-mono flex flex-col overflow-hidden text-[5.5px] sm:text-[6.5px] leading-[1.5]">
          {/* Status line */}
          <div className="text-white/30 mb-[3px]">
            <span className="text-white/50">*</span> Worked for 8m 42s
          </div>

          {/* Tool use output */}
          <div className="space-y-[2px]">
            <div>
              <span className="text-cyan-400">Read </span>
              <span className="text-white/50">WatchScreen.tsx</span>
            </div>
            <div>
              <span className="text-green-400">Edit </span>
              <span className="text-white/50">WatchScreen.tsx</span>
            </div>
            <div className="text-white/25 text-[4.5px] sm:text-[5.5px]">
              {"  "}✓ height: 48% → 55%
            </div>
          </div>

          {/* Divider */}
          <div className="text-white/15 my-[3px] leading-none">
            ────────────────────
          </div>

          {/* User prompt — wraps naturally like real watch */}
          <div className="text-white/80 flex-1">
            <span className="text-white/50">›</span>{" "}
            <span>
              fix watch bezel display on site, ensure visually perfect and
              cohesive
            </span>
            <span className="animate-blink text-green-400">█</span>
          </div>

          {/* Bottom divider */}
          <div className="text-white/15 my-[3px] leading-none">
            ────────────────────
          </div>

          {/* Status bar */}
          <div className="mt-auto">
            <span className="text-red-400">►►</span>
            <span className="text-white/50"> auto-approve</span>
          </div>
        </div>
      </div>
    </div>
  );
}
