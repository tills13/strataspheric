import { Strata, StrataUpdate, db } from "..";

export function updateStrata(
  strataId: Strata["id"],
  strataUpdate: StrataUpdate,
) {
  return db
    .updateTable("stratas")
    .set(strataUpdate)
    .where("stratas.id", "=", strataId)
    .execute();
}
