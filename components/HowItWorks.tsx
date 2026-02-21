"use client";

import Image from "next/image";
import TerminalWindow from "./TerminalWindow";

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
          {/* Step 1: Install */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <TerminalWindow title="bash">
                <div className="space-y-1 text-xs sm:text-sm">
                  <div>
                    <span className="text-white/50">$ </span>
                    <span className="text-white">
                      bash &lt;(curl -sSL tmuxonwatch.com/install)
                    </span>
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
                    <span className="text-white/80">
                      {" "}
                      Server running on port 8787
                    </span>
                  </div>
                </div>
              </TerminalWindow>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-green-400/60 text-sm">01</span>
                <h3 className="text-xl font-semibold">Install</h3>
              </div>
              <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
                One command. Python venv, auth token, launchd service — all
                automatic.
              </p>
            </div>
          </div>

          {/* Step 2: Scan — iPhone bezel */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative w-[180px] sm:w-[200px]">
                {/* iPhone bezel */}
                <Image
                  src="/iphone-bezel.png"
                  alt="iPhone"
                  width={460}
                  height={932}
                  className="relative z-10 w-full h-auto pointer-events-none"
                />
                {/* QR scanner content inside the phone screen */}
                <div className="absolute z-0 inset-0 flex items-center justify-center">
                  <div
                    className="bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center"
                    style={{
                      width: "88%",
                      height: "94%",
                      borderRadius: "12%",
                      marginTop: "0%",
                    }}
                  >
                    {/* Camera viewfinder mock */}
                    <div className="relative w-full flex-1 flex items-center justify-center bg-[#111]">
                      {/* Dim grid pattern */}
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }} />

                      {/* QR frame corners */}
                      <div className="relative w-20 h-20">
                        {/* Top-left */}
                        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400" />
                        {/* Top-right */}
                        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400" />
                        {/* Bottom-left */}
                        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400" />
                        {/* Bottom-right */}
                        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400" />

                        {/* QR icon hint */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white/20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Scan line */}
                      <div className="absolute left-[20%] right-[20%] h-[2px] bg-green-400/40 animate-scan" />
                    </div>

                    {/* Bottom bar */}
                    <div className="w-full px-4 py-3 text-center">
                      <p className="text-[9px] font-mono text-white/40">
                        Point camera at QR code
                      </p>
                    </div>
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

          {/* Step 3: Watch — Watch bezel */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative w-[160px] sm:w-[180px]">
                {/* Watch bezel */}
                <Image
                  src="/watch-bezel.png"
                  alt="Apple Watch"
                  width={320}
                  height={480}
                  className="relative z-10 w-full h-auto pointer-events-none"
                />
                {/* Terminal content inside the watch screen */}
                <div className="absolute z-0 inset-0 flex items-center justify-center">
                  <div
                    className="bg-black rounded-[22%] overflow-hidden"
                    style={{
                      width: "62%",
                      height: "38%",
                      marginTop: "-2%",
                    }}
                  >
                    <div className="p-2 font-mono leading-tight h-full flex flex-col justify-start overflow-hidden">
                      <div className="text-[7px] text-green-400/60 mb-1">
                        tmux: main
                      </div>
                      <div className="space-y-[2px]">
                        <div className="whitespace-nowrap">
                          <span className="text-white/50" style={{ fontSize: "7px" }}>$ </span>
                          <span className="text-white" style={{ fontSize: "7px" }}>npm run build</span>
                        </div>
                        <div className="whitespace-nowrap">
                          <span className="text-green-400" style={{ fontSize: "7px" }}>✓ </span>
                          <span className="text-white/80" style={{ fontSize: "7px" }}>Compiled 4.2s</span>
                        </div>
                        <div className="whitespace-nowrap">
                          <span className="text-green-400" style={{ fontSize: "7px" }}>✓ </span>
                          <span className="text-white/80" style={{ fontSize: "7px" }}>Pages </span>
                          <span className="text-cyan-400" style={{ fontSize: "7px" }}>(14/14)</span>
                        </div>
                        <div className="whitespace-nowrap">
                          <span className="text-green-400" style={{ fontSize: "7px" }}>✓ </span>
                          <span className="text-white/80" style={{ fontSize: "7px" }}>Optimized</span>
                        </div>
                        <div className="whitespace-nowrap">
                          <span className="text-white/60" style={{ fontSize: "7px" }}>/ </span>
                          <span className="text-green-400" style={{ fontSize: "7px" }}>89.1 kB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
