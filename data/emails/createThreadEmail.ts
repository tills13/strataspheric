import { NewThreadEmail, db } from "..";

export async function createThreadEmail(newThreadEmail: NewThreadEmail) {
  return db.insertInto("thread_emails").values(newThreadEmail).execute();
}
