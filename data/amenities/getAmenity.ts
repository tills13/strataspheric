import { db } from "..";

export type Amenity = Awaited<ReturnType<typeof getAmenity>>;

export function getAmenity(amenityId: string) {
  return db
    .selectFrom("amenities")
    .innerJoin("files", "amenities.imageFileId", "files.id")
    .selectAll("amenities")
    .select(["files.path as imageSrc", "files.name as imageName"])
    .where("amenities.id", "=", amenityId)
    .executeTakeFirstOrThrow();
}
