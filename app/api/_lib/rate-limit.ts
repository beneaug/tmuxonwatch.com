import { Redis } from "@upstash/redis";

export type RateLimitCheck = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<RateLimitCheck> {
  const redis = Redis.fromEnv();
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  if (count <= maxRequests) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const ttl = await redis.ttl(key);
  const retryAfterSeconds = Number.isFinite(ttl) && ttl > 0 ? ttl : windowSeconds;
  return {
    allowed: false,
    retryAfterSeconds,
  };
}
