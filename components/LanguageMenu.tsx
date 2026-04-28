"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale, isLocale } from "@/lib/i18n/config";

type Strings = {
  label: string;
  english: string;
  japanese: string;
  system: string;
  open: string;
  close: string;
};

interface Props {
  currentLocale: Locale;
  strings: Strings;
  /**
   * Visual flavor. "kebab" = three-dots button (used inside LegalDisclosure
   * already, so we expose "inline" too for embedding in the Footer where the
   * surrounding container handles its own affordance).
   */
  variant?: "kebab" | "inline";
  align?: "left" | "right";
}

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
  // ["", "en", ...rest]
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export default function LanguageMenu({
  currentLocale,
  strings,
  variant = "kebab",
  align = "right",
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
      // Re-trigger middleware detection by reloading at the bare root.
      window.location.assign("/");
      return;
    }
    setLocaleCookie(next);
    if (next === currentLocale) return;
    const target = swapLocaleInPath(pathname, next);
    router.push(target);
    router.refresh();
  };

  const itemBase =
    "w-full text-left px-3 py-1.5 rounded text-[11px] hover:bg-white/10 transition-colors flex items-center justify-between gap-3";

  return (
    <div
      ref={ref}
      className={`relative inline-flex flex-col ${align === "right" ? "items-end" : "items-start"}`}
    >
      {variant === "kebab" ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? strings.close : strings.open}
          aria-expanded={open}
          className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/10 text-white/45 hover:text-white hover:ring-white/30 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? strings.close : strings.open}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
          <span>{strings.label}</span>
        </button>
      )}

      {open && (
        <div
          className={`absolute z-50 mt-2 ${variant === "kebab" ? "top-full" : "bottom-full mb-2 mt-0"} ${align === "right" ? "right-0" : "left-0"} min-w-[10rem] rounded-md bg-black/80 backdrop-blur-md ring-1 ring-white/10 p-1.5 flex flex-col gap-0.5 text-white/70 normal-case tracking-normal font-sans`}
        >
          {(["en", "ja"] as const).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => choose(loc)}
              className={itemBase}
            >
              <span>{loc === "en" ? strings.english : strings.japanese}</span>
              {loc === currentLocale && (
                <span className="text-green-400 text-[10px]">●</span>
              )}
            </button>
          ))}
          <div className="h-px bg-white/10 my-1" />
          <button
            type="button"
            onClick={() => choose("system")}
            className={itemBase}
          >
            <span>{strings.system}</span>
          </button>
        </div>
      )}
    </div>
  );
}
