import { sql } from "kysely";

import { db } from "..";
import { PaginatedResults, Pagination } from "../types";
import { Thread } from "./getThread";

export type ListThreadsFilter = {
  amenityBookingId?: string;
  archived?: boolean;
  senderUserId?: string;
  strataId?: string;
  userId?: string;
};

export type ListThreadsPagination = Pagination<"inbox_messages", Thread>;

export async function listThreads(
  filter: ListThreadsFilter,
  pagination: ListThreadsPagination = {},
): Promise<PaginatedResults<Thread>> {
  let limitQuery = db()
    .selectFrom("inbox_messages")
    .select((eb) => eb.fn<number>("count", []).as("count"));

  let query = db()
    .selectFrom("inbox_messages")
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
      "inbox_messages.senderPhoneNumber",
      "inbox_messages.strataId",
      "inbox_messages.fileId",
      "inbox_messages.invoiceId",
      "inbox_messages.amenityBookingId",
      ...(filter.userId
        ? [
            eb
              .case()
              .when(sql.ref("thread_reads.threadId"), "is", null)
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
    ]);

  query = query.where("inbox_messages.id", "=", (eb) =>
    eb.ref("inbox_messages.threadId"),
  );

  limitQuery = limitQuery.where("inbox_messages.id", "=", (eb) =>
    eb.ref("inbox_messages.threadId"),
  );

  if (filter.userId) {
    if (filter.archived) {
      query = query.where(({ exists, selectFrom }) =>
        exists(
          selectFrom("thread_archives")
            .whereRef(
              "thread_archives.threadId",
              "=",
              "inbox_messages.threadId",
            )
            .where("thread_archives.userId", "=", filter.userId!)
            .select("thread_archives.threadId"),
        ),
      );
      limitQuery = limitQuery.where(({ exists, selectFrom }) =>
        exists(
          selectFrom("thread_archives")
            .whereRef(
              "thread_archives.threadId",
              "=",
              "inbox_messages.threadId",
            )
            .where("thread_archives.userId", "=", filter.userId!)
            .select("thread_archives.threadId"),
        ),
      );
    } else {
      query = query.where(({ not, exists, selectFrom }) =>
        not(
          exists(
            selectFrom("thread_archives")
              .whereRef(
                "thread_archives.threadId",
                "=",
                "inbox_messages.threadId",
              )
              .where("thread_archives.userId", "=", filter.userId!)
              .select("thread_archives.threadId"),
          ),
        ),
      );
      limitQuery = limitQuery.where(({ not, exists, selectFrom }) =>
        not(
          exists(
            selectFrom("thread_archives")
              .whereRef(
                "thread_archives.threadId",
                "=",
                "inbox_messages.threadId",
              )
              .where("thread_archives.userId", "=", filter.userId!)
              .select("thread_archives.threadId"),
          ),
        ),
      );
    }
  }

  if (filter.amenityBookingId) {
    query = query.where(
      "inbox_messages.amenityBookingId",
      "=",
      filter.amenityBookingId,
    );

    limitQuery = limitQuery.where(
      "inbox_messages.amenityBookingId",
      "=",
      filter.amenityBookingId,
    );
  }

  if (filter.strataId) {
    query = query.where("inbox_messages.strataId", "=", filter.strataId);
    limitQuery = limitQuery.where(
      "inbox_messages.strataId",
      "=",
      filter.strataId,
    );
  }

  if (filter.senderUserId) {
    query = query.where(
      "inbox_messages.senderUserId",
      "=",
      filter.senderUserId,
    );
    limitQuery = limitQuery.where(
      "inbox_messages.senderUserId",
      "=",
      filter.senderUserId,
    );
  }

  const limit = pagination.limit ?? 10;
  const offset = pagination.offset ?? 0;

  query = query.orderBy("inbox_messages.sentAt", "desc");

  const [results, totalRow] = await Promise.all([
    query.offset(offset).limit(limit).execute(),
    limitQuery.executeTakeFirst(),
  ]);

  return { results, total: totalRow?.count ?? 0 };
}
