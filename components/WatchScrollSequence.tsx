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

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
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
      if (canvasWrapperRef.current) {
        canvasWrapperRef.current.style.transform = "none";
        canvasWrapperRef.current.style.opacity = "1";
      }
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

        // Apple-style approach: start ramping ~1.3 viewports before the section
        // pins, so the watch swells into place instead of sliding in cold.
        const approachRaw = 1 - rect.top / (window.innerHeight * 1.3);
        const approach = easeOutCubic(
          Math.max(0, Math.min(1, approachRaw))
        );
        if (canvasWrapperRef.current) {
          const translate = (1 - approach) * 120;
          const scale = 0.7 + approach * 0.3;
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
      style={{ height: "220vh" }}
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
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              firstFrameReady ? "opacity-100" : "opacity-0"
            }`}
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
