"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_FRAME_COUNT = 121;
const MOBILE_FRAME_COUNT = 61;
const FRAME_ASPECT = 1264 / 720;
const MOBILE_BREAKPOINT = 768;

function framePath(isMobile: boolean, index: number) {
  const dir = isMobile ? "mobile" : "desktop";
  const padded = String(index + 1).padStart(4, "0");
  return `/scroll-watch/${dir}/frame_${padded}.webp`;
}

function fadeWindow(
  p: number,
  fadeInStart: number,
  fullIn: number,
  fullOut: number,
  fadeOutEnd: number
): number {
  if (p <= fadeInStart) return 0;
  if (p < fullIn) return (p - fadeInStart) / (fullIn - fadeInStart);
  if (p <= fullOut) return 1;
  if (p < fadeOutEnd) return 1 - (p - fullOut) / (fadeOutEnd - fullOut);
  return 0;
}

export default function WatchScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    ).matches;
    const count = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;

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
      img.src = framePath(isMobile, i);
      images[i] = img;
    }
    framesRef.current = images;

    images[0].onload = () => {
      drawFrame(0);
      setFirstFrameReady(true);
    };
    if (images[0].complete && images[0].naturalWidth > 0) {
      drawFrame(0);
      setFirstFrameReady(true);
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
      return;
    }

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
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

        const op1 = fadeWindow(progress, 0.08, 0.22, 0.4, 0.52);
        const op2 = fadeWindow(progress, 0.58, 0.7, 0.85, 0.95);
        if (text1Ref.current)
          text1Ref.current.style.opacity = String(op1);
        if (text2Ref.current)
          text2Ref.current.style.opacity = String(op2);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Apple Watch running tmux on watch"
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-8 sm:gap-12 px-6">
        <div
          className="relative"
          style={{
            aspectRatio: `${FRAME_ASPECT}`,
            width: `min(100%, 44rem, calc(55svh * ${FRAME_ASPECT}))`,
          }}
        >
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              firstFrameReady ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="relative h-12 sm:h-16 w-full max-w-2xl text-center pointer-events-none">
          <h2
            ref={text1Ref}
            className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
            style={{ opacity: 0 }}
          >
            Effortlessly elegant.
          </h2>
          <h2
            ref={text2Ref}
            className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
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
