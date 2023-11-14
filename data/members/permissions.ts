// actions: create, edit, delete

export function roleScopeToScopes(roleScope: string | undefined) {
  switch (roleScope) {
    case "administrator":
    case "president":
    case "vice-president":
    case "treasurer": {
      return ["stratas.*"];
    }
    case "secretary": {
      return ["stratas.files.*", "stratas.events.*"];
    }
    default: {
      return [];
    }
  }
}

interface HasScope {
  scope: string[] | string;
}

const PermissionsError = new Error("insufficient permissions");

export function wildcardScopeToRegex(scope: string) {
  return new RegExp(
    "^" + scope.replaceAll(".", "\\.").replace("*", ".+") + "$"
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

  const userScopes = !scoped
    ? roleScopeToScopes(undefined)
    : typeof scoped.scope === "string"
    ? roleScopeToScopes(scoped?.scope)
    : scoped.scope;

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
