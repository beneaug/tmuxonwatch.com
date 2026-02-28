import { NextResponse } from "next/server";

import { sendAPNSNotification } from "../_lib/apns";
import { checkRateLimit } from "../_lib/rate-limit";
import {
  clientIP,
  isRequestTooLarge,
  sanitizeNotificationText,
} from "../_lib/request";
import { listDeviceTokens, removeDeviceTokens } from "../_lib/store";
import {
  bearerTokenFromRequest,
  cleanNotifyToken,
  isValidNotifyToken,
  notifyTokenDigest,
} from "../_lib/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebhookBody = {
  token?: string;
  title?: string;
  message?: string;
};

function normalizeTitle(input: string | undefined): string {
  const value = sanitizeNotificationText(input ?? "", 120);
  return value.length > 0 ? value : "tmuxonwatch";
}

function normalizeMessage(input: string | undefined): string {
  const value = sanitizeNotificationText(input ?? "", 240);
  return value.length > 0 ? value : "Notification";
}

function shouldRemoveToken(status: number, reason?: string): boolean {
  if (status === 410) {
    return true;
  }
  return reason === "BadDeviceToken" || reason === "Unregistered";
}

export async function POST(req: Request) {
  if (isRequestTooLarge(req, 4096)) {
    return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 });
  }

  const ip = clientIP(req);
  const ipLimit = await checkRateLimit(`push:rl:webhook:ip:${ip}`, 180, 60);
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": `${ipLimit.retryAfterSeconds}` } }
    );
  }

  let body: WebhookBody;
  try {
    body = (await req.json()) as WebhookBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const notifyToken = cleanNotifyToken(
    bearerTokenFromRequest(req) ?? body.token
  );
  if (!isValidNotifyToken(notifyToken)) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 400 });
  }

  const tokenDigest = notifyTokenDigest(notifyToken);
  const tokenLimit = await checkRateLimit(
    `push:rl:webhook:token:${tokenDigest}`,
    360,
    60
  );
  if (!tokenLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": `${tokenLimit.retryAfterSeconds}` } }
    );
  }

  const title = normalizeTitle(body.title);
  const message = normalizeMessage(body.message);

  let deviceTokens: string[];
  try {
    deviceTokens = await listDeviceTokens(tokenDigest);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load devices";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  // Avoid token enumeration: unknown token behaves like accepted/no-op.
  if (deviceTokens.length === 0) {
    return NextResponse.json({ ok: true, delivered: 0, failed: 0 }, { status: 202 });
  }

  const results = await Promise.all(
    deviceTokens.map((deviceToken) =>
      sendAPNSNotification({
        deviceToken,
        title,
        message,
      })
    )
  );

  const delivered = results.filter((result) => result.ok).length;
  const failed = results.length - delivered;
  const staleTokens = results
    .filter((result) => shouldRemoveToken(result.status, result.reason))
    .map((result) => result.deviceToken);

  if (staleTokens.length > 0) {
    await removeDeviceTokens(tokenDigest, staleTokens);
  }

  return NextResponse.json(
    {
      ok: true,
      delivered,
      failed,
    },
    { status: delivered > 0 ? 200 : 202 }
  );
}
