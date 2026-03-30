import { uuidv7 } from "uuidv7";

import { NewStrataMembership, db } from "..";

export async function createStrataMembership(
  strataMembership: NewStrataMembership,
) {
  return db()
    .insertInto("strata_memberships")
    .values({
      id: uuidv7(),
      ...strataMembership,
    })
    .execute();
}
