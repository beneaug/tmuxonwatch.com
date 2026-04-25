"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 121;
const FRAME_W = 1280;
const FRAME_H = 720;
const FRAME_ASPECT = FRAME_W / FRAME_H;
const MOBILE_BREAKPOINT = 768;

function framePath(index: number) {
  const padded = String(index + 1).padStart(4, "0");
  return `/scroll-lockin/desktop/frame_${padded}.webp`;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function fadeWindow(
  p: number,
  fadeInStart: number,
  fullIn: number,
  fullOut: number,
  fadeOutEnd: number
): number {
  if (p <= fadeInStart) return 0;
  if (p < fullIn)
    return easeOutCubic((p - fadeInStart) / (fullIn - fadeInStart));
  if (p <= fullOut) return 1;
  if (p < fadeOutEnd)
    return 1 - easeOutCubic((p - fullOut) / (fadeOutEnd - fullOut));
  return 0;
}

export default function LockInScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    ).matches;
    const count = FRAME_COUNT;

    const revealCanvas = () => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    };

    const drawFrame = (targetIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const img = pickNearestLoaded(framesRef.current, targetIndex);
      if (!img) return;
      if (currentFrameRef.current === targetIndex) return;
      if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      currentFrameRef.current = targetIndex;
    };

    const images: HTMLImageElement[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      images[i] = img;
    }
    framesRef.current = images;

    images[0].onload = () => {
      drawFrame(0);
      revealCanvas();
    };
    if (images[0].complete && images[0].naturalWidth > 0) {
      drawFrame(0);
      revealCanvas();
    }

    if (reducedMotion) {
      const showFinal = () => {
        const last = count - 1;
        if (images[last].complete && images[last].naturalWidth > 0) {
          drawFrame(last);
        } else {
          images[last].onload = () => drawFrame(last);
        }
      };
      showFinal();
      if (text3Ref.current) text3Ref.current.style.opacity = "1";
      if (buttonRef.current) buttonRef.current.style.opacity = "1";
      if (canvasWrapperRef.current) {
        canvasWrapperRef.current.style.transform = "none";
        canvasWrapperRef.current.style.opacity = "1";
      }
      return;
    }

    // Inertia-smoothed CSS var used by the section ABOVE this one to whisk
    // itself away as the user scrolls toward the pin. Same pattern as
    // WatchScrollSequence's --seq-approach but namespaced so it doesn't
    // collide with the watch sequence vars.
    let targetApproach = 0;
    let shownApproach = 0;
    let scrollRafId = 0;
    let smoothRafId = 0;
    const LERP = 0.14;
    const EPS = 0.001;
    const root = document.documentElement;

    const smoothStep = () => {
      smoothRafId = 0;
      const dA = targetApproach - shownApproach;
      shownApproach += dA * LERP;
      root.style.setProperty("--lockin-approach", shownApproach.toFixed(3));
      if (Math.abs(dA) > EPS) {
        smoothRafId = requestAnimationFrame(smoothStep);
      } else {
        shownApproach = targetApproach;
        root.style.setProperty("--lockin-approach", shownApproach.toFixed(3));
      }
    };

    const onScroll = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = 0;
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
        const progress = scrolled / scrollable;
        const frameIndex = Math.min(
          count - 1,
          Math.max(0, Math.round(progress * (count - 1)))
        );
        drawFrame(frameIndex);

        // Bottom-right pinned expansion: starts small, anchored to BR corner,
        // grows toward filling its slot. transform-origin handles the pin.
        const approachRaw = 1 - rect.top / (window.innerHeight * 1.3);
        const approach = easeOutCubic(
          Math.max(0, Math.min(1, approachRaw))
        );
        if (canvasWrapperRef.current) {
          // start scale much smaller so it visibly "expands from corner"
          const startScale = isMobile ? 0.45 : 0.42;
          const endScale = 1.0;
          const scale = startScale + (endScale - startScale) * approach;
          const opacity = Math.min(1, approach * 1.4);
          canvasWrapperRef.current.style.transform = `scale(${scale})`;
          canvasWrapperRef.current.style.opacity = String(opacity);
        }

        // Single headline fades in, holds, then clears so the App Store
        // button can take its place.
        const op3 = fadeWindow(progress, 0.20, 0.40, 0.72, 0.86);
        const opBtn = fadeWindow(progress, 0.86, 0.94, 1.01, 1.02);
        if (text3Ref.current) {
          text3Ref.current.style.opacity = String(op3);
          text3Ref.current.style.transform = `translate3d(0, ${(1 - op3) * 14}px, 0)`;
        }
        if (buttonRef.current) {
          buttonRef.current.style.opacity = String(opBtn);
          buttonRef.current.style.transform = `translate3d(0, ${(1 - opBtn) * 18}px, 0)`;
          buttonRef.current.style.pointerEvents = opBtn > 0.5 ? "auto" : "none";
        }

        // Whisk-away signal for the section above: 0 far below → 1 at pin.
        const approachWin = isMobile ? 0.85 : 0.5;
        const approachVarRaw =
          1 - rect.top / (window.innerHeight * approachWin);
        targetApproach = easeInOutCubic(
          Math.max(0, Math.min(1, approachVarRaw))
        );
        if (!smoothRafId) smoothRafId = requestAnimationFrame(smoothStep);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      if (smoothRafId) cancelAnimationFrame(smoothRafId);
      root.style.removeProperty("--lockin-approach");
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Lock in — tmuxonwatch on Apple Watch"
      className="relative lockin-section"
      style={{ height: "230vh" }}
    >
      {/* Sticky uses dvh so the slot tracks iOS Safari's chrome — no chin
          gap when the bottom bar collapses/expands. overscroll-contain on
          the section keeps rubber-band from exposing dead space below. */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {/* Bottom-right pinned video canvas — expands FROM the corner.
            On mobile we let it go nearly full-width and taller so it
            actually reads. transform-origin keeps the BR corner fixed. */}
        <div
          ref={canvasWrapperRef}
          className="absolute bottom-0 right-0 will-change-transform pointer-events-none w-[100vw] sm:w-[min(96vw,calc(98dvh*var(--lockin-aspect)),70rem)] max-h-[68dvh] sm:max-h-[78dvh]"
          style={{
            transformOrigin: "100% 100%",
            aspectRatio: `${FRAME_ASPECT}`,
            ["--lockin-aspect" as string]: `${FRAME_ASPECT}`,
            transform: "scale(0.42)",
            opacity: 0,
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500"
          />
        </div>

        {/* Copy + CTA live in the top-left dead space. Single headline
            crossfades into the App Store button. */}
        <div className="relative z-10 h-full w-full px-6 sm:px-10 lg:px-16 pt-[env(safe-area-inset-top)]">
          <div className="h-full max-w-3xl pt-16 sm:pt-24 lg:pt-28 pointer-events-none">
            <div className="relative h-44 sm:h-52 lg:h-60">
              <h2
                ref={text3Ref}
                className="absolute inset-0 text-[2.75rem] leading-[0.95] sm:text-6xl lg:text-8xl font-semibold tracking-tighter text-white will-change-transform"
                style={{ opacity: 0 }}
              >
                tokenmax from anywhere.
              </h2>

              {/* App Store button stands alone after the headline clears */}
              <div
                ref={buttonRef}
                className="absolute inset-0 flex items-start will-change-transform"
                style={{ opacity: 0, pointerEvents: "none" }}
              >
                <a
                  href="https://apps.apple.com/us/app/tmuxonwatch/id6759545173"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="group relative inline-flex items-center gap-3 rounded-[12px] bg-black h-14 sm:h-[60px] lg:h-[64px] px-5 sm:px-6 lg:px-7 text-white ring-1 ring-white/15 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_8px_24px_-12px_rgba(0,0,0,0.7)] transition-all duration-200 hover:ring-white/35 hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_14px_34px_-14px_rgba(0,0,0,0.9)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <svg
                    className="h-7 w-7 shrink-0 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span className="flex flex-col items-start text-left leading-[1.05]">
                    <span className="text-[10px] font-normal tracking-[0.08em] text-white/80 sm:text-[11px] lg:text-[12px]">
                      Download on the
                    </span>
                    <span className="text-[17px] font-semibold tracking-[-0.01em] sm:text-[19px] lg:text-[21px]">
                      App&nbsp;Store
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function pickNearestLoaded(
  frames: HTMLImageElement[],
  index: number
): HTMLImageElement | null {
  const target = frames[index];
  if (target && target.complete && target.naturalWidth > 0) return target;
  for (let offset = 1; offset < frames.length; offset++) {
    const before = frames[index - offset];
    if (before && before.complete && before.naturalWidth > 0) return before;
    const after = frames[index + offset];
    if (after && after.complete && after.naturalWidth > 0) return after;
  }
  return null;
}
