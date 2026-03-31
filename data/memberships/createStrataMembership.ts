import { uuidv7 } from "uuidv7";

import { NewStrataMembership, db } from "..";

export async function createStrataMembership(
  strataMembership: Omit<NewStrataMembership, "id">,
) {
  return db()
    .insertInto("strata_memberships")
    .values({
      ...strataMembership,
      id: uuidv7(),
    })
    .execute();
}
