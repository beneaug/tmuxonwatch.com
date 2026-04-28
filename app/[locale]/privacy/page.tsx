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
  return { title: dict.support.privacyMeta.title };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = getLocale(raw);
  const dict = getDictionary(locale);
  const s = dict.privacy.sections;

  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href={`/${locale}`}
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          {dict.common.back}
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-2">
          {dict.privacy.title}
        </h1>
        <p className="text-white/40 text-sm mb-12">
          {dict.privacy.lastUpdated}
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.overview.h}
            </h2>
            <p>{s.overview.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.notCollect.h}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {s.notCollect.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.stored.h}
            </h2>
            <p className="mb-3">{s.stored.intro}</p>
            <ul className="list-disc list-inside space-y-2">
              {s.stored.items.map((it) => (
                <li key={it.k}>
                  <strong className="text-white/90">{it.k}</strong>{" "}
                  {it.v}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">{s.relay.h}</h2>
            <p>{s.relay.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.providers.h}
            </h2>
            <p className="mb-3">{s.providers.intro}</p>
            <ul className="list-disc list-inside space-y-2">
              {s.providers.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.retention.h}
            </h2>
            <p>{s.retention.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">{s.iap.h}</h2>
            <p>{s.iap.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.network.h}
            </h2>
            <p>{s.network.p}</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              {s.children.h}
            </h2>
            <p>{s.children.p}</p>
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
