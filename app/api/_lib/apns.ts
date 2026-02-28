import http2 from "node:http2";
import { SignJWT, importPKCS8 } from "jose";

type APNSHost = "api.push.apple.com" | "api.sandbox.push.apple.com";

export type APNSSendResult = {
  deviceToken: string;
  ok: boolean;
  status: number;
  reason?: string;
};

let cachedProviderJWT = "";
let cachedProviderJWTAt = 0;

function env(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function apnsHosts(): APNSHost[] {
  const configured = (process.env.APNS_ENV ?? "production").toLowerCase();
  if (configured === "sandbox") {
    return ["api.sandbox.push.apple.com", "api.push.apple.com"];
  }
  return ["api.push.apple.com", "api.sandbox.push.apple.com"];
}

async function providerJWT(): Promise<string> {
  const now = Date.now();
  if (cachedProviderJWT && now - cachedProviderJWTAt < 50 * 60 * 1000) {
    return cachedProviderJWT;
  }

  const keyId = env("APNS_KEY_ID");
  const teamId = env("APNS_TEAM_ID");
  const privateKey = env("APNS_PRIVATE_KEY").replace(/\\n/g, "\n");

  const signer = await importPKCS8(privateKey, "ES256");
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: keyId })
    .setIssuer(teamId)
    .setIssuedAt()
    .setExpirationTime("50m")
    .sign(signer);

  cachedProviderJWT = token;
  cachedProviderJWTAt = now;
  return token;
}

async function sendToHost(
  host: APNSHost,
  args: {
    deviceToken: string;
    title: string;
    message: string;
  }
): Promise<APNSSendResult> {
  const topic = env("APNS_BUNDLE_ID");
  const jwt = await providerJWT();

  const payload = JSON.stringify({
    aps: {
      alert: {
        title: args.title,
        body: args.message,
      },
      sound: "default",
    },
  });

  return await new Promise<APNSSendResult>((resolve) => {
    const client = http2.connect(`https://${host}`);
    const headers: Record<string, string> = {
      ":method": "POST",
      ":path": `/3/device/${args.deviceToken}`,
      authorization: `bearer ${jwt}`,
      "apns-topic": topic,
      "apns-push-type": "alert",
      "apns-priority": "10",
      "content-type": "application/json",
    };

    const request = client.request(headers);
    const chunks: Buffer[] = [];
    let status = 0;
    let settled = false;

    const resolveOnce = (result: APNSSendResult) => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(result);
    };

    client.on("error", (error) => {
      client.close();
      resolveOnce({
        deviceToken: args.deviceToken,
        ok: false,
        status: 0,
        reason: error.message,
      });
    });

    client.setTimeout(10_000, () => {
      request.close();
      client.close();
      resolveOnce({
        deviceToken: args.deviceToken,
        ok: false,
        status: 0,
        reason: "APNs connection timed out",
      });
    });

    request.setEncoding("utf8");
    request.on("response", (responseHeaders) => {
      const raw = responseHeaders[":status"];
      status = typeof raw === "number" ? raw : Number(raw ?? 0);
    });

    request.on("data", (chunk: string) => {
      chunks.push(Buffer.from(chunk));
    });

    request.on("error", (error) => {
      client.close();
      resolveOnce({
        deviceToken: args.deviceToken,
        ok: false,
        status: 0,
        reason: error.message,
      });
    });

    request.on("end", () => {
      client.close();
      const rawBody = Buffer.concat(chunks).toString("utf8");
      let reason = "";
      if (rawBody) {
        try {
          const parsed = JSON.parse(rawBody) as { reason?: string };
          reason = parsed.reason ?? rawBody;
        } catch {
          reason = rawBody;
        }
      }

      resolveOnce({
        deviceToken: args.deviceToken,
        ok: status === 200,
        status,
        reason,
      });
    });

    request.setTimeout(10_000, () => {
      request.close();
      client.close();
      resolveOnce({
        deviceToken: args.deviceToken,
        ok: false,
        status: 0,
        reason: "APNs request timed out",
      });
    });

    request.end(payload);
  });
}

function shouldRetryInOtherEnv(result: APNSSendResult): boolean {
  if (result.ok) {
    return false;
  }
  return result.reason === "BadDeviceToken" || result.reason === "DeviceTokenNotForTopic";
}

export async function sendAPNSNotification(args: {
  deviceToken: string;
  title: string;
  message: string;
}): Promise<APNSSendResult> {
  const hosts = apnsHosts();
  const firstResult = await sendToHost(hosts[0], args);
  if (!shouldRetryInOtherEnv(firstResult)) {
    return firstResult;
  }

  const secondResult = await sendToHost(hosts[1], args);
  return secondResult.ok ? secondResult : firstResult;
}
