"use client";

import Image from "next/image";

/**
 * Apple Watch bezel with Claude Code terminal content inside.
 * Screen area calibrated to the watch-bezel.png transparent region.
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
      {/* Screen content — covering the full transparent screen area */}
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
        <div className="w-full h-full px-[8%] py-[6%] font-mono flex flex-col overflow-hidden">
          {/* Claude Code header */}
          <div className="flex items-center gap-[3px] mb-[5%]">
            <span className="text-[7px] sm:text-[8px] text-orange-400">{">"}</span>
            <span className="text-[7px] sm:text-[8px] text-white/80 font-semibold">
              Claude Code
            </span>
          </div>

          {/* Claude Code style output */}
          <div className="space-y-[4px] flex-1">
            <div className="whitespace-nowrap">
              <span className="text-white/40 text-[7px] sm:text-[8px]">$ </span>
              <span className="text-white text-[7px] sm:text-[8px]">claude</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-white/40 text-[7px] sm:text-[8px]">{">"} </span>
              <span className="text-white/60 text-[7px] sm:text-[8px] italic">
                fix auth bug...
              </span>
            </div>
            <div className="whitespace-nowrap mt-[2px]">
              <span className="text-cyan-400 text-[7px] sm:text-[8px]">Read </span>
              <span className="text-white/60 text-[7px] sm:text-[8px]">
                server/auth.ts
              </span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-green-400 text-[7px] sm:text-[8px]">Edit </span>
              <span className="text-white/60 text-[7px] sm:text-[8px]">
                server/auth.ts
              </span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-white/30 text-[6px] sm:text-[7px]">
                {"  ✓"} Updated JWT exp
              </span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-yellow-400 text-[7px] sm:text-[8px]">Bash </span>
              <span className="text-white/60 text-[7px] sm:text-[8px]">npm test</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="text-green-400 text-[7px] sm:text-[8px]">
                {"  ✓"}{" "}
              </span>
              <span className="text-white/70 text-[7px] sm:text-[8px]">
                14 tests passed
              </span>
            </div>
            <div className="whitespace-nowrap mt-[2px]">
              <span className="text-white/20 text-[6px] sm:text-[7px]">
                Done in 4.2s
              </span>
            </div>
          </div>

          {/* Cursor */}
          <div className="mt-auto pt-[3%]">
            <span className="text-white/40 text-[7px] sm:text-[8px]">{">"} </span>
            <span className="animate-blink text-orange-400 text-[7px] sm:text-[8px]">
              ▊
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
