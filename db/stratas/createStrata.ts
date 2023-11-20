import { uuidv7 } from "uuidv7";

import { NewStrata, Strata, db } from "..";

export async function createStrata(
  newStrata: Omit<NewStrata, "id">,
): Promise<Strata> {
  return db
    .insertInto("stratas")
    .values({ id: uuidv7(), ...newStrata })
    .returningAll()
    .executeTakeFirstOrThrow();
}
