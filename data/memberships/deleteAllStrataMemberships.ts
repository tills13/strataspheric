import { db } from "..";

export function deleteAllStrataMemberships(strataId: string) {
  return db
    .deleteFrom("strata_memberships")
    .where("strata_memberships.strataId", "=", strataId)
    .execute();
}
