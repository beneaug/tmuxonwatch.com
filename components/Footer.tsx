export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 py-8 text-[11px] font-mono uppercase tracking-[0.18em] text-white/30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {year} tmuxonwatch</span>
        <nav className="flex items-center gap-5">
          <a href="/privacy" className="hover:text-white/70 transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white/70 transition-colors">
            Terms
          </a>
          <a href="/support" className="hover:text-white/70 transition-colors">
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}
