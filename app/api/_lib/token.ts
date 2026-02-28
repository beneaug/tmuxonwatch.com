import { createHash } from "node:crypto";

const NOTIFY_TOKEN_RE = /^[A-Za-z0-9_\-.~]{16,256}$/;

export function isValidNotifyToken(token: string): boolean {
  return NOTIFY_TOKEN_RE.test(token);
}

export function cleanNotifyToken(token: string | undefined | null): string {
  return (token ?? "").trim();
}

export function bearerTokenFromRequest(req: Request): string | null {
  const raw = req.headers.get("authorization")?.trim() ?? "";
  if (!raw) {
    return null;
  }
  const prefix = "bearer ";
  if (!raw.toLowerCase().startsWith(prefix)) {
    return null;
  }
  const token = raw.slice(prefix.length).trim();
  return token.length > 0 ? token : null;
}

export function notifyTokenDigest(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("base64url");
}
