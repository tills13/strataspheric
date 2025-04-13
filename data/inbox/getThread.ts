import { db } from "..";

export type Thread = Awaited<ReturnType<typeof getThread>>;

type GetThreadFilter = {
  senderUserId?: string;
  viewId?: string;
};

export function getThread(threadId: string, filter: GetThreadFilter) {
  let query = db
    .selectFrom("inbox_messages")
    .leftJoin(
      "strata_memberships",
      "inbox_messages.senderUserId",
      "strata_memberships.userId",
    )
    .leftJoin("users", "inbox_messages.senderUserId", "users.id")
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
        .coalesce("users.name", "inbox_messages.senderName")
        .as("senderName"),
      eb.fn
        .coalesce("users.email", "inbox_messages.senderEmail")
        .as("senderEmail"),
      eb.fn
        .coalesce(
          "strata_memberships.phoneNumber",
          "inbox_messages.senderPhoneNumber",
        )
        .as("senderPhoneNumber"),
    ])
    .where("inbox_messages.id", "in", (eb) =>
      eb
        .selectFrom("inbox_messages")
        .select((eb) => eb.fn.min("inbox_messages.id").as("id"))
        .groupBy("inbox_messages.threadId")
        .where("inbox_messages.threadId", "=", threadId),
    );

  if (filter.viewId) {
    query = query.where("inbox_messages.viewId", "=", filter.viewId);
  }

  if (filter.senderUserId) {
    query = query.where(
      "inbox_messages.senderUserId",
      "=",
      filter.senderUserId,
    );
  }

  return query.orderBy("inbox_messages.sentAt desc").executeTakeFirstOrThrow();
}
