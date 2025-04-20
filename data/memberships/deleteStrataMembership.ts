import { db } from "..";

export function deleteStrataMembership(strataId: string, userId: string) {
  return db
    .deleteFrom("strata_memberships")
    .where("strata_memberships.strataId", "=", strataId)
    .where("strata_memberships.userId", "=", userId)
    .execute();
}
