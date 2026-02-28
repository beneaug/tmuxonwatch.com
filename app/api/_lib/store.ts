import { Redis } from "@upstash/redis";

const DEVICE_TTL_SECONDS = 60 * 60 * 24 * 120;

function keyForTokenDigest(tokenDigest: string): string {
  return `push:devices:${tokenDigest}`;
}

export async function registerDeviceToken(
  notifyTokenDigest: string,
  deviceToken: string
): Promise<void> {
  const redis = Redis.fromEnv();
  const key = keyForTokenDigest(notifyTokenDigest);
  await redis.sadd(key, deviceToken);
  await redis.expire(key, DEVICE_TTL_SECONDS);
}

export async function listDeviceTokens(notifyTokenDigest: string): Promise<string[]> {
  const redis = Redis.fromEnv();
  const key = keyForTokenDigest(notifyTokenDigest);
  const raw = await redis.smembers(key);
  return raw.filter(
    (value): value is string => typeof value === "string" && value.length > 0
  );
}

export async function removeDeviceTokens(
  notifyTokenDigest: string,
  deviceTokens: string[]
): Promise<void> {
  const redis = Redis.fromEnv();
  if (deviceTokens.length === 0) {
    return;
  }
  const key = keyForTokenDigest(notifyTokenDigest);
  await redis.srem(key, ...deviceTokens);
}

export async function unregisterDeviceToken(
  notifyTokenDigest: string,
  deviceToken: string
): Promise<void> {
  const redis = Redis.fromEnv();
  const key = keyForTokenDigest(notifyTokenDigest);
  await redis.srem(key, deviceToken);
}
