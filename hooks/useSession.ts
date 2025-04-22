import { useContext } from "react";

import { Session } from "../auth/types";
import { SessionCtx } from "../components/SessionProvider";

export function useSession(): Session | undefined;
export function useSession(mustResolve: false): Session | undefined;
export function useSession(mustResolve: true): Session;

export function useSession(mustResolve = false) {
  const session = useContext(SessionCtx);

  if (mustResolve && !session) {
    throw new Error("no session");
  }

  return session;
}
