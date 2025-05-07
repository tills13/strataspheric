import { db } from "..";
import { PaginatedResults, Pagination } from "../types";
import { Thread } from "./getThread";

export type ListThreadsFilter = {
  amenityBookingId?: string;
  senderUserId?: string;
  strataId?: string;
};

export type ListThreadsPagination = Pagination<"inbox_messages", Thread>;

export async function listThreads(
  filter: ListThreadsFilter,
  pagination: ListThreadsPagination = {},
): Promise<PaginatedResults<Thread>> {
  let limitQuery = db
    .selectFrom("inbox_messages")
    .select((eb) => eb.fn<number>("count", []).as("count"));

  let query = db
    .selectFrom("inbox_messages")
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
      "inbox_messages.senderPhoneNumber",
      "inbox_messages.strataId",
      "inbox_messages.fileId",
      "inbox_messages.invoiceId",
      "inbox_messages.amenityBookingId",
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

  const orderBy = pagination.orderBy || "inbox_messages.sentAt desc";
  const limit = pagination.limit ?? 10;
  const offset = pagination.offset ?? 0;

  const [results, totalRow] = await Promise.all([
    query.orderBy(orderBy).offset(offset).limit(limit).execute(),
    limitQuery.executeTakeFirst(),
  ]);

  return { results, total: totalRow?.count ?? 0 };
}
