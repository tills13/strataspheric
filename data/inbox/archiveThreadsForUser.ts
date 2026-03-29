import { db } from "..";

export function archiveThreadsForUser(userId: string, threadIds: string[]) {
  if (threadIds.length === 0) return Promise.resolve();

  return db()
    .insertInto("thread_archives")
    .values(threadIds.map((threadId) => ({ userId, threadId })))
    .onConflict((oc) => oc.columns(["userId", "threadId"]).doNothing())
    .execute();
}
