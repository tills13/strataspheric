import { InboxMessage, db } from "..";

type ThreadMessage = InboxMessage & {
  senderEmail: string;
  senderName: string;
  fileName: string | null;
  fileDescription: string | null;
  filePath: string | null;
};

export function getThreadMessages(
  threadId: string,
  viewId?: string | undefined,
): Promise<ThreadMessage[]> {
  let query = db
    .selectFrom("inbox_messages")
    .innerJoin("users", "inbox_messages.senderUserId", "users.id")
    .leftJoin("files", "files.id", "inbox_messages.fileId")
    .select((eb) => [
      "inbox_messages.id",
      "inbox_messages.subject",
      "inbox_messages.message",
      "inbox_messages.threadId",
      "inbox_messages.viewId",
      "inbox_messages.isUnread",
      "inbox_messages.sentAt",
      "inbox_messages.senderUserId",
      "inbox_messages.senderPhoneNumber",
      "inbox_messages.strataId",
      "inbox_messages.fileId",
      "files.name as fileName",
      "files.description as fileDescription",
      "files.path as filePath",
      eb.fn
        .coalesce("users.name", "inbox_messages.senderName")
        .as("senderName"),
      eb.fn
        .coalesce("users.email", "inbox_messages.senderEmail")
        .as("senderEmail"),
    ])
    .where("inbox_messages.threadId", "=", threadId);

  if (viewId) {
    query = query.where("inbox_messages.viewId", "=", viewId);
  }

  return query
    .orderBy("inbox_messages.sentAt asc")
    .execute() as unknown as Promise<ThreadMessage[]>;
}
