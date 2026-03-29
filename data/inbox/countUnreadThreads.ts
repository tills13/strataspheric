import { db } from "..";

export type CountUnreadThreadsFilter = {
  strataId: string;
  userId: string;
  senderUserId?: string;
};

export async function countUnreadThreads(
  filter: CountUnreadThreadsFilter,
): Promise<number> {
  let query = db()
    .selectFrom("inbox_messages")
    .select((eb) => eb.fn<number>("count", []).as("count"))
    .where("inbox_messages.id", "=", (eb) => eb.ref("inbox_messages.threadId"))
    .where("inbox_messages.strataId", "=", filter.strataId)
    .where(({ not, exists, selectFrom }) =>
      not(
        exists(
          selectFrom("thread_archives")
            .whereRef(
              "thread_archives.threadId",
              "=",
              "inbox_messages.threadId",
            )
            .where("thread_archives.userId", "=", filter.userId)
            .select("thread_archives.threadId"),
        ),
      ),
    )
    .where(({ not, exists, selectFrom }) =>
      not(
        exists(
          selectFrom("thread_reads")
            .whereRef("thread_reads.threadId", "=", "inbox_messages.threadId")
            .where("thread_reads.userId", "=", filter.userId)
            .select("thread_reads.threadId"),
        ),
      ),
    );

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
