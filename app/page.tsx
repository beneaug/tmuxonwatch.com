import Hero from "@/components/Hero";
import InstallBlock from "@/components/InstallBlock";
import WatchScrollSequence from "@/components/WatchScrollSequence";
import LockInScrollSequence from "@/components/LockInScrollSequence";
import LegalDisclosure from "@/components/LegalDisclosure";

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

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <div style={heroFrameStyle}>
        <Hero />
      </div>
      <WatchScrollSequence />
      <div style={middleFrameStyle}>
        <InstallBlock />
      </div>
      <LockInScrollSequence />
      <LegalDisclosure />
    </main>
  );
}
