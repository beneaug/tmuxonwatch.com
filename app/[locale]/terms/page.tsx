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
  return { title: dict.support.termsMeta.title };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = getLocale(raw);
  const dict = getDictionary(locale);
  const s = dict.terms.sections;

  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href={`/${locale}`}
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          {dict.common.back}
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-2">{dict.terms.title}</h1>
        <p className="text-white/40 text-sm mb-12">
          {dict.terms.lastUpdated}
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.accept.h}
            </h2>
            <p>{s.accept.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">{s.desc.h}</h2>
            <p>{s.desc.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.selfHosted.h}
            </h2>
            <p>{s.selfHosted.intro}</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              {s.selfHosted.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <p className="mt-3">{s.selfHosted.outro}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">{s.iap.h}</h2>
            <p>{s.iap.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">{s.ip.h}</h2>
            <p>{s.ip.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.warranty.h}
            </h2>
            <p>{s.warranty.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.liability.h}
            </h2>
            <p>{s.liability.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">{s.term.h}</h2>
            <p>{s.term.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.changes.h}
            </h2>
            <p>{s.changes.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.contact.h}
            </h2>
            <p>
              {s.contact.intro}
              <a
                href="mailto:support@tmuxonwatch.com"
                className="text-green-400 hover:underline"
              >
                support@tmuxonwatch.com
              </a>
            </p>
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
