import { db } from "..";

type ListAmenitiesFilter = {
  strataId: string;
};

export async function listAmenities(filters: ListAmenitiesFilter) {
  let query = db
    .selectFrom("amenities")
    .innerJoin("files", "amenities.imageFileId", "files.id")
    .selectAll("amenities")
    .select(["files.path as imageSrc", "files.name as imageName"])
    .where("amenities.strataId", "=", filters.strataId);

  return query.execute();
}
