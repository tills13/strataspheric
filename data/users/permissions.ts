// actions: create, edit, delete, view
import { StrataMembership } from "..";

type Namespaces = "stratas";
export type Scope =
  | "*"
  | "amenities"
  | "amenity_bookings"
  | "events"
  | "files"
  | "inbox_messages"
  | "inbox_thread_chats"
  | "invoices"
  | "meetings"
  | "memberships"
  | "widgets";

export type Action = "*" | "create" | "edit" | "delete" | "view";

export type Permission =
  | `${Namespaces}.${Action}`
  | `${Namespaces}.${Scope}.${Action}`
  | `!${Namespaces}.${Scope}.${Action}`;

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

export function p(): Permission;
export function p(namespace: "stratas"): Permission;
export function p(namespace: "stratas", scope: Scope): Permission;
export function p(
  namespace: "stratas",
  scope: Scope,
  action: Action,
): Permission;
export function p(
  namespace: "stratas" = "stratas",
  scope: Scope = "*",
  action: Action = "*",
): Permission {
  return [namespace, scope, action].filter(Boolean).join(".") as Permission;
}

export function memberToScopes(membership: StrataMembership): Permission[] {
  return [...roleScopeToScopes(membership.role)].filter(
    (i): i is Permission => !!i,
  );
}

export function roleScopeToScopes(
  roleScope: Role | string | undefined,
): Permission[] {
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
      // @todo fix, make work -- explicit deny > implicit allow
      return [
        "!stratas.invoices.view",
        "stratas.amenities.view",
        "stratas.events.view",
        "stratas.files.view",
        "stratas.memberships.view",
      ];
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
  ...targetScopes: Permission[]
): boolean {
  if (targetScopes.length !== 1) {
    return targetScopes.every((scope) => can(scoped, scope));
  }

  const userScopes = !scoped ? roleScopeToScopes(undefined) : scoped.scopes;

  let scope: RegExp | string;
  let anyNegateModifier = false;

  for (let targetScope of targetScopes) {
    let modifier = true;

    if (targetScope.startsWith("!")) {
      modifier = false;
      anyNegateModifier = true;
      targetScope = targetScope.substring(1) as Permission;
    }

    for (scope of userScopes) {
      if (scope.includes("*")) {
        scope = wildcardScopeToRegex(scope);
      }

      if (typeof scope === "string" && scope === targetScope) {
        return modifier && true;
      } else if (scope instanceof RegExp && scope.test(targetScope)) {
        return modifier && true;
      }
    }
  }

  return anyNegateModifier || false;
}

export function assertCan(
  scoped: HasScope | null | undefined,
  ...targetScope: Permission[]
): asserts scoped is HasScope {
  if (!can(scoped, ...targetScope)) {
    throw PermissionsError;
  }
}
