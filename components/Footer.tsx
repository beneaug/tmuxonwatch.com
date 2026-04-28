import LanguageMenu from "./LanguageMenu";
import type { Locale } from "@/lib/i18n/config";

interface Props {
  currentLocale: Locale;
  dict: {
    copyright: string;
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

export default function Footer({ currentLocale, dict, languageMenu }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 py-8 text-[11px] font-mono uppercase tracking-[0.18em] text-white/30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {year} {dict.copyright}</span>
        <nav className="flex items-center gap-5">
          <a
            href={`/${currentLocale}/privacy`}
            className="hover:text-white/70 transition-colors"
          >
            {dict.privacy}
          </a>
          <a
            href={`/${currentLocale}/terms`}
            className="hover:text-white/70 transition-colors"
          >
            {dict.terms}
          </a>
          <a
            href={`/${currentLocale}/support`}
            className="hover:text-white/70 transition-colors"
          >
            {dict.support}
          </a>
          <LanguageMenu
            currentLocale={currentLocale}
            strings={languageMenu}
            variant="inline"
            align="right"
          />
        </nav>
      </div>
    </footer>
  );
}
