import { db } from "..";

export function archiveThreads(threadIds: string[]) {
  if (threadIds.length === 0) return Promise.resolve();

  const now = Math.floor(Date.now() / 1000);

  return db()
    .updateTable("inbox_messages")
    .set({ archivedAt: now })
    .where("inbox_messages.threadId", "in", threadIds)
    .execute();
}
