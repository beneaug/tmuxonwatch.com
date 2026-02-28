export function isRequestTooLarge(req: Request, maxBytes: number): boolean {
  const raw = req.headers.get("content-length");
  if (!raw) {
    return false;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return true;
  }
  return parsed > maxBytes;
}

export function clientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) {
    return real;
  }
  return "unknown";
}

export function sanitizeNotificationText(input: string, maxLength: number): string {
  const cleaned = input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
  if (cleaned.length === 0) {
    return "";
  }
  return cleaned.slice(0, maxLength);
}
