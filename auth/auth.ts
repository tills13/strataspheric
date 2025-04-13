import { headers } from "next/headers";
import { NextRequest } from "next/server";

import { getJwtFromCookies } from "./cookies";
import { parseJwt, readJwtFromRequest } from "./jwt";
import { AuthenticatedApiHandler, Config } from "./types";

export function internalAuthDoNotUseDirectly(
  config: Config,
  ...args: [] | [AuthenticatedApiHandler]
): any {
  if (args.length === 0) {
    return headers().then((head) => {
      const token = getJwtFromCookies(head.get("cookie"));

      if (!token) {
        return undefined;
      }

      const { payload } = parseJwt(token);

      return payload;
    });
  } else {
    const [apiHandler] = args;
    return async (req: NextRequest) => {
      try {
        const { payload } = await readJwtFromRequest(config, req);
        return apiHandler(payload, req);
      } catch {
        return new Response("Not Allowed", { status: 403 });
      }
    };
  }
}
