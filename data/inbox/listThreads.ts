import { db } from "..";
import { Thread } from "./getThread";

export type ListThreadsFilter = {
  amenityBookingId?: string;
  senderUserId?: string;
  strataId?: string;
};

export function listThreads(filter: ListThreadsFilter): Promise<Thread[]> {
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
      eb.fn
        .coalesce("users.name", "inbox_messages.senderName")
        .as("senderName"),
      eb.fn
        .coalesce("users.email", "inbox_messages.senderEmail")
        .as("senderEmail"),
    ])
    .where("inbox_messages.id", "in", (eb) =>
      eb
        .selectFrom("inbox_messages")
        .select((eb) => eb.fn.min("inbox_messages.id").as("id"))
        .groupBy("inbox_messages.threadId"),
    );

  if (filter.amenityBookingId) {
    query = query.where(
      "inbox_messages.amenityBookingId",
      "=",
      filter.amenityBookingId,
    );
  }

  if (filter.strataId) {
    query = query.where("inbox_messages.strataId", "=", filter.strataId);
  }

  if (filter.senderUserId) {
    query = query.where(
      "inbox_messages.senderUserId",
      "=",
      filter.senderUserId,
    );
  }

  return query.orderBy("inbox_messages.sentAt desc").execute();
}
