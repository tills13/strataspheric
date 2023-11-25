import { StrataMembershipUpdate, db } from "..";

export function updateStrataMembership(
  strataId: string,
  userId: string,
  strataMember: StrataMembershipUpdate,
) {
  return db
    .updateTable("strata_memberships")
    .set(strataMember)
    .where("strata_memberships.strataId", "=", strataId)
    .where("strata_memberships.userId", "=", userId)
    .execute();
}
