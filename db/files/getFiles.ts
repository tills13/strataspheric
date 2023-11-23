import { db } from "..";

export function getFiles() {
  return db.selectFrom("files").selectAll().execute();
}
