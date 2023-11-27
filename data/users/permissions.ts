// actions: create, edit, delete, view
import { StrataMembership } from "..";

type Namespaces = "stratas";
type Scope =
  | "*"
  | "events"
  | "files"
  | "inbox_messages"
  | "inbox_thread_chats"
  | "memberships"
  | "widgets";
type Action = "*" | "create" | "edit" | "delete" | "view";

type Permission = `${Namespaces}.${Scope}.${Action}`;

const roles = [
  "administrator",
  "president",
  "vice-president",
  "treasurer",
  "secretary",
  "owner",
  "pending",
] as const;

export type Role = (typeof roles)[number];
export type AccountType = "user" | "realtor";

export function p(): string;
export function p(namespace: "stratas"): string;
export function p(namespace: "stratas", scope: Scope): string;
export function p(namespace: "stratas", scope: Scope, action: Action): string;
export function p(
  namespace: "stratas" = "stratas",
  scope: Scope = "*",
  action: Action = "*",
): string {
  return [namespace, scope, action].filter(Boolean).join(".");
}

export function memberToScopes(membership: StrataMembership): string[] {
  return [...roleScopeToScopes(membership.role)].filter(
    (i): i is string => !!i,
  );
}

export function roleScopeToScopes(roleScope: Role | string | undefined) {
  switch (roleScope) {
    case "administrator":
    case "president":
    case "vice-president":
    case "treasurer": {
      return [p()];
    }
    case "secretary": {
      return [p("stratas", "files"), p("stratas", "events")];
    }
    case "owner": {
      return [];
    }
    default: {
      return [];
    }
  }
}

interface HasScope {
  scopes: string[];
}

const PermissionsError = new Error("insufficient permissions");

export function wildcardScopeToRegex(scope: string) {
  return new RegExp(
    "^" + scope.replaceAll(".", "\\.").replace("*", ".+") + "$",
  );
}

export function can(
  scoped: HasScope | null | undefined,
  ...targetScope: string[]
): boolean {
  if (targetScope.length !== 1) {
    return targetScope.every((scope) => can(scoped, scope));
  }

  const mTargetScope = targetScope[0];
  const userScopes = !scoped ? roleScopeToScopes(undefined) : scoped.scopes;

  let scope: RegExp | string;

  for (scope of userScopes) {
    if (scope.includes("*")) {
      scope = wildcardScopeToRegex(scope);
    }

    if (typeof scope === "string" && scope === mTargetScope) {
      return true;
    } else if (scope instanceof RegExp && scope.test(mTargetScope)) {
      return true;
    }
  }

  return false;
}

export function assertCan(
  scoped: HasScope | null | undefined,
  ...targetScope: string[]
) {
  if (!can(scoped, ...targetScope)) {
    throw PermissionsError;
  }
}
