import { db } from "..";

export function markThreadRead(userId: string, threadId: string) {
  return db()
    .insertInto("thread_reads")
    .values({ userId, threadId })
    .onConflict((oc) =>
      oc.columns(["userId", "threadId"]).doUpdateSet({
        readAt: (eb) => eb.fn("strftime", [eb.val("%s"), eb.val("now")]),
      }),
    )
    .execute();
}
