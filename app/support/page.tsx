import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support — tmux on watch",
};

export default function SupportPage() {
  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          &larr; Home
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-12">Support</h1>

        <div className="space-y-10">
          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-medium mb-3">Email</h2>
            <p className="text-white/60 mb-4">
              For bugs, feature requests, or general questions:
            </p>
            <a
              href="mailto:support@tmuxonwatch.com"
              className="text-green-400 hover:underline font-mono text-sm"
            >
              support@tmuxonwatch.com
            </a>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-medium mb-3">GitHub</h2>
            <p className="text-white/60 mb-4">
              Report issues, view source, or contribute:
            </p>
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
            <h2 className="text-lg font-medium mb-4">Common Issues</h2>
            <div className="space-y-6 text-white/70">
              <div>
                <h3 className="text-white/90 font-medium mb-1">
                  App shows &quot;Disconnected&quot;
                </h3>
                <p className="text-sm">
                  Make sure the TerminalPulse server is running on your computer
                  (<code className="text-green-400/80 bg-white/5 px-1.5 py-0.5 rounded text-xs">
                    tmuxonwatch status
                  </code>). Verify your phone is on the same network as the
                  server, or connected via Tailscale.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">
                  QR code won&apos;t scan
                </h3>
                <p className="text-sm">
                  Run{" "}
                  <code className="text-green-400/80 bg-white/5 px-1.5 py-0.5 rounded text-xs">
                    tmuxonwatch qr
                  </code>{" "}
                  to display a fresh QR code. Make sure the terminal window is
                  large enough for the code to render clearly.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">
                  Watch not receiving data
                </h3>
                <p className="text-sm">
                  The watch receives data through your iPhone via
                  WatchConnectivity. Make sure the iPhone app is connected to the
                  server and the watch is paired and nearby.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">
                  Server won&apos;t start
                </h3>
                <p className="text-sm">
                  Check that tmux is installed and a session is running. The
                  server requires Python 3.8+ and tmux. Run{" "}
                  <code className="text-green-400/80 bg-white/5 px-1.5 py-0.5 rounded text-xs">
                    tmuxonwatch logs
                  </code>{" "}
                  to see error output.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-medium mb-1">
                  Reinstall or update
                </h3>
                <p className="text-sm">
                  Run the install command again to update to the latest version.
                  Your configuration and token are preserved.
                </p>
                <code className="block mt-2 text-green-400/80 bg-white/5 px-3 py-2 rounded text-xs font-mono">
                  bash &lt;(curl -sSL tmuxonwatch.com/install)
                </code>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
