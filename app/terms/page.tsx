import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — tmux on watch",
};

export default function TermsPage() {
  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          &larr; Home
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: February 25, 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              1. Acceptance
            </h2>
            <p>
              By downloading or using tmux on watch (&quot;TerminalPulse&quot;),
              you agree to these terms. If you do not agree, do not use the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              2. Description of Service
            </h2>
            <p>
              tmux on watch streams terminal output from a self-hosted server on
              your computer to the companion iOS and watchOS apps. You are
              responsible for installing, configuring, and securing the server
              component on your own hardware.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              3. Self-Hosted Server
            </h2>
            <p>
              The server runs on your machine under your control. You are
              responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Keeping your authentication token secure</li>
              <li>Running the server on trusted networks only</li>
              <li>
                Using Tailscale or another VPN for remote access rather than
                exposing the server to the public internet
              </li>
              <li>
                Any commands sent to tmux through the app&apos;s input features
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              4. In-App Purchases
            </h2>
            <p>
              The app offers an optional one-time purchase to unlock additional
              features. Purchases are processed by Apple and subject to
              Apple&apos;s App Store terms. Refund requests should be directed to
              Apple.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              5. Intellectual Property
            </h2>
            <p>
              The app and its original content are the property of tmux on watch
              and are protected by applicable copyright and trademark law. The
              source code repository is available under the Apache-2.0 license.
              Trademarks, logos, and brand assets (including the names
              tmuxonwatch and TerminalPulse) are reserved.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              6. Disclaimer of Warranties
            </h2>
            <p>
              The app is provided &quot;as is&quot; without warranties of any
              kind, express or implied. We do not guarantee that the app will be
              error-free, uninterrupted, or compatible with all system
              configurations. Terminal output display depends on your tmux setup
              and network conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, tmux on watch and its
              developer shall not be liable for any indirect, incidental, or
              consequential damages arising from use of the app, including but
              not limited to unintended commands sent to tmux sessions, data
              loss, or security incidents related to server misconfiguration.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              8. Termination
            </h2>
            <p>
              You may stop using the app at any time by deleting it from your
              devices and stopping the server. We reserve the right to modify or
              discontinue the app at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              9. Changes to These Terms
            </h2>
            <p>
              We may update these terms from time to time. The revised version
              will be posted at this URL with an updated date. Continued use of
              the app constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">
              10. Contact
            </h2>
            <p>
              Questions? Email{" "}
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
