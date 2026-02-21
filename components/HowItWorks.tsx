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

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
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
                {/* Screen content — precisely covering the iPhone screen area */}
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
                    {/* Subtle background grid */}
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />

                    {/* Dynamic Island area */}
                    <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[35%] h-[3.5%] bg-black rounded-full z-20" />

                    {/* Top label */}
                    <p className="absolute top-[10%] text-[9px] font-mono text-white/30 tracking-wider uppercase">
                      TerminalPulse
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

                      {/* Actual QR code */}
                      <Image
                        src="/qr-code.svg"
                        alt="QR Code"
                        width={120}
                        height={120}
                        className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] relative z-0"
                      />

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

          {/* Step 3: Watch — Watch bezel with terminal output */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative w-[160px] sm:w-[180px]">
                {/* Watch bezel */}
                <Image
                  src="/watch-bezel.png"
                  alt="Apple Watch"
                  width={260}
                  height={400}
                  className="relative z-10 w-full h-auto pointer-events-none select-none"
                />
                {/* Screen content — precisely covering the watch screen area */}
                <div
                  className="absolute z-0 overflow-hidden bg-black"
                  style={{
                    top: "24.5%",
                    left: "12%",
                    width: "76%",
                    height: "41%",
                    borderRadius: "16%",
                  }}
                >
                  <div className="w-full h-full p-[10%] font-mono flex flex-col overflow-hidden">
                    <div className="text-[8px] sm:text-[9px] text-green-400/70 mb-[6%] truncate">
                      tmux: main — bash
                    </div>
                    <div className="space-y-[3px]">
                      <div className="whitespace-nowrap">
                        <span className="text-white/50 text-[8px] sm:text-[9px]">
                          ${" "}
                        </span>
                        <span className="text-white text-[8px] sm:text-[9px]">
                          npm run build
                        </span>
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="text-green-400 text-[8px] sm:text-[9px]">
                          {"✓"}{" "}
                        </span>
                        <span className="text-white/80 text-[8px] sm:text-[9px]">
                          Compiled 4.2s
                        </span>
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="text-green-400 text-[8px] sm:text-[9px]">
                          {"✓"}{" "}
                        </span>
                        <span className="text-white/80 text-[8px] sm:text-[9px]">
                          Pages{" "}
                        </span>
                        <span className="text-cyan-400 text-[8px] sm:text-[9px]">
                          (14/14)
                        </span>
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="text-green-400 text-[8px] sm:text-[9px]">
                          {"✓"}{" "}
                        </span>
                        <span className="text-white/80 text-[8px] sm:text-[9px]">
                          Optimized
                        </span>
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="text-white/60 text-[7px] sm:text-[8px]">
                          /{" "}
                        </span>
                        <span className="text-green-400 text-[7px] sm:text-[8px]">
                          89.1 kB
                        </span>
                      </div>
                      <div className="whitespace-nowrap">
                        <span className="text-cyan-400 text-[7px] sm:text-[8px]">
                          /dash{" "}
                        </span>
                        <span className="text-yellow-400 text-[7px] sm:text-[8px]">
                          96.3 kB
                        </span>
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
