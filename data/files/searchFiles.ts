import { db } from "..";

export function searchFiles(
  strataId: string,
  includePrivateFiles: boolean | undefined = true,
  searchTerm?: string,
  visibility?: "public" | "private",
) {
  let query = db
    .selectFrom("files")
    .selectAll()
    .where("files.strataId", "=", strataId);

  if (!includePrivateFiles) {
    query = query.where("files.isPublic", "=", 1);
  }

  if (searchTerm) {
    query = query.where((eb) =>
      eb.or([
        eb("name", "like", `%${searchTerm}%`),
        eb("description", "like", `%${searchTerm}%`),
      ]),
    );
  }

  if (visibility) {
    query = query.where("files.isPublic", "=", visibility === "public" ? 1 : 0);
  }

  return query.execute();
}
