import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { getStrataMembershipByDomainAndUserId } from "../data/memberships/getStrataMembershipByDomainAndUserId";
import { getDomain } from "../utils/getDomain";
import { internalAuthDoNotUseDirectly as _auth } from "./auth";
import { GET, POST } from "./endpoints";
import { AuthenticatedApiHandler, Config, Session, User } from "./types";

function createAuth(config: Config) {
  function iauth(...args: []): Promise<Session | undefined>;
  function iauth(
    ...args: [AuthenticatedApiHandler]
  ): (req: NextRequest) => Promise<NextResponse>;

  function iauth(...args: [] | [AuthenticatedApiHandler]) {
    return _auth(config, ...args);
  }

  return {
    auth: iauth,
    handlers: {
      GET: GET.bind(undefined, config),
      POST: POST.bind(undefined, config),
    },
  };
}

async function decorateSessionUser(
  baseUser: Omit<User, "scopes">,
): Promise<User> {
  const membership = await getStrataMembershipByDomainAndUserId(
    await getDomain(),
    baseUser.id,
  );

  return {
    ...baseUser,
    scopes: membership?.scopes || [],
  };
}

const isDev = process.env.NODE_ENV === "development";

export const { auth, handlers } = createAuth({
  decorateSessionUser,
  key: JSON.parse(process.env.AUTH_KEY || "{}"),
  cookies: (req) => ({
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    ...((isDev || req.headers.get("host")?.includes("strataspheric.app")) && {
      domain: !isDev ? ".strataspheric.app" : ".strataspheric.local",
    }),
    secure: !isDev,
  }),
});

export const mustAuth = async (raiseNotFound?: boolean) => {
  const session = await auth();

  if (!session) {
    if (raiseNotFound) {
      notFound();
    } else {
      throw new Error("unauthorized");
    }
  }
  return session;
};
