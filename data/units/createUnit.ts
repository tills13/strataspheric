import { uuidv7 } from "uuidv7";

import { NewUnit, Unit, db } from "..";

export async function createUnit(newUnit: Omit<NewUnit, "id">): Promise<Unit> {
  return db()
    .insertInto("units")
    .values({
      id: uuidv7(),
      ...newUnit,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
