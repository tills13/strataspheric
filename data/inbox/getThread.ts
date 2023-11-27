import { db } from "..";
import { Thread } from "./getThreads";

export function getThread(
  strataId: string,
  threadId: string,
  opts: { senderUserId?: string; viewId?: string },
): Promise<Thread> {
  let query = db
    .selectFrom("inbox_messages")
    .leftJoin(
      "strata_memberships",
      "inbox_messages.senderUserId",
      "strata_memberships.userId",
    )
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
      "inbox_messages.fileId",
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
      eb
        .selectFrom("inbox_thread_chats")
        .select((mEb) => mEb.fn.countAll<number>().as("count"))
        .where(
          "inbox_thread_chats.threadId",
          "=",
          eb.ref("inbox_messages.threadId"),
        )
        .as("numChats"),
    ])
    .where("inbox_messages.id", "in", (eb) =>
      eb
        .selectFrom("inbox_messages")
        .select((eb) => eb.fn.min("inbox_messages.id").as("id"))
        .groupBy("inbox_messages.threadId")
        .where("inbox_messages.threadId", "=", threadId),
    )
    .where("inbox_messages.strataId", "=", strataId);

  if (opts.viewId) {
    query = query.where("inbox_messages.viewId", "=", opts.viewId);
  }

  if (opts.senderUserId) {
    query = query.where("inbox_messages.senderUserId", "=", opts.senderUserId);
  }

  return query.orderBy("inbox_messages.sentAt desc").executeTakeFirstOrThrow();
}
