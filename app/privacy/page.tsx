import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — tmux on watch",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          &larr; Home
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: February 20, 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-white mb-3">Overview</h2>
            <p>
              tmux on watch (&quot;TerminalPulse&quot;) is designed with privacy
              as a core principle. The app streams terminal output from your own
              computer to your own devices over your local network. We do not
              operate servers, collect telemetry, or track usage.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Data We Do Not Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>We do not collect personal information</li>
              <li>We do not collect analytics or usage data</li>
              <li>We do not use third-party tracking or advertising SDKs</li>
              <li>We do not share any data with third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Data Stored on Your Devices
            </h2>
            <p className="mb-3">
              The app stores the following data locally on your iPhone and Apple
              Watch:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white/90">
                  Server connection details
                </strong>{" "}
                (URL and authentication token) &mdash; stored in the iOS
                Keychain
              </li>
              <li>
                <strong className="text-white/90">App preferences</strong>{" "}
                (font size, color theme, poll interval) &mdash; stored in
                UserDefaults
              </li>
              <li>
                <strong className="text-white/90">
                  Cached terminal output
                </strong>{" "}
                &mdash; the most recent screen capture, stored locally for
                instant display on launch
              </li>
            </ul>
            <p className="mt-3">
              All data remains on your devices and is never transmitted to us or
              any third party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Network Communication
            </h2>
            <p>
              The app communicates only with the TerminalPulse server that you
              install and run on your own computer. All communication is
              authenticated with a token generated during setup. If you use
              Tailscale for remote access, traffic is encrypted end-to-end by
              Tailscale&apos;s WireGuard implementation. We have no access to
              your terminal data at any point.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              In-App Purchases
            </h2>
            <p>
              The app offers an optional in-app purchase processed entirely by
              Apple through the App Store. We do not collect or store any payment
              information. Purchase status is verified locally via
              StoreKit&nbsp;2.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Children&apos;s Privacy
            </h2>
            <p>
              The app is not directed at children under 13 and does not
              knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Changes to This Policy
            </h2>
            <p>
              If we update this policy, we will post the revised version at this
              URL with an updated date. Continued use of the app constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">Contact</h2>
            <p>
              Questions about this policy? Email{" "}
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
      <Footer />
    </>
  );
}
