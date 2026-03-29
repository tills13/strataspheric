import { db } from "..";

export type Thread = Awaited<ReturnType<typeof getThread>>;

type GetThreadFilter = {
  senderUserId?: string;
  userId?: string;
  viewId?: string;
};

export function getThread(threadId: string, filter: GetThreadFilter = {}) {
  let query = db()
    .selectFrom("inbox_messages")
    .leftJoin(
      "strata_memberships",
      "inbox_messages.senderUserId",
      "strata_memberships.userId",
    )
    .leftJoin("users", "inbox_messages.senderUserId", "users.id")
    .$if(!!filter.userId, (qb) =>
      qb.leftJoin("thread_reads", (join) =>
        join
          .onRef("thread_reads.threadId", "=", "inbox_messages.threadId")
          .on("thread_reads.userId", "=", filter.userId!),
      ),
    )
    .select((eb) => [
      "inbox_messages.id",
      "inbox_messages.subject",
      "inbox_messages.message",
      "inbox_messages.threadId",
      "inbox_messages.viewId",
      "inbox_messages.sentAt",
      "inbox_messages.senderUserId",
      "inbox_messages.strataId",
      "inbox_messages.fileId",
      "inbox_messages.invoiceId",
      "inbox_messages.amenityBookingId",
      ...(filter.userId
        ? [
            eb
              .case()
              .when("thread_reads.threadId", "is", null)
              .then(1)
              .else(0)
              .end()
              .as("isUnread"),
          ]
        : [eb.val(1).as("isUnread")]),
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

  return query.orderBy("inbox_messages.sentAt", "desc").executeTakeFirstOrThrow();
}
