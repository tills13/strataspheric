import { getJwtFromCookies } from "./cookies";
import { Config } from "./types";

// 24 hour validity
export const VALIDITY_PERIOD = 60 * 60 * 24 * 1000;

export function getKey(config: Config) {
  return crypto.subtle.importKey(
    "jwk",
    config.key,
    {
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    false,
    ["sign", "verify"],
  );
}

export async function buildJwt(key: CryptoKey, payload: unknown) {
  const header = { alg: "HS256", typ: "JWT" };

  const compositePayload =
    Buffer.from(JSON.stringify(header)).toString("base64url") +
    "." +
    Buffer.from(JSON.stringify(payload)).toString("base64url");

  const signature = await crypto.subtle.sign(
    { name: "HMAC" },
    key,
    // todo use Buffer.from instead
    new TextEncoder().encode(compositePayload),
  );

  return compositePayload + "." + Buffer.from(signature).toString("base64url");
}

export function parseJwt(rawJwt: string) {
  const [header, payload, sig] = rawJwt.split(".");

  return {
    rawHeader: header,
    rawPayload: payload,
    header: JSON.parse(Buffer.from(header, "base64url").toString("ascii")),
    payload: JSON.parse(Buffer.from(payload, "base64url").toString("ascii")),
    sig: Buffer.from(sig, "base64url"),
  };
}

export async function readJwtFromRequest(config: Config, req: Request) {
  const rawJwt = getJwtFromCookies(req.headers.get("cookie"));

  if (!rawJwt) {
    throw new Error("jwt missing");
  }

  const key = await getKey(config);
  const jwtIsValid = await verifyJwt(key, rawJwt);

  if (!jwtIsValid) {
    throw new Error("jwt is invalid");
  }

  return parseJwt(rawJwt);
}

function verifyJwt(key: CryptoKey, rawJwt: string) {
  const { rawHeader, rawPayload, sig } = parseJwt(rawJwt);

  return crypto.subtle.verify(
    { name: "HMAC" },
    key,
    sig,
    Buffer.from(`${rawHeader}.${rawPayload}`),
  );
}
