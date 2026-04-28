import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.support.meta.title };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = getLocale(raw);
  const dict = getDictionary(locale);
  const items = dict.support.common.items;

  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href={`/${locale}`}
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          {dict.common.back}
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-12">
          {dict.support.title}
        </h1>

        <div className="space-y-10">
          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-medium mb-3">{dict.support.email.h}</h2>
            <p className="text-white/60 mb-4">{dict.support.email.intro}</p>
            <a
              href="mailto:support@tmuxonwatch.com"
              className="text-green-400 hover:underline font-mono text-sm"
            >
              support@tmuxonwatch.com
            </a>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-medium mb-3">{dict.support.github.h}</h2>
            <p className="text-white/60 mb-4">{dict.support.github.intro}</p>
            <a
              href="https://github.com/beneaug/TerminalPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline font-mono text-sm"
            >
              github.com/beneaug/TerminalPulse
            </a>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-medium mb-4">
              {dict.support.common.h}
            </h2>
            <div className="space-y-6 text-white/70">
              <div>
                <h3 className="text-white/90 font-medium mb-1">{items[0].h}</h3>
                <p className="text-sm">
                  {items[0].before}
                  <code className="text-green-400/80 bg-white/5 px-1.5 py-0.5 rounded text-xs">
                    curl -sf http://127.0.0.1:8787/health
                  </code>
                  {items[0].after}
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">{items[1].h}</h3>
                <p className="text-sm">{items[1].before}</p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">{items[2].h}</h3>
                <p className="text-sm">{items[2].before}</p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">{items[3].h}</h3>
                <p className="text-sm">
                  {items[3].before}
                  <code className="text-green-400/80 bg-white/5 px-1.5 py-0.5 rounded text-xs">
                    /tmp/tmuxonwatch.err.log
                  </code>
                  {items[3].after}
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">{items[4].h}</h3>
                <p className="text-sm">{items[4].before}</p>
                <code className="block mt-2 text-green-400/80 bg-white/5 px-3 py-2 rounded text-xs font-mono">
                  brew install beneaug/tmuxonwatch/tmuxonwatch
                  {"\n"}tmuxonwatch-install
                </code>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer
        currentLocale={locale}
        dict={dict.footer}
        languageMenu={dict.languageMenu}
      />
    </>
  );
}
