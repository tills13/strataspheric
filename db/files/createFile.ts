import { uuidv7 } from "uuidv7";

import { File, NewFile, db } from "..";

export async function createFile(newFile: Omit<NewFile, "id">): Promise<File> {
  return db
    .insertInto("files")
    .values({
      id: uuidv7(),
      ...newFile,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
