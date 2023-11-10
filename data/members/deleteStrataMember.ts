import { db } from "../../db";

export function deleteStrataMember(strataId: string, memeberId: string) {
  return db()
    .prepare(
      "DELETE FROM strata_memberships WHERE strata_id = ? AND member_id = ?"
    )
    .bind(strataId, memeberId)
    .run();
}
