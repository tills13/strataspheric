import { auth } from "../auth";
import { Session } from "../auth/types";
import { Permission, can } from "../data/users/permissions";
import { Tail } from "./type";

export class ServerActionError extends Error {
  constructor(
    internalErrorMessage: string,
    public externalErrorMessage?: string,
  ) {
    super(internalErrorMessage);
  }
}

interface ServerActionErrorResponse {
  errorMessage?: string;
  success?: boolean;
}

export function withErrorReporting<S extends { success?: boolean }>(
  fn: (state: S, fd: FormData) => Promise<ServerActionErrorResponse>,
) {
  return async function (state: S, fd: FormData) {
    try {
      return await fn(state, fd);
    } catch (e) {
      console.log(
        "[debug] server action failed with",
        e instanceof Error ? e.message : `${e}`,
      );

      const errorMessage =
        e instanceof ServerActionError ? e.externalErrorMessage : undefined;

      return {
        errorMessage,
        success: false,
      };
    }
  };
}

export function withPermissions<
  F extends (session: Session, ...args: any[]) => any,
>(permissions: Permission[], fn: F) {
  return async function (...args: Tail<Parameters<F>>) {
    const session = await auth();

    if (!session || !can(session?.user, ...permissions)) {
      throw new ServerActionError(
        `user does not have permission to do this action`,
      );
    }

    return fn(session, ...args);
  };
}
