export const namespaces = ["stratas"] as const;
export const scopes = [
  "amenities",
  "amenity_bookings",
  "events",
  "files",
  "inbox_messages",
  "inbox_thread_chats",
  "invoices",
  "meetings",
  "memberships",
  "widgets",
] as const;
export const actions = ["create", "edit", "delete", "view"] as const;
export const roles = [
  "administrator",
  "president",
  "vice-president",
  "treasurer",
  "secretary",
  "owner",
  "pending",
] as const;
export const allPermissions = [
  ...namespaces.flatMap((namespace) =>
    actions.flatMap((action) => `${namespace}.${action}` as Permission),
  ),
  ...namespaces.flatMap((namespace) =>
    scopes.flatMap((scope) =>
      actions.flatMap(
        (action) => `${namespace}.${scope}.${action}` as Permission,
      ),
    ),
  ),
];

export type Namespaces = (typeof namespaces)[number];
export type Scope = (typeof scopes)[number] | "*";
export type Action = (typeof actions)[number] | "*";

export type Permission =
  | `${Namespaces}.${Action}`
  | `${Namespaces}.${Scope}.${Action}`
  | `!${Namespaces}.${Scope}.${Action}`;

export type Role = (typeof roles)[number];
export type AccountType = "user" | "realtor";

export function p(
  namespace?: "stratas",
  scope?: Scope,
  action?: Action,
): Permission;
export function p(
  namespace: "stratas" = "stratas",
  scope: Scope = "*",
  action: Action = "*",
): Permission {
  return [namespace, scope, action].filter(Boolean).join(".") as Permission;
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

export function rolePermissionsEqualCustomPermissions(
  role: Role,
  customPermissions: Permission[],
) {
  const rolePermissions = roleScopeToScopes(role);

  return (
    rolePermissions.every((permission) =>
      can({ scopes: customPermissions }, permission),
    ) &&
    customPermissions.every((permission) =>
      can({ scopes: rolePermissions }, permission),
    )
  );
}

interface HasScope {
  scopes: string[];
}

const PermissionsError = new Error("insufficient permissions");

function wildcardScopeToRegex(scope: string) {
  return new RegExp(
    "^" + scope.replaceAll(".", "\\.").replace("*", ".+") + "$",
  );
}

export function can(
  scoped: HasScope | null | undefined,
  ...targetScopes: Permission[]
): boolean {
  // todo -- figure out
  // if (process.env.NODE_ENV === "development") {
  //   return true;
  // }

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
