"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 121;
const FRAME_ASPECT = 1264 / 720;
const MOBILE_BREAKPOINT = 768;

function framePath(index: number) {
  const padded = String(index + 1).padStart(4, "0");
  return `/scroll-watch/desktop/frame_${padded}.webp`;
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

export default function WatchScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
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
      if (text1Ref.current) text1Ref.current.style.opacity = "1";
      if (canvasWrapperRef.current) {
        canvasWrapperRef.current.style.transform = "none";
        canvasWrapperRef.current.style.opacity = "1";
      }
      return;
    }

    // Inertia state for the neighbor CSS vars. Scroll always writes the
    // *target*; a self-scheduled rAF loop lerps the *shown* value toward it.
    // On fast mobile flicks the target can jump a lot between scroll events,
    // but the shown value still eases across ~6-8 frames, smoothing the fade.
    let targetApproach = 0;
    let targetExit = 0;
    let shownApproach = 0;
    let shownExit = 0;
    let scrollRafId = 0;
    let smoothRafId = 0;
    const LERP = 0.14;
    const EPS = 0.001;
    const root = document.documentElement;

    const smoothStep = () => {
      smoothRafId = 0;
      const dA = targetApproach - shownApproach;
      const dE = targetExit - shownExit;
      shownApproach += dA * LERP;
      shownExit += dE * LERP;
      root.style.setProperty("--seq-approach", shownApproach.toFixed(3));
      root.style.setProperty("--seq-exit", shownExit.toFixed(3));
      if (Math.abs(dA) > EPS || Math.abs(dE) > EPS) {
        smoothRafId = requestAnimationFrame(smoothStep);
      } else {
        shownApproach = targetApproach;
        shownExit = targetExit;
        root.style.setProperty("--seq-approach", shownApproach.toFixed(3));
        root.style.setProperty("--seq-exit", shownExit.toFixed(3));
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

        // Canvas swell: tight sync with scroll, no inertia — Apple-style.
        const approachRaw = 1 - rect.top / (window.innerHeight * 1.3);
        const approach = easeOutCubic(
          Math.max(0, Math.min(1, approachRaw))
        );
        if (canvasWrapperRef.current) {
          const endScale = isMobile ? 1.55 : 1.0;
          const translate = (1 - approach) * 120;
          const scale = endScale * (0.7 + approach * 0.3);
          const opacity = Math.min(1, approach * 1.4);
          canvasWrapperRef.current.style.transform = `translate3d(0, ${translate}px, 0) scale(${scale})`;
          canvasWrapperRef.current.style.opacity = String(opacity);
        }

        const op1 = fadeWindow(progress, 0.05, 0.18, 0.42, 0.5);
        const op2 = fadeWindow(progress, 0.55, 0.68, 0.88, 1.0);
        if (text1Ref.current) {
          text1Ref.current.style.opacity = String(op1);
          text1Ref.current.style.transform = `translate3d(0, ${(1 - op1) * 14}px, 0)`;
        }
        if (text2Ref.current) {
          text2Ref.current.style.opacity = String(op2);
          text2Ref.current.style.transform = `translate3d(0, ${(1 - op2) * 14}px, 0)`;
        }

        // Neighbor fade/compress: compute targets, let the smoothing loop
        // lerp the CSS vars toward them. Mobile uses a wider window (longer
        // viewports make the default feel snappy).
        //   --seq-approach: 0 far below → 1 at pin.      (hero fade)
        //   --seq-exit:     0 at pin    → 1 fully past.  (post-section rise)
        const approachWin = isMobile ? 0.85 : 0.5;
        const exitWin = isMobile ? 0.75 : 0.45;
        const neighborApproachRaw =
          1 - rect.top / (window.innerHeight * approachWin);
        targetApproach = easeInOutCubic(
          Math.max(0, Math.min(1, neighborApproachRaw))
        );
        const pastPin = Math.max(0, -rect.top - scrollable);
        targetExit = easeInOutCubic(
          Math.max(0, Math.min(1, pastPin / (window.innerHeight * exitWin)))
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
      root.style.removeProperty("--seq-approach");
      root.style.removeProperty("--seq-exit");
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Apple Watch running tmux on watch"
      className="relative"
      style={{ height: "170vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-10 sm:gap-14 sm:px-6">
        <div
          ref={canvasWrapperRef}
          className="relative will-change-transform"
          style={{
            aspectRatio: `${FRAME_ASPECT}`,
            width: `min(100%, 56rem, calc(62svh * ${FRAME_ASPECT}))`,
            transform: "translate3d(0, 120px, 0) scale(0.7)",
            opacity: 0,
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500"
          />
        </div>

        <div className="relative h-14 sm:h-20 w-full max-w-3xl text-center pointer-events-none">
          <h2
            ref={text1Ref}
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-white will-change-transform"
            style={{ opacity: 0 }}
          >
            Effortlessly elegant.
          </h2>
          <h2
            ref={text2Ref}
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-white will-change-transform"
            style={{ opacity: 0 }}
          >
            Always a glance away.
          </h2>
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
