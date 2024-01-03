import { db } from "..";

export function getThreadEmailParticipants(threadId: string) {
  return db
    .selectFrom("thread_emails")
    .innerJoin("emails", "thread_emails.emailId", "emails.id")
    .leftJoin("users", "users.id", "thread_emails.userId")
    .selectAll()
    .where("thread_emails.threadId", "=", threadId)
    .execute();
}
