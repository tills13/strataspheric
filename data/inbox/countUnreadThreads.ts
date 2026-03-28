import { db } from "..";

export type CountUnreadThreadsFilter = {
  strataId: string;
  senderUserId?: string;
};

export async function countUnreadThreads(
  filter: CountUnreadThreadsFilter,
): Promise<number> {
  let query = db()
    .selectFrom("inbox_messages")
    .select((eb) => eb.fn<number>("count", []).as("count"))
    .where("inbox_messages.id", "=", (eb) => eb.ref("inbox_messages.threadId"))
    .where("inbox_messages.isUnread", "=", 1)
    .where("inbox_messages.archivedAt", "is", null)
    .where("inbox_messages.strataId", "=", filter.strataId);

  if (filter.senderUserId) {
    query = query.where(
      "inbox_messages.senderUserId",
      "=",
      filter.senderUserId,
    );
  }

  const result = await query.executeTakeFirst();
  return result?.count ?? 0;
}
