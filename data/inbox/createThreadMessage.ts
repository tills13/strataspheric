import { uuidv7 } from "uuidv7";

import { NewInboxMessage, db } from "..";

export function createThreadMessage({
  threadId,
  ...rest
}: Omit<NewInboxMessage, "id" | "threadId" | "viewId"> & {
  threadId?: string;
}) {
  const id = uuidv7();

  return db
    .insertInto("inbox_messages")
    .values({
      id,
      threadId: threadId || id,
      viewId: threadId ? undefined : uuidv7(),
      ...rest,
    })
    .returning(["inbox_messages.viewId", "inbox_messages.threadId"])
    .executeTakeFirstOrThrow();
}
