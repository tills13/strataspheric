import { db } from "..";

export async function createEmail(id: string) {
  return db.insertInto("emails").values({ id }).execute();
}
