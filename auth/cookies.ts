import { VALIDITY_PERIOD } from "./jwt";
import { CookieConfig } from "./types";

export const COOKIE_NAME = "strataspheric.session";
export const ADMIN_COOKIE_NAME = "strataspheric.admin-session";

const isDev = process.env.NODE_ENV === "development";

export function getServerCookieConfig(): {
  httpOnly: boolean;
  sameSite: "lax";
  path: string;
  domain?: string;
  secure: boolean;
  maxAge: number;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    ...(isDev
      ? { domain: ".strataspheric.local" }
      : { domain: ".strataspheric.app" }),
    secure: !isDev,
    maxAge: VALIDITY_PERIOD / 1000,
  };
}

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
  return formatCookie(COOKIE_NAME, config, data, maxAge);
}

export function formatCookie(
  name: string,
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
    `${name}=${data}`,
    `Path=${path}`,
    domain && `Domain=${domain}`,
    httpOnly && `HttpOnly`,
    sameSite && `SameSite=${sameSite === "lax" ? "Lax" : "Strict"}`,
    secure && `Secure`,
    maxAge != null && `Max-Age=${maxAge}`,
  ]
    .filter(Boolean)
    .join(";");
}
