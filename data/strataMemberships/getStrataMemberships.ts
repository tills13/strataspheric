import { StrataMembership, User, db } from "..";

export async function getStrataMemberships(
  strataId: string,
  showAll = false,
): Promise<Array<StrataMembership & User>> {
  let query = db
    .selectFrom("strata_memberships")
    .innerJoin("users", "users.id", "strata_memberships.userId")
    .selectAll()
    .where("strata_memberships.strataId", "=", strataId)
    .orderBy("unit")
    .orderBy("name asc");

  if (!showAll) {
    query = query.where("strata_memberships.role", "!=", "pending");
  }

  return query.execute();
}
