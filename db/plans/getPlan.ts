import { StrataPlan, db } from "..";

export function getPlan(strataId: string): Promise<StrataPlan> {
  return db
    .selectFrom("strata_plans")
    .selectAll()
    .where("strata_plans.strataId", "=", strataId)
    .executeTakeFirstOrThrow();
}
