import { db } from "..";

export function getFiles(
  strataId: string,
  isPublic: boolean | undefined = true,
) {
  let query = db
    .selectFrom("files")
    .selectAll()
    .where("files.strataId", "=", strataId);

  if (isPublic !== undefined) {
    query = query.where("files.isPublic", "=", isPublic ? 1 : 0);
  }

  return query.execute();
}
