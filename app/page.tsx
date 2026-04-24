import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import InstallBlock from "@/components/InstallBlock";
import Footer from "@/components/Footer";
import WatchScrollSequence from "@/components/WatchScrollSequence";

// Hero fades + lifts as --seq-approach grows (user scrolls into watch anim).
// Everything below the sequence stays dark until --seq-exit ramps up after
// the pin releases, then rises into place. WatchScrollSequence owns those
// vars; fallbacks keep content visible when JS is paused.
const heroFrameStyle = {
  opacity: "calc(1 - var(--seq-approach, 0))",
  transform: "translate3d(0, calc(var(--seq-approach, 0) * -160px), 0)",
  willChange: "opacity, transform",
};

const postSequenceFrameStyle = {
  opacity: "var(--seq-exit, 1)",
  transform: "translate3d(0, calc((1 - var(--seq-exit, 1)) * 200px), 0)",
  willChange: "opacity, transform",
};

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <div style={heroFrameStyle}>
        <Hero />
      </div>
      <WatchScrollSequence />
      <div style={postSequenceFrameStyle}>
        <HowItWorks />
        <InstallBlock />
        <Footer />
      </div>
    </main>
  );
}
