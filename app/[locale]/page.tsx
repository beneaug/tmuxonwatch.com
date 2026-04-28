import Hero from "@/components/Hero";
import InstallBlock from "@/components/InstallBlock";
import WatchScrollSequence from "@/components/WatchScrollSequence";
import LockInScrollSequence from "@/components/LockInScrollSequence";
import LegalDisclosure from "@/components/LegalDisclosure";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

// Hero rides --seq-approach (set by WatchScrollSequence) — fades + lifts
// as the user scrolls into the watch pin.
const heroFrameStyle = {
  opacity: "calc(1 - var(--seq-approach, 0))",
  transform: "translate3d(0, calc(var(--seq-approach, 0) * -160px), 0)",
  willChange: "opacity, transform",
};

// InstallBlock sits between two pinned sequences. It rises into view as
// the watch sequence releases (--seq-exit) AND whisks itself away as the
// user scrolls toward the lock-in pin (--lockin-approach). Multiplying
// the two opacities gives a clean appear → linger → disappear arc.
const middleFrameStyle = {
  opacity:
    "calc(var(--seq-exit, 1) * (1 - var(--lockin-approach, 0)))",
  transform:
    "translate3d(0, calc((1 - var(--seq-exit, 1)) * 200px + var(--lockin-approach, 0) * -160px), 0)",
  willChange: "opacity, transform",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = getLocale(raw);
  const dict = getDictionary(locale);

  return (
    <main className="overflow-x-clip">
      <div style={heroFrameStyle}>
        <Hero dict={dict.hero} />
      </div>
      <WatchScrollSequence dict={dict.watchSequence} />
      <div style={middleFrameStyle}>
        <InstallBlock dict={dict.install} />
      </div>
      <LockInScrollSequence dict={dict.lockin} />
      <LegalDisclosure
        currentLocale={locale}
        common={dict.common}
        languageMenu={dict.languageMenu}
      />
    </main>
  );
}
