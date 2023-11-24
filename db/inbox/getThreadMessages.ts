import { db } from "..";

interface Opts {
  senderUserId?: string;
  viewId?: string;
}

export function getThreadMessages(
  threadId: string,
  viewId?: string | undefined,
) {
  let query = db
    .selectFrom("inbox_messages")
    .leftJoin(
      "strata_memberships",
      "inbox_messages.senderUserId",
      "strata_memberships.userId",
    )
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
      "inbox_messages.strataId",
      "files.name as fileName",
      "files.description as fileDescription",
      "files.path as filePath",
      eb.fn
        .coalesce("strata_memberships.name", "inbox_messages.senderName")
        .as("senderName"),
      eb.fn
        .coalesce("strata_memberships.email", "inbox_messages.senderEmail")
        .as("senderEmail"),
      eb.fn
        .coalesce(
          "strata_memberships.phoneNumber",
          "inbox_messages.senderPhoneNumber",
        )
        .as("senderPhoneNumber"),
    ])
    .where("inbox_messages.threadId", "=", threadId);

  if (viewId) {
    query = query.where("inbox_messages.viewId", "=", viewId);
  }

  return query.orderBy("inbox_messages.sentAt asc").execute();
}
