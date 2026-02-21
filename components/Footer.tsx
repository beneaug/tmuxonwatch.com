import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <p className="text-white/30 text-sm italic">
          Built for developers who can&apos;t sit still.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm">
          <a
            href="https://github.com/beneaug/TerminalPulse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-white/10">|</span>
          <a
            href="/support"
            className="text-white/40 hover:text-white transition-colors"
          >
            Support
          </a>
          <span className="text-white/10">|</span>
          <a
            href="/privacy"
            className="text-white/40 hover:text-white transition-colors"
          >
            Privacy
          </a>
          <span className="text-white/10">|</span>
          <a
            href="/terms"
            className="text-white/40 hover:text-white transition-colors"
          >
            Terms
          </a>
        </div>

        <div className="pt-4">
          <Image
            src="/logo.svg"
            alt="tmux on watch"
            width={180}
            height={72}
            className="h-auto mx-auto opacity-20"
          />
        </div>
      </div>
    </footer>
  );
}
