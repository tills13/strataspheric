import { db } from "..";
import { roleScopeToScopes } from "../users/permissions";

export type StrataMembership = Awaited<ReturnType<typeof getStrataMembership>>;

export function baseQuery() {
  return db()
    .selectFrom("strata_memberships")
    .innerJoin("users", "users.id", "strata_memberships.userId")
    .selectAll(["strata_memberships", "users"]);
}

type Row = Awaited<
  ReturnType<ReturnType<typeof baseQuery>["executeTakeFirstOrThrow"]>
>;

export function processRows(...rows: Row[]) {
  return rows.map((row) => {
    const { rawPermissions, ...rest } = row;

    let scopes = roleScopeToScopes(rest.role);

    if (rawPermissions) {
      scopes = JSON.parse(rawPermissions || "[]");
      // scopes = Object.entries(JSON.parse(rawPermissions || "{}"))
      //   .filter(([, hasPermission]) => hasPermission)
      //   .map(([permissionName]) => permissionName);
    }

    return {
      ...rest,
      notifyEvents: rest.notifyEvents === 1,
      scopes,
    };
  });
}

export async function getStrataMembership(strataId: string, userId: string) {
  const query = baseQuery()
    .where("strata_memberships.strataId", "=", strataId)
    .where("strata_memberships.userId", "=", userId);

  const result = await query.executeTakeFirst();
  return result ? processRows(result)[0] : undefined;
}
