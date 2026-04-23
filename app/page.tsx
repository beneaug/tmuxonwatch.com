import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import InstallBlock from "@/components/InstallBlock";
import Footer from "@/components/Footer";
import WatchScrollSequence from "@/components/WatchScrollSequence";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <WatchScrollSequence />
      <HowItWorks />
      <InstallBlock />
      <Footer />
    </main>
  );
}
