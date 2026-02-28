"use client";

import Image from "next/image";
import WatchScreen from "./WatchScreen";

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

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Step 1: Install */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-lg border border-white/10 bg-[#1e1e2e] shadow-xl overflow-hidden w-full max-w-[320px]">
                {/* Compact title bar */}
                <div className="flex items-center px-3 py-2 bg-[#2b2b3d] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="flex-1 text-center text-[10px] text-white/40 font-mono">
                    bash
                  </span>
                </div>
                {/* Content */}
                <div className="p-3 font-mono text-[11px] leading-relaxed text-left space-y-0.5">
                  <div>
                    <span className="text-white/50">$ </span>
                    <span className="text-white">
                      brew install beneaug/tmuxonwatch/tmuxonwatch
                    </span>
                  </div>
                  <div>
                    <span className="text-white/50">$ </span>
                    <span className="text-white">tmuxonwatch-install</span>
                  </div>
                  <div className="text-cyan-400">
                    {"=>"} Checking prerequisites...
                  </div>
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
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-green-400/60 text-sm">01</span>
                <h3 className="text-xl font-semibold">Install</h3>
              </div>
              <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
                Homebrew install, then run tmuxonwatch-install. Python venv,
                auth token, launchd service — all automatic.
              </p>
            </div>
          </div>

          {/* Step 2: Scan — iPhone bezel with QR code */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative w-[180px] sm:w-[200px]">
                {/* iPhone bezel */}
                <Image
                  src="/iphone-bezel.png"
                  alt="iPhone"
                  width={453}
                  height={912}
                  className="relative z-10 w-full h-auto pointer-events-none select-none"
                />
                {/* Screen content */}
                <div
                  className="absolute z-0 overflow-hidden bg-[#0a0a0a]"
                  style={{
                    top: "2.4%",
                    left: "4.6%",
                    width: "90.8%",
                    height: "95.2%",
                    borderRadius: "11% / 5.5%",
                  }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    {/* Dynamic Island */}
                    <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[35%] h-[3.5%] bg-black rounded-full z-20" />

                    {/* Top label */}
                    <p className="absolute top-[10%] text-[9px] font-mono text-white/30 tracking-wider uppercase">
                      tmuxonwatch
                    </p>

                    {/* QR code with scanning frame */}
                    <div className="relative">
                      {/* Corner brackets */}
                      <div className="absolute -inset-3 z-10">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400/70 rounded-tl" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400/70 rounded-tr" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400/70 rounded-bl" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400/70 rounded-br" />
                      </div>

                      {/* QR code with white background */}
                      <div className="bg-white rounded-md p-2">
                        <Image
                          src="/qr-code.svg"
                          alt="QR Code"
                          width={120}
                          height={120}
                          className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] relative z-0"
                        />
                      </div>

                      {/* Scan line */}
                      <div className="absolute left-0 right-0 h-[2px] bg-green-400/50 z-10 animate-scan" />
                    </div>

                    {/* Bottom label */}
                    <p className="absolute bottom-[8%] text-[8px] font-mono text-white/30">
                      Point camera at QR code
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-green-400/60 text-sm">02</span>
                <h3 className="text-xl font-semibold">Scan</h3>
              </div>
              <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
                The installer prints a QR code. Point your iPhone camera at it.
              </p>
            </div>
          </div>

          {/* Step 3: Watch — Claude Code output */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <WatchScreen className="w-[160px] sm:w-[180px]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-green-400/60 text-sm">03</span>
                <h3 className="text-xl font-semibold">Watch</h3>
              </div>
              <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
                Your tmux sessions appear on your wrist in full color.
                That&apos;s it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
