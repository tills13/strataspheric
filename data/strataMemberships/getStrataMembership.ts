import { StrataMembership, User, db } from "..";

export async function getStrataMembership(
  strataId: string,
  userId: string,
): Promise<(StrataMembership & User) | undefined> {
  let query = db
    .selectFrom("strata_memberships")
    .innerJoin("users", "users.id", "strata_memberships.userId")
    .selectAll()
    .where("strata_memberships.strataId", "=", strataId)
    .where("strata_memberships.userId", "=", userId)
    .where("strata_memberships.role", "!=", "pending")
    .orderBy("unit")
    .orderBy("name asc");

  return query.executeTakeFirst();
}
