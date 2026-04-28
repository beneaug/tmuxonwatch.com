import { type Locale, defaultLocale, isLocale } from "./config";

// All visible strings on the marketing site live here. Keep the EN copy as
// the source of truth for shape; JA mirrors it with natural, polite-form
// (です/ます) Japanese — not a literal translation.
const dictionaries = {
  en: {
    meta: {
      title: "tmux on watch — Live terminal on your wrist",
      description:
        "Stream tmux output to Apple Watch with full ANSI color support. Get notifications when long-running commands finish. One command to set up.",
      ogTitle: "tmux on watch — Live terminal on your wrist",
      ogDescription:
        "Stream tmux output to Apple Watch with full ANSI color support. One command to set up.",
      twitterTitle: "tmux on watch",
      twitterDescription:
        "Live terminal on your wrist. Full ANSI color. One command to set up.",
      siteName: "tmux on watch",
    },
    common: {
      home: "Home",
      back: "← Home",
      privacy: "Privacy",
      terms: "Terms",
      support: "Support",
      lastUpdated: "Last updated",
      contact: "Contact",
    },
    languageMenu: {
      label: "Language",
      english: "English",
      japanese: "日本語",
      system: "System",
      open: "Show menu",
      close: "Hide menu",
    },
    hero: {
      logoAlt: "tmux on watch",
      headlineLine1: "Your terminal.",
      headlineLine2: "On your wrist.",
      subhead:
        "Live tmux output on Apple Watch. ANSI colors. Instant notifications. One command to set up.",
      appStoreSmall: "Download on the",
      appStoreLarge: "App Store",
      appStoreAria: "Download on the App Store",
      installServer: "Install server",
      github: "GitHub",
    },
    watchSequence: {
      ariaLabel: "Apple Watch running tmux on watch",
      headline1: "Effortlessly elegant.",
      headline2: "Always a glance away.",
    },
    install: {
      eyebrow: "Install",
      heading: "Ready? One command.",
      copied: "Copied to clipboard",
      note1: "Works on local network and trusted VPN setups",
      note2: "Requires macOS, Python 3.10+, and tmux",
    },
    lockin: {
      ariaLabel: "Lock in — tmuxonwatch on Apple Watch",
      headline: "tokenmax from anywhere.",
      appStoreSmall: "Download on the",
      appStoreLarge: "App Store",
      appStoreAria: "Download on the App Store",
    },
    footer: {
      copyright: "tmuxonwatch",
      privacy: "Privacy",
      terms: "Terms",
      support: "Support",
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: February 28, 2026",
      sections: {
        overview: {
          h: "Overview",
          p: 'tmux on watch ("TerminalPulse") is primarily self-hosted: terminal output is streamed from your own computer to your iPhone and Apple Watch. Optional remote push alerts use a cloud relay path described below.',
        },
        notCollect: {
          h: "Data We Do Not Collect",
          items: [
            "We do not require account registration",
            "We do not include advertising SDKs",
            "We do not include cross-app tracking SDKs",
            "We do not sell personal data",
          ],
        },
        stored: {
          h: "Data Stored on Your Devices",
          intro:
            "The app stores the following data locally on your iPhone and Apple Watch:",
          items: [
            {
              k: "Server connection details",
              v: "(URL and authentication token) — stored in the iOS Keychain",
            },
            {
              k: "App preferences",
              v: "(font size, color theme, poll interval) — stored in UserDefaults",
            },
            {
              k: "Remote push configuration",
              v: "(notify token and relay endpoint URLs, if configured) — stored in UserDefaults",
            },
            {
              k: "Cached terminal output",
              v: "— the most recent screen capture, stored locally for instant display on launch",
            },
          ],
        },
        relay: {
          h: "Optional Remote Push Relay",
          p: "If you enable Remote Push in app settings, the app may register your APNs device token with the tmux on watch relay using your notify token. Webhook notifications sent to the relay include a title and message and are forwarded to Apple Push Notification service (APNs) for delivery.",
        },
        providers: {
          h: "Service Providers",
          intro: "When Remote Push is enabled, data may be processed by:",
          items: [
            "Apple (APNs) for notification delivery",
            "Vercel for relay hosting/runtime",
            "Upstash Redis for device-token mapping storage",
          ],
        },
        retention: {
          h: "Retention and Deletion",
          p: "Relay device-token mappings are stored with a rolling expiration and currently expire after up to 120 days without refresh. Disabling Remote Push triggers an unregister request from the app. APNs may retain delivery metadata under Apple's policies.",
        },
        iap: {
          h: "In-App Purchases",
          p: "The app offers an optional in-app purchase processed entirely by Apple through the App Store. We do not collect or store any payment information. Purchase status is verified locally via StoreKit 2.",
        },
        network: {
          h: "Network Communication",
          p: "The core terminal stream communicates with the TerminalPulse server that you install and run on your own computer. If you choose to route that traffic through your own VPN or private overlay network, transport security depends on that network's configuration.",
        },
        children: {
          h: "Children's Privacy",
          p: "The app is not directed at children under 13 and does not knowingly collect information from children.",
        },
        changes: {
          h: "Changes to This Policy",
          p: "If we update this policy, we will post the revised version at this URL with an updated date. Continued use of the app constitutes acceptance of the updated policy.",
        },
        contact: {
          h: "Contact",
          intro: "Questions about this policy? Email ",
        },
      },
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last updated: February 28, 2026",
      sections: {
        accept: {
          h: "1. Acceptance",
          p: 'By downloading or using tmux on watch ("TerminalPulse"), you agree to these terms. If you do not agree, do not use the app.',
        },
        desc: {
          h: "2. Description of Service",
          p: "tmux on watch streams terminal output from a self-hosted server on your computer to the companion iOS and watchOS apps. Optional Remote Push can use a hosted relay path for webhook-triggered alerts. You are responsible for installing, configuring, and securing the server component on your own hardware.",
        },
        selfHosted: {
          h: "3. Self-Hosted Server",
          intro:
            "The server runs on your machine under your control. You are responsible for:",
          items: [
            "Keeping your authentication token secure",
            "Running the server on trusted networks only",
            "Using trusted private networking if you need to reach the server outside your local environment, rather than exposing it to the public internet",
            "Any commands sent to tmux through the app's input features",
          ],
          outro:
            "If you enable Remote Push, notification metadata may be processed by third-party providers (including Apple APNs, hosting/runtime, and data storage providers) as described in the Privacy Policy.",
        },
        iap: {
          h: "4. In-App Purchases",
          p: "The app offers an optional one-time purchase to unlock additional features. Purchases are processed by Apple and subject to Apple's App Store terms. Refund requests should be directed to Apple.",
        },
        ip: {
          h: "5. Intellectual Property",
          p: "The app and its original content are the property of tmux on watch and are protected by applicable copyright and trademark law. The source code repository is available under the Apache-2.0 license. Trademarks, logos, and brand assets (including the names tmuxonwatch and TerminalPulse) are reserved.",
        },
        warranty: {
          h: "6. Disclaimer of Warranties",
          p: 'The app is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the app will be error-free, uninterrupted, or compatible with all system configurations. Terminal output display depends on your tmux setup and network conditions.',
        },
        liability: {
          h: "7. Limitation of Liability",
          p: "To the maximum extent permitted by law, tmux on watch and its developer shall not be liable for any indirect, incidental, or consequential damages arising from use of the app, including but not limited to unintended commands sent to tmux sessions, data loss, outages of third-party notification providers, or security incidents related to server misconfiguration.",
        },
        term: {
          h: "8. Termination",
          p: "You may stop using the app at any time by deleting it from your devices and stopping the server. We reserve the right to modify or discontinue the app at any time.",
        },
        changes: {
          h: "9. Changes to These Terms",
          p: "We may update these terms from time to time. The revised version will be posted at this URL with an updated date. Continued use of the app constitutes acceptance of the updated terms.",
        },
        contact: {
          h: "10. Contact",
          intro: "Questions? Email ",
        },
      },
    },
    support: {
      title: "Support",
      meta: { title: "Support — tmux on watch" },
      privacyMeta: { title: "Privacy Policy — tmux on watch" },
      termsMeta: { title: "Terms of Service — tmux on watch" },
      email: {
        h: "Email",
        intro: "For bugs, feature requests, or general questions:",
      },
      github: {
        h: "GitHub",
        intro: "Report issues, view source, or contribute:",
      },
      common: {
        h: "Common Issues",
        items: [
          {
            h: 'App shows "Disconnected"',
            before:
              "Make sure the tmuxonwatch server is running on your Mac and your phone can reach it. You can verify the server locally with ",
            after:
              ". If needed, run the install command again.",
          },
          {
            h: "QR code won't scan",
            before:
              "Re-run the install command to print a fresh QR code. Make sure the terminal window is large enough and the code is fully visible.",
            after: "",
          },
          {
            h: "Watch not receiving data",
            before:
              "The watch receives data through your iPhone via WatchConnectivity. Make sure the iPhone app is connected to the server and the watch is paired and nearby.",
            after: "",
          },
          {
            h: "Server won't start",
            before:
              "Check that tmux is installed and a session is running. The server requires Python 3.10+ and tmux. Check logs at ",
            after: " to see error output.",
          },
          {
            h: "Reinstall or update",
            before:
              "Run the install command again to update to the latest version. Your configuration and token are preserved.",
            after: "",
          },
        ],
      },
    },
  },
  ja: {
    meta: {
      title: "tmuxonwatch — 手首にライブターミナル",
      description:
        "Apple Watchへtmuxの出力をフルANSIカラーでストリーミング。長時間コマンドの完了を通知でお知らせ。たったひとつのコマンドでセットアップ完了です。",
      ogTitle: "tmuxonwatch — 手首にライブターミナル",
      ogDescription:
        "Apple Watchへtmuxの出力をフルANSIカラーでストリーミング。たったひとつのコマンドでセットアップ完了。",
      twitterTitle: "tmuxonwatch",
      twitterDescription:
        "手首にライブターミナル。フルANSIカラー対応。たったひとつのコマンドでセットアップ完了。",
      siteName: "tmuxonwatch",
    },
    common: {
      home: "ホーム",
      back: "← ホームへ戻る",
      privacy: "プライバシー",
      terms: "利用規約",
      support: "サポート",
      lastUpdated: "最終更新日",
      contact: "お問い合わせ",
    },
    languageMenu: {
      label: "言語",
      english: "English",
      japanese: "日本語",
      system: "システム設定に従う",
      open: "メニューを開く",
      close: "メニューを閉じる",
    },
    hero: {
      logoAlt: "tmuxonwatch",
      headlineLine1: "あなたのターミナルを、",
      headlineLine2: "手首の上に。",
      subhead:
        "iPhoneとApple Watchで、Macのtmux出力をリアルタイムに。ANSIカラーにフル対応。コマンドの完了は通知ですぐにお知らせ。セットアップはたった一行です。",
      appStoreSmall: "ダウンロードはこちら",
      appStoreLarge: "App Store",
      appStoreAria: "App Storeでダウンロード",
      installServer: "サーバーをインストール",
      github: "GitHub",
    },
    watchSequence: {
      ariaLabel: "Apple Watchで動くtmuxonwatch",
      headline1: "驚くほど、軽やか。",
      headline2: "視線をやれば、いつでもそこに。",
    },
    install: {
      eyebrow: "インストール",
      heading: "準備はいいですか？コマンドはひとつだけ。",
      copied: "クリップボードにコピーしました",
      note1: "ローカルネットワークおよび信頼できるVPN環境で動作します",
      note2: "macOS、Python 3.10以上、tmuxが必要です",
    },
    lockin: {
      ariaLabel: "Apple Watchで動くtmuxonwatch",
      headline: "どこからでも、最大化を。",
      appStoreSmall: "ダウンロードはこちら",
      appStoreLarge: "App Store",
      appStoreAria: "App Storeでダウンロード",
    },
    footer: {
      copyright: "tmuxonwatch",
      privacy: "プライバシー",
      terms: "利用規約",
      support: "サポート",
    },
    privacy: {
      title: "プライバシーポリシー",
      lastUpdated: "最終更新日：2026年2月28日",
      sections: {
        overview: {
          h: "概要",
          p: "tmuxonwatch（「TerminalPulse」）は、基本的にセルフホスト型のサービスです。ターミナルの出力は、お客様ご自身のコンピュータからiPhoneおよびApple Watchへと直接ストリーミングされます。任意でご利用いただけるリモートプッシュ通知については、後述のクラウドリレー経由となります。",
        },
        notCollect: {
          h: "当アプリが収集しない情報",
          items: [
            "アカウント登録は一切不要です",
            "広告SDKは組み込まれていません",
            "アプリ間トラッキングSDKは組み込まれていません",
            "個人データの販売は行いません",
          ],
        },
        stored: {
          h: "デバイス内に保存されるデータ",
          intro:
            "本アプリは、お客様のiPhoneおよびApple Watch内に以下のデータをローカル保存します：",
          items: [
            {
              k: "サーバー接続情報",
              v: "（URLと認証トークン）— iOSキーチェーンに保存されます",
            },
            {
              k: "アプリの設定",
              v: "（フォントサイズ、カラーテーマ、ポーリング間隔）— UserDefaultsに保存されます",
            },
            {
              k: "リモートプッシュの設定",
              v: "（通知トークン、リレーエンドポイントのURL／設定時のみ）— UserDefaultsに保存されます",
            },
            {
              k: "ターミナル出力のキャッシュ",
              v: "— 最新の画面キャプチャをローカル保存し、起動時に即座に表示します",
            },
          ],
        },
        relay: {
          h: "任意のリモートプッシュリレー",
          p: "アプリ設定でリモートプッシュを有効にすると、お客様の通知トークンを用いて、APNsデバイストークンがtmuxonwatchリレーに登録される場合があります。リレー宛てに送信されたWebhook通知は、タイトルとメッセージを含み、Apple Push Notificationサービス（APNs）経由で配信されます。",
        },
        providers: {
          h: "サービス提供者",
          intro:
            "リモートプッシュをご利用の際は、以下の提供者によりデータが処理される場合があります：",
          items: [
            "Apple（APNs）— 通知の配信",
            "Vercel — リレーのホスティングおよび実行環境",
            "Upstash Redis — デバイストークン対応情報の保存",
          ],
        },
        retention: {
          h: "保持と削除",
          p: "リレー上のデバイストークン情報はローリング有効期限で管理されており、現時点では更新がない場合に最大120日で失効します。リモートプッシュを無効化すると、アプリから登録解除のリクエストが送信されます。なお、配信メタデータについては、Appleのポリシーに従ってAPNs側で保持される場合があります。",
        },
        iap: {
          h: "アプリ内課金",
          p: "本アプリでは、App Store経由でAppleが処理する任意のアプリ内課金をご用意しています。当方では決済情報を一切収集・保存いたしません。購入状況はStoreKit 2を用いて端末内で検証されます。",
        },
        network: {
          h: "ネットワーク通信",
          p: "ターミナルのストリーム通信は、お客様ご自身のコンピュータにインストール・実行いただくTerminalPulseサーバーとの間で行われます。VPNやプライベートオーバーレイネットワーク経由で通信する場合、その通信のセキュリティは当該ネットワークの構成に依存します。",
        },
        children: {
          h: "お子様のプライバシー",
          p: "本アプリは13歳未満のお子様を対象としておらず、お子様から意図的に情報を収集することはありません。",
        },
        changes: {
          h: "本ポリシーの変更について",
          p: "本ポリシーを更新する場合、改訂版を本URLに更新日とともに掲載します。改訂後も本アプリのご利用を継続された場合、更新内容にご同意いただいたものとみなします。",
        },
        contact: {
          h: "お問い合わせ",
          intro: "本ポリシーに関するご質問は、こちらまでメールでお寄せください：",
        },
      },
    },
    terms: {
      title: "利用規約",
      lastUpdated: "最終更新日：2026年2月28日",
      sections: {
        accept: {
          h: "1. 同意について",
          p: "tmuxonwatch（「TerminalPulse」）をダウンロードまたはご利用いただいた時点で、本規約に同意いただいたものとみなします。本規約にご同意いただけない場合は、本アプリをご利用にならないでください。",
        },
        desc: {
          h: "2. サービスの内容",
          p: "tmuxonwatchは、お客様のコンピュータ上でセルフホストするサーバーから、対応するiOSおよびwatchOSアプリへターミナル出力をストリーミングするサービスです。任意のリモートプッシュ機能では、Webhook起点のアラート配信のためにホスティング型のリレー経路を利用できます。サーバーコンポーネントの導入・設定・セキュリティ管理は、お客様ご自身のハードウェア上での責任となります。",
        },
        selfHosted: {
          h: "3. セルフホスト型サーバーについて",
          intro:
            "サーバーはお客様の管理下にある端末上で動作します。以下の事項についてはお客様の責任となります：",
          items: [
            "認証トークンを安全に管理すること",
            "信頼できるネットワーク上でのみサーバーを運用すること",
            "ローカル環境外からサーバーに接続する必要がある場合、公開インターネットに直接公開せず、信頼できるプライベートネットワークを利用すること",
            "アプリの入力機能を通じてtmuxへ送信されるすべてのコマンドについて",
          ],
          outro:
            "リモートプッシュを有効にされた場合、通知メタデータは、プライバシーポリシーに記載のとおり、Apple APNsをはじめとするホスティング・実行環境やデータストレージの提供者など、第三者のサービス提供者によって処理される場合があります。",
        },
        iap: {
          h: "4. アプリ内課金",
          p: "本アプリでは、追加機能をアンロックする任意の買い切り型アプリ内課金をご用意しています。決済はAppleにより処理され、AppleのApp Store規約が適用されます。返金のご請求はApple宛てにお願いいたします。",
        },
        ip: {
          h: "5. 知的財産",
          p: "本アプリおよびそのオリジナルコンテンツは、tmuxonwatchに帰属し、関連する著作権法および商標法により保護されています。ソースコードリポジトリはApache-2.0ライセンスのもとで公開されています。tmuxonwatchおよびTerminalPulseの名称をはじめとする商標、ロゴ、ブランド資産については、いずれも権利を留保いたします。",
        },
        warranty: {
          h: "6. 保証の否認",
          p: "本アプリは「現状有姿」で提供されるものであり、明示・黙示を問わず、いかなる保証もいたしません。エラーがないこと、中断のないこと、すべてのシステム構成と互換性があることを保証するものではありません。ターミナル出力の表示は、お客様のtmux環境やネットワーク状況に依存します。",
        },
        liability: {
          h: "7. 責任の制限",
          p: "適用法令で認められる最大限の範囲において、tmuxonwatchおよびその開発者は、本アプリのご利用に起因または関連して発生したいかなる間接的、付随的、または結果的損害（tmuxセッションへ意図せず送信されたコマンド、データの損失、第三者通知サービスの障害、サーバー設定不備に起因するセキュリティインシデントを含みますが、これらに限られません）についても、一切の責任を負いません。",
        },
        term: {
          h: "8. 終了について",
          p: "お客様は、デバイスからアプリを削除し、サーバーを停止することで、いつでも本アプリのご利用を終了いただけます。当方は、本アプリをいつでも変更または提供停止する権利を留保します。",
        },
        changes: {
          h: "9. 本規約の変更について",
          p: "本規約は随時更新される場合があります。改訂版は更新日とともに本URLに掲載されます。改訂後も本アプリのご利用を継続された場合、更新後の規約にご同意いただいたものとみなします。",
        },
        contact: {
          h: "10. お問い合わせ",
          intro: "ご質問はこちらまでメールでお寄せください：",
        },
      },
    },
    support: {
      title: "サポート",
      meta: { title: "サポート — tmuxonwatch" },
      privacyMeta: { title: "プライバシーポリシー — tmuxonwatch" },
      termsMeta: { title: "利用規約 — tmuxonwatch" },
      email: {
        h: "メール",
        intro: "不具合のご報告、機能のご要望、その他ご質問は次のアドレスへ：",
      },
      github: {
        h: "GitHub",
        intro: "Issueの報告、ソースコードの閲覧、貢献はこちらから：",
      },
      common: {
        h: "よくあるトラブル",
        items: [
          {
            h: "アプリに「未接続」と表示される",
            before:
              "Mac上でtmuxonwatchサーバーが起動しており、iPhoneから到達可能であることをご確認ください。サーバーの稼働は次のコマンドで確認できます：",
            after:
              "。必要に応じて、インストールコマンドを再実行してください。",
          },
          {
            h: "QRコードが読み取れない",
            before:
              "インストールコマンドを再実行して、新しいQRコードを表示してください。ターミナルウィンドウが十分に大きく、コードが完全に表示されていることをご確認ください。",
            after: "",
          },
          {
            h: "Watch側にデータが届かない",
            before:
              "Apple Watchへのデータ転送は、WatchConnectivityを介してiPhone経由で行われます。iPhone側のアプリがサーバーに接続されており、Apple Watchがペアリング済みかつ近くにあることをご確認ください。",
            after: "",
          },
          {
            h: "サーバーが起動しない",
            before:
              "tmuxがインストール済みで、セッションが起動しているかご確認ください。サーバーにはPython 3.10以上およびtmuxが必要です。エラー出力は次のログで確認できます：",
            after: "",
          },
          {
            h: "再インストール／アップデート",
            before:
              "インストールコマンドを再実行いただくことで、最新版にアップデートできます。設定とトークンはそのまま保持されます。",
            after: "",
          },
        ],
      },
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];

export function getDictionary(locale: string | undefined | null): Dictionary {
  const l = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[l] as Dictionary;
}

export function getLocale(locale: string | undefined | null): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}
