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
          Last updated: February 28, 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-white mb-3">Overview</h2>
            <p>
              tmux on watch (&quot;TerminalPulse&quot;) is primarily self-hosted:
              terminal output is streamed from your own computer to your iPhone
              and Apple Watch. Optional remote push alerts use a cloud relay path
              described below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Data We Do Not Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>We do not require account registration</li>
              <li>We do not include advertising SDKs</li>
              <li>We do not include cross-app tracking SDKs</li>
              <li>We do not sell personal data</li>
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
                  Remote push configuration
                </strong>{" "}
                (notify token and relay endpoint URLs, if configured) &mdash;
                stored in UserDefaults
              </li>
              <li>
                <strong className="text-white/90">
                  Cached terminal output
                </strong>{" "}
                &mdash; the most recent screen capture, stored locally for
                instant display on launch
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Optional Remote Push Relay
            </h2>
            <p>
              If you enable Remote Push in app settings, the app may register
              your APNs device token with the tmux on watch relay using your
              notify token. Webhook notifications sent to the relay include a
              title and message and are forwarded to Apple Push Notification
              service (APNs) for delivery.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Service Providers
            </h2>
            <p className="mb-3">
              When Remote Push is enabled, data may be processed by:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Apple (APNs) for notification delivery</li>
              <li>Vercel for relay hosting/runtime</li>
              <li>Upstash Redis for device-token mapping storage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              Retention and Deletion
            </h2>
            <p>
              Relay device-token mappings are stored with a rolling expiration
              and currently expire after up to 120 days without refresh.
              Disabling Remote Push triggers an unregister request from the app.
              APNs may retain delivery metadata under Apple&apos;s policies.
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
              Network Communication
            </h2>
            <p>
              The core terminal stream communicates with the TerminalPulse server
              that you install and run on your own computer. If you choose to
              route that traffic through your own VPN or private overlay
              network, transport security depends on that network&apos;s
              configuration.
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
