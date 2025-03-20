import { headers } from "next/headers";

import { findStrataMemberships } from "../data/strataMemberships/findStrataMemberships";
import { roleScopeToScopes } from "../data/users/permissions";
import { signInUser } from "../data/users/signInUser";
import * as formdata from "../utils/formdata";
import { getDomain } from "../utils/getDomain";
import { formatJwtCookie, getJwtFromCookies } from "./cookies";
import {
  VALIDITY_PERIOD,
  buildJwt,
  getKey,
  parseJwt,
  readJwtFromRequest,
} from "./jwt";
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
    try {
      const { payload } = await readJwtFromRequest(config, req);
      const newPayload = {
        user: await decorateSessionUser({
          id: payload.user.id,
          email: payload.user.email,
          name: payload.user.name,
          scopes: [],
        }),
        exp: new Date().getTime() + VALIDITY_PERIOD,
      };

      const jwt = await buildJwt(await getKey(config), newPayload);

      return new Response(JSON.stringify(newPayload), {
        headers: {
          "content-type": "application/json",
          "set-cookie": formatJwtCookie(config, jwt),
        },
        status: 200,
      });
    } catch {
      return new Response("Not Allowed", { status: 403 });
    }
  }

  async function POST(req: Request) {
    const requestUrl = new URL(req.url);

    if (requestUrl.pathname === "/api/session/destroy") {
      return new Response("", {
        headers: {
          "content-type": "application/json",
          "set-cookie": formatJwtCookie(config, "", -1),
        },
        status: 200,
      });
    }

    const fd = await req.formData();

    const user = await signInUser(
      formdata.getString(fd, "email"),
      formdata.getString(fd, "password"),
    );

    const payload = {
      user: await decorateSessionUser({
        id: user.id,
        email: user.email,
        name: user.name,
        scopes: [],
      }),
      exp: new Date().getTime() + VALIDITY_PERIOD,
    };

    const key = await getKey(config);

    const jwt = await buildJwt(key, payload);

    return new Response(JSON.stringify(payload), {
      headers: {
        "content-type": "application/json",
        "set-cookie": formatJwtCookie(config, jwt),
      },
      status: 200,
    });
  }

  type AuthenticatedApiHandler = (
    session: Session,
    req: Request,
  ) => Promise<Response>;
  function auth(...args: []): Promise<Session>;
  function auth(
    ...args: [AuthenticatedApiHandler]
  ): (req: Request) => Promise<Response>;

  function auth(...args: [] | [AuthenticatedApiHandler]): any {
    if (args.length === 0) {
      const head = headers();
      const token = getJwtFromCookies(head.get("cookie"));

      if (!token) {
        return undefined;
      }

      const { payload } = parseJwt(token);

      return payload;
    } else {
      const [apiHandler] = args;
      return async (req: Request) => {
        try {
          const { payload } = await readJwtFromRequest(config, req);
          return apiHandler(payload, req);
        } catch {
          return new Response("Not Allowed", { status: 403 });
        }
      };
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
