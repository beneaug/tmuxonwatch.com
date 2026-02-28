This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Webhook Push Relay

This repo now includes:

- `POST /api/push/register` to bind an APNs device token to a `notifyToken`
- `POST /api/push/unregister` to remove an APNs device token binding
- `POST /api/webhook` to fan out `Authorization: Bearer <notifyToken>` + `{title,message}` to registered devices

Security posture of the relay:

- Notification routing token is never used as a Redis key directly (SHA-256 digest keying).
- Device-token mappings have a finite TTL (120 days) and are refreshed by re-registration.
- Strict request size caps and per-IP/per-token rate limits on all push endpoints.
- Webhook responses avoid per-device internals to reduce token enumeration and data leakage.
- APNs payload contains only notification fields (no routing token echo).
- Endpoints accept `Authorization: Bearer <notifyToken>` so token does not need to live in JSON body.

Required environment variables:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `APNS_KEY_ID`
- `APNS_TEAM_ID`
- `APNS_PRIVATE_KEY` (full `.p8` content; escaped newlines are supported)
- `APNS_BUNDLE_ID` (for this app: `com.augustbenedikt.TerminalPulse`)
- `APNS_ENV` (`production` for TestFlight/App Store; `sandbox` for local dev builds)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
