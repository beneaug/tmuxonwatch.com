"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale, isLocale } from "@/lib/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";
const ONE_YEAR = 60 * 60 * 24 * 365;

function setLocaleCookie(value: string | null) {
  if (typeof document === "undefined") return;
  if (value === null) {
    document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
  } else {
    document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`;
  }
}

function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

interface Props {
  currentLocale: Locale;
  common: {
    privacy: string;
    terms: string;
    support: string;
  };
  languageMenu: {
    label: string;
    english: string;
    japanese: string;
    system: string;
    open: string;
    close: string;
  };
}

export default function LegalDisclosure({
  currentLocale,
  common,
  languageMenu,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname() || `/${currentLocale}`;

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

  const choose = (next: Locale | "system") => {
    setOpen(false);
    if (next === "system") {
      setLocaleCookie(null);
      window.location.assign("/");
      return;
    }
    setLocaleCookie(next);
    if (next === currentLocale) return;
    const target = swapLocaleInPath(pathname, next);
    router.push(target);
    router.refresh();
  };

  return (
    <div
      ref={ref}
      className="fixed top-3 right-3 z-50 font-mono text-[10px] uppercase tracking-[0.18em] flex flex-col items-end"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? languageMenu.close : languageMenu.open}
        aria-expanded={open}
        className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/10 text-white/45 hover:text-white hover:ring-white/30 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <circle cx="12" cy="5" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="12" cy="19" r="1.6" />
        </svg>
      </button>
      {open && (
        <div className="mt-2 rounded-md bg-black/70 backdrop-blur-md ring-1 ring-white/10 px-3 py-2.5 flex flex-col items-end gap-1.5 text-white/55 min-w-[10rem]">
          <a href={`/${currentLocale}/privacy`} className="hover:text-white transition-colors">
            {common.privacy}
          </a>
          <a href={`/${currentLocale}/terms`} className="hover:text-white transition-colors">
            {common.terms}
          </a>
          <a href={`/${currentLocale}/support`} className="hover:text-white transition-colors">
            {common.support}
          </a>

          <div className="w-full h-px bg-white/10 my-1" />

          {/* Language switcher — same kebab popover, lower section */}
          <div className="w-full flex flex-col items-end gap-1 normal-case tracking-normal font-sans text-[11px]">
            <span className="text-white/35 text-[10px] uppercase tracking-[0.18em] font-mono">
              {languageMenu.label}
            </span>
            {(["en", "ja"] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => choose(loc)}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                {loc === currentLocale && (
                  <span className="text-green-400 text-[9px]">●</span>
                )}
                <span>{loc === "en" ? languageMenu.english : languageMenu.japanese}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => choose("system")}
              className="hover:text-white transition-colors text-white/40"
            >
              {languageMenu.system}
            </button>
          </div>

          <span className="pt-1 mt-1 border-t border-white/10 w-full text-right text-white/30 normal-case tracking-normal text-[10px]">
            © {new Date().getFullYear()} tmuxonwatch
          </span>
        </div>
      )}
    </div>
  );
}
