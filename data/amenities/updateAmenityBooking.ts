import { AmenityBookingUpdate, db } from "..";

export function updateAmenityBooking(
  amenityBookingId: string,
  amenityBookingUpdate: AmenityBookingUpdate,
) {
  return db
    .updateTable("amenity_bookings")
    .set(amenityBookingUpdate)
    .where("amenity_bookings.id", "=", amenityBookingId)
    .execute();
}
