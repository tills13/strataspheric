import { notFound } from "next/navigation";

import { ServerActionError } from "../utils/actions";
import { Tail } from "../utils/type";
import { auth } from "./index";
import { Session } from "./types";

export async function mustAuthAdmin(): Promise<Session> {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    notFound();
  }

  return session;
}

export function withAdminAuth<
  F extends (session: Session, ...args: any[]) => Promise<void>,
>(fn: F) {
  return async function (...args: Tail<Parameters<F>>) {
    const session = await auth();

    if (!session || !session.user.isAdmin) {
      throw new ServerActionError("not authorized");
    }

    return fn(session, ...args);
  };
}
