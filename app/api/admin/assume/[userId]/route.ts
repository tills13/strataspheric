import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../../../../auth";
import {
  ADMIN_COOKIE_NAME,
  COOKIE_NAME,
  formatCookie,
  getJwtFromCookies,
  getServerCookieConfig,
} from "../../../../../auth/cookies";
import { VALIDITY_PERIOD, buildJwt, getKey } from "../../../../../auth/jwt";
import { Config } from "../../../../../auth/types";
import { protocol, tld } from "../../../../../constants";
import { getFullUserById } from "../../../../../data/users/getUser";
import { getUserStratas } from "../../../../../data/users/getUserStratas";

const authConfig = {
  key: JSON.parse(process.env.AUTH_KEY || "{}"),
} as Pick<Config, "key">;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { userId } = await params;
  const targetUser = await getFullUserById(userId);
  if (!targetUser) {
    return new NextResponse("User not found", { status: 404 });
  }

  if (targetUser.isAdmin === 1) {
    return new NextResponse("Cannot assume an admin user", { status: 403 });
  }

  const currentJwt = getJwtFromCookies(req.headers.get("cookie"));
  if (!currentJwt) {
    return new NextResponse("No session", { status: 401 });
  }

  const now = Date.now();
  const payload = {
    user: {
      id: targetUser.id,
      email: targetUser.email,
      name: targetUser.name,
    },
    iat: now,
    exp: now + VALIDITY_PERIOD,
  };

  const key = await getKey(authConfig as Config);
  const newJwt = await buildJwt(key, payload);
  const cookieConfig = getServerCookieConfig();

  const stratas = await getUserStratas(targetUser.id);
  const primaryStrata = stratas[0];
  const redirectUrl = primaryStrata
    ? `${protocol}//${primaryStrata.domain}/dashboard`
    : `${protocol}//${tld}`;

  const response = NextResponse.redirect(redirectUrl);
  response.headers.append(
    "set-cookie",
    formatCookie(ADMIN_COOKIE_NAME, cookieConfig, currentJwt),
  );
  response.headers.append(
    "set-cookie",
    formatCookie(COOKIE_NAME, cookieConfig, newJwt),
  );

  return response;
}
