import { StrataMembership, db } from "..";

export async function getStrataMembership(
  strataId: string,
  showAll = false,
): Promise<StrataMembership[]> {
  let query = db
    .selectFrom("strata_memberships")
    .selectAll()
    .where("strata_memberships.strataId", "=", strataId)
    .orderBy("unit")
    .orderBy("name asc");

  if (!showAll) {
    query = query.where("strata_memberships.role", "!=", "pending");
  }

  return query.execute();
}
