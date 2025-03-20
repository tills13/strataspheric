import { headers } from "next/headers";

import { findStrataMemberships } from "../data/strataMemberships/findStrataMemberships";
import { roleScopeToScopes } from "../data/users/permissions";
import { signInUser } from "../data/users/signInUser";
import * as formdata from "../utils/formdata";
import { getDomain } from "../utils/getDomain";
import { formatJwtCookie, getJwtFromCookies } from "./cookies";
import { VALIDITY_PERIOD, buildJwt, getKey, parseJwt, verifyJwt } from "./jwt";
import { Config, Session, User } from "./types";

async function decorateSessionUser(baseUser: User): Promise<User> {
  const [membership] = await findStrataMemberships({
    domain: getDomain(),
    userId: baseUser.id,
  });

  return {
    ...baseUser,
    scopes: roleScopeToScopes(membership.role),
  };
}

export function createAuth(config: Config) {
  async function GET(req: Request) {
    const rawJwt = getJwtFromCookies(req.headers.get("cookie"));

    if (!rawJwt) {
      return new Response("Not Allowed", { status: 403 });
    }

    const key = await getKey(config);
    const jwtIsValid = await verifyJwt(key, rawJwt);

    if (!jwtIsValid) {
      return new Response("Not Allowed", { status: 403 });
    }

    const { payload } = parseJwt(rawJwt);

    const newPayload = {
      user: await decorateSessionUser({
        id: payload.user.id,
        email: payload.user.email,
        scopes: [],
      }),
      exp: new Date().getTime() + VALIDITY_PERIOD,
    };

    const jwt = await buildJwt(key, newPayload);

    return new Response(JSON.stringify(newPayload), {
      headers: {
        "content-type": "application/json",
        "set-cookie": formatJwtCookie(config, jwt),
      },
      status: 200,
    });
  }

  async function POST(req: Request) {
    const fd = await req.formData();

    const user = await signInUser(
      formdata.getString(fd, "email"),
      formdata.getString(fd, "password"),
    );

    const key = await getKey(config);
    const jwt = await buildJwt(key, {
      user: await decorateSessionUser({
        id: user.id,
        email: user.email,
        scopes: [],
      }),
      exp: new Date().getTime() + VALIDITY_PERIOD,
    });

    return new Response("OK", {
      headers: {
        "set-cookie": formatJwtCookie(config, jwt),
      },
      status: 200,
    });
  }

  function auth(...args: []): Promise<Session>;
  function auth(...args: [string]): any;

  function auth(...args: [] | [string]): any {
    if (args.length === 0) {
      const head = headers();
      const token = getJwtFromCookies(head.get("cookie"));

      if (!token) {
        return undefined;
      }

      const { payload } = parseJwt(token);

      return payload;
    }
  }

  return {
    auth,
    handlers: { GET, POST },
  };
}

const isNotDev = process.env.NODE_ENV !== "development";

export const { auth, handlers } = createAuth({
  key: JSON.parse(process.env.AUTH_KEY!),
  cookies: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    domain: isNotDev ? ".strataspheric.app" : ".strataspheric.local",
    secure: isNotDev,
  },
});
