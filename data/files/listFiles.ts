import { db } from "..";

export function listFiles(
  strataId: string,
  includePrivateFiles: boolean | undefined = true,
) {
  let query = db
    .selectFrom("files")
    .selectAll()
    .where("files.strataId", "=", strataId);

  if (!includePrivateFiles) {
    query = query.where("files.isPublic", "=", 1);
  }

  return query.execute();
}
