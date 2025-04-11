import { uuidv7 } from "uuidv7";

import { NewAmenity, db } from "..";

export function createAmenity(newAmenity: Omit<NewAmenity, "id">) {
  return db
    .insertInto("amenities")
    .values({ id: uuidv7(), ...newAmenity })
    .returningAll()
    .executeTakeFirst();
}
