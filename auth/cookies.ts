import { VALIDITY_PERIOD } from "./jwt";
import { CookieConfig } from "./types";

const COOKIE_NAME = "strataspheric.session";

export function getJwtFromCookies(
  rawCookieHeader: string | undefined | null,
): string | undefined {
  return rawCookieHeader?.split(`${COOKIE_NAME}=`)[1]?.split(";")[0];
}

export function formatJwtCookie(
  config: CookieConfig | undefined,
  data: unknown,
  maxAge = VALIDITY_PERIOD,
) {
  const path = config?.path ?? "/";
  const domain = config?.domain;
  const httpOnly = !!config?.httpOnly;
  const sameSite = config?.sameSite;
  const secure = !!config?.secure;

  return [
    `${COOKIE_NAME}=${data}`,
    `Path=${path}`,
    domain && `Domain=${domain}`,
    httpOnly && `HttpOnly`,
    sameSite && `SameSite=${sameSite === "lax" ? "Lax" : "Strict"}`,
    secure && `Secure`,
    maxAge && `Max-Age=${maxAge}`,
  ]
    .filter(Boolean)
    .join(";");
}
