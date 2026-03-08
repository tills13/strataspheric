import { StrataPlanUpdate, db } from "..";

export function updateStrataPlan(strataId: string, update: StrataPlanUpdate) {
  return db()
    .updateTable("strata_plans")
    .set(update)
    .where("strataId", "=", strataId)
    .execute();
}
