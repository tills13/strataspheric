import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  COOKIE_NAME,
  formatCookie,
  getServerCookieConfig,
} from "../../../../auth/cookies";
import { validateAndParseJwt } from "../../../../auth/jwt";
import { Config } from "../../../../auth/types";
import { protocol, tld } from "../../../../constants";
import { getUserById } from "../../../../data/users/getUser";

export async function GET(req: NextRequest) {
  const adminSessionValue = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!adminSessionValue) {
    return new NextResponse("No admin session", { status: 400 });
  }

  const config: Pick<Config, "key"> = {
    key: JSON.parse(process.env.AUTH_KEY || "{}"),
  };

  const { payload } = await validateAndParseJwt(
    config as Config,
    adminSessionValue,
  );

  const dbUser = await getUserById(payload.user.id);
  if (!dbUser || dbUser.isAdmin !== 1) {
    return new NextResponse("Invalid admin session", { status: 403 });
  }

  const cookieConfig = getServerCookieConfig();
  const redirectUrl = `${protocol}//${tld}/admin/users`;

  const response = NextResponse.redirect(redirectUrl);
  response.headers.append(
    "set-cookie",
    formatCookie(COOKIE_NAME, cookieConfig, adminSessionValue),
  );
  response.headers.append(
    "set-cookie",
    formatCookie(ADMIN_COOKIE_NAME, cookieConfig, "", 0),
  );

  return response;
}
