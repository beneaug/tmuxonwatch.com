"use client";

import { useEffect, useRef, useState } from "react";

export default function LegalDisclosure() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed top-3 right-3 z-50 font-mono text-[10px] uppercase tracking-[0.18em] flex flex-col items-end"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide legal links" : "Show legal links"}
        aria-expanded={open}
        className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/10 text-white/45 hover:text-white hover:ring-white/30 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
        </svg>
      </button>
      {open && (
        <div className="mt-2 rounded-md bg-black/70 backdrop-blur-md ring-1 ring-white/10 px-3 py-2.5 flex flex-col items-end gap-1.5 text-white/55">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="/support" className="hover:text-white transition-colors">
            Support
          </a>
          <span className="pt-1 mt-1 border-t border-white/10 text-white/30 normal-case tracking-normal text-[10px]">
            © {new Date().getFullYear()} tmuxonwatch
          </span>
        </div>
      )}
    </div>
  );
}
