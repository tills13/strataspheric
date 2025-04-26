import { VALIDITY_PERIOD } from "./jwt";
import { Config } from "./types";

const COOKIE_NAME = "strataspheric.session";

export function getJwtFromCookies(
  rawCookieHeader: string | undefined | null,
): string | undefined {
  return rawCookieHeader?.split(`${COOKIE_NAME}=`)[1]?.split(";")[0];
}

export function formatJwtCookie(
  config: Config,
  data: unknown,
  maxAge = VALIDITY_PERIOD,
) {
  const path = config.cookies?.path ?? "/";
  const domain = config.cookies?.domain;
  const httpOnly = !!config.cookies?.httpOnly;
  const sameSite = config.cookies?.sameSite;
  const secure = !!config.cookies?.secure;

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
