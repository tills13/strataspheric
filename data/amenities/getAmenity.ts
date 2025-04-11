import { db } from "..";

export function getAmenity(amenityId: string) {
  return db
    .selectFrom("amenities")
    .innerJoin("files", "amenities.imageFileId", "files.id")
    .selectAll("amenities")
    .select("files.path as imageSrc")
    .where("amenities.id", "=", amenityId)
    .executeTakeFirstOrThrow();
}
