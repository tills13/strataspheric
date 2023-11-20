import { db } from "..";

export function deleteStrataMember(strataId: string, userId: string) {
  return db
    .deleteFrom("strata_memberships")
    .where("strata_memberships.strataId", "=", strataId)
    .where("strata_memberships.userId", "=", userId)
    .execute();
}
