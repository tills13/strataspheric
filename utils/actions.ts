import { auth } from "../auth";
import { Permission, can } from "../data/users/permissions";

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

export function withPermissions<F extends (...args: any) => any>(
  permissions: Permission[],
  fn: F,
) {
  return async function (...args: Parameters<F>) {
    const session = await auth();

    if (!can(session?.user, ...permissions)) {
      throw new ServerActionError(
        `user does not have permission to do this action`,
      );
    }

    return fn(...args);
  };
}
