import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { readJwtFromHeaders, readJwtFromRequest } from "./jwt";
import { AuthenticatedApiHandler, Config, Session } from "./types";

export function internalAuthDoNotUseDirectly(
  config: Config,
  ...args: [] | [AuthenticatedApiHandler]
):
  | Promise<Session | undefined>
  | ((req: NextRequest) => Promise<NextResponse>) {
  if (args.length === 0) {
    return Promise.resolve().then(async () => {
      try {
        const { payload } = await readJwtFromHeaders(config, await headers());

        if (config.decorateSessionUser) {
          const u = config.decorateSessionUser(payload.user);

          return u instanceof Promise
            ? u.then((user) => ({ ...payload, user }))
            : { ...payload, user: u };
        }

        return payload;
      } catch {
        return undefined;
      }
    });
  } else {
    const [apiHandler] = args;
    return async (req: NextRequest) => {
      try {
        const { payload } = await readJwtFromRequest(config, req);

        return config
          .decorateSessionUser(payload.user)
          .then((u) => apiHandler({ ...payload, user: u }, req));
      } catch {
        return new NextResponse("Not Allowed", { status: 403 });
      }
    };
  }
}
