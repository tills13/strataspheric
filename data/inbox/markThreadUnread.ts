import { db } from "..";

export function markThreadUnread(userId: string, threadId: string) {
  return db()
    .deleteFrom("thread_reads")
    .where("thread_reads.userId", "=", userId)
    .where("thread_reads.threadId", "=", threadId)
    .execute();
}
