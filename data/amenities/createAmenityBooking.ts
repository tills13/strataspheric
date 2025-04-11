import { uuidv7 } from "uuidv7";

import { NewAmenityBooking, db } from "..";

export function createAmenityBooking(
  newAmenityBooking: Omit<NewAmenityBooking, "id">,
) {
  return db
    .insertInto("amenity_bookings")
    .values({ id: uuidv7(), ...newAmenityBooking })
    .returningAll()
    .executeTakeFirstOrThrow();
}
