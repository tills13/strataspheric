import { db } from "..";

export function unarchiveThreadsForUser(userId: string, threadIds: string[]) {
  if (threadIds.length === 0) return Promise.resolve();

  return db()
    .deleteFrom("thread_archives")
    .where("thread_archives.userId", "=", userId)
    .where("thread_archives.threadId", "in", threadIds)
    .execute();
}
