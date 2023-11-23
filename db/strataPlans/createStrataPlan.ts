import { uuidv7 } from "uuidv7";

import { NewStrataPlan, db } from "..";

export function createPlan(newStrataPlan: Omit<NewStrataPlan, "id">) {
  return db
    .insertInto("strata_plans")
    .values({
      id: uuidv7(),
      ...newStrataPlan,
    })
    .execute();
}
