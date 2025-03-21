import { findStrataMemberships } from "../data/strataMemberships/findStrataMemberships";
import { roleScopeToScopes } from "../data/users/permissions";
import { getDomain } from "../utils/getDomain";
import { auth as _auth } from "./auth";
import { GET, POST } from "./endpoints";
import { AuthenticatedApiHandler, Config, Session, User } from "./types";

function createAuth(config: Config) {
  function iauth(...args: []): Promise<Session>;
  function iauth(
    ...args: [AuthenticatedApiHandler]
  ): (req: Request) => Promise<Response>;

  function iauth(...args: any) {
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

async function decorateSessionUser(baseUser: User): Promise<User> {
  const [membership] = await findStrataMemberships({
    domain: getDomain(),
    userId: baseUser.id,
  });

  return {
    ...baseUser,
    scopes: roleScopeToScopes(membership?.role),
  };
}

const isNotDev = process.env.NODE_ENV !== "development";

export const { auth, handlers } = createAuth({
  decorateSessionUser,
  key: JSON.parse(process.env.AUTH_KEY!),
  cookies: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    domain: isNotDev ? ".strataspheric.app" : ".strataspheric.local",
    secure: isNotDev,
  },
});
