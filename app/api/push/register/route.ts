import { NextResponse } from "next/server";

import { checkRateLimit } from "../../_lib/rate-limit";
import { clientIP, isRequestTooLarge } from "../../_lib/request";
import { registerDeviceToken } from "../../_lib/store";
import {
  bearerTokenFromRequest,
  cleanNotifyToken,
  isValidNotifyToken,
  notifyTokenDigest,
} from "../../_lib/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RegisterBody = {
  token?: string;
  deviceToken?: string;
};

function isValidDeviceToken(token: string): boolean {
  return /^[A-Fa-f0-9]{64,256}$/.test(token);
}

export async function POST(req: Request) {
  if (isRequestTooLarge(req, 4096)) {
    return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 });
  }

  const ip = clientIP(req);
  const ipLimit = await checkRateLimit(`push:rl:register:ip:${ip}`, 60, 10 * 60);
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": `${ipLimit.retryAfterSeconds}` } }
    );
  }

  let body: RegisterBody;
  try {
    body = (await req.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const notifyToken = cleanNotifyToken(
    bearerTokenFromRequest(req) ?? body.token
  );
  const deviceToken = body.deviceToken?.trim() ?? "";

  if (!isValidNotifyToken(notifyToken)) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 400 });
  }
  if (!isValidDeviceToken(deviceToken)) {
    return NextResponse.json({ ok: false, error: "Invalid device token" }, { status: 400 });
  }

  const tokenDigest = notifyTokenDigest(notifyToken);
  const tokenLimit = await checkRateLimit(
    `push:rl:register:token:${tokenDigest}`,
    240,
    60 * 60
  );
  if (!tokenLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": `${tokenLimit.retryAfterSeconds}` } }
    );
  }

  try {
    await registerDeviceToken(tokenDigest, deviceToken);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
