"use client";

import Image from "next/image";
import TerminalAnimation from "./TerminalAnimation";
import WatchScreen from "./WatchScreen";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-12 pb-32 lg:pt-20 lg:pb-40">
      <div className="relative z-10 max-w-7xl xl:max-w-[88rem] mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left — copy */}
          <div
            className="space-y-8 lg:space-y-10 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="space-y-4 lg:space-y-5">
              <Image
                src="/logo.svg"
                alt="tmux on watch"
                width={320}
                height={128}
                className="h-auto block mx-auto lg:mx-0 -mt-2 mb-6 lg:mb-10 w-48 sm:w-52 lg:w-56"
                priority
              />
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-[7rem] font-bold leading-[0.9] tracking-tighter">
                Your terminal.
                <br />
                On your wrist.
              </h1>
              <p className="text-lg lg:text-xl text-white/60 max-w-lg lg:max-w-xl leading-relaxed">
                Live tmux output on Apple Watch. ANSI colors. Instant
                notifications. One command to set up.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="https://apps.apple.com/us/app/tmuxonwatch/id6759545173"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="group relative inline-flex items-center gap-3 rounded-[14px] bg-black px-5 py-2.5 lg:px-6 lg:py-3 text-white ring-1 ring-white/15 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_8px_24px_-12px_rgba(0,0,0,0.7)] transition-all duration-200 hover:ring-white/35 hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_14px_34px_-14px_rgba(0,0,0,0.9)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <svg
                  className="h-7 w-7 shrink-0 lg:h-8 lg:w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="flex flex-col items-start text-left leading-[1.05]">
                  <span className="text-[10px] font-normal tracking-[0.08em] text-white/80 lg:text-[11px]">
                    Download on the
                  </span>
                  <span className="text-[17px] font-semibold tracking-[-0.01em] lg:text-[19px]">
                    App&nbsp;Store
                  </span>
                </span>
              </a>
              <a
                href="#install"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-6 py-3 lg:px-7 lg:py-3.5 rounded-lg font-medium lg:text-base hover:border-white/40 hover:text-white transition-all duration-200"
              >
                Install server
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/beneaug/TerminalPulse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-6 py-3 lg:px-7 lg:py-3.5 rounded-lg font-medium lg:text-base hover:border-white/40 hover:text-white transition-all duration-200"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right — terminal with watch overlapping */}
          <div
            className="animate-fade-in-up relative overflow-visible"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Main terminal — full width, clipped on mobile */}
            <div className="overflow-hidden rounded-xl">
              <TerminalAnimation />
            </div>

            {/* Apple Watch overlapping bottom-right corner */}
            <div className="absolute -bottom-10 -right-2 sm:-right-6 lg:-bottom-14 z-20">
              <WatchScreen className="w-[180px] sm:w-[190px] lg:w-[220px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
