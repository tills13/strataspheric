import { AmenityUpdate, db } from "..";

export function updateAmenity(amenityId: string, amenity: AmenityUpdate) {
  return db
    .updateTable("amenities")
    .set(amenity)
    .where("amenities.id", "=", amenityId)
    .execute();
}
