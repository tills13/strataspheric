import { uuidv7 } from "uuidv7";

import { NewInboxMessage, db } from "..";

export function createInboxMessage({
  threadId,
  ...rest
}: Omit<NewInboxMessage, "id" | "threadId" | "viewId"> & {
  threadId?: string;
}) {
  return db
    .insertInto("inbox_messages")
    .values({
      id: uuidv7(),
      threadId: threadId || uuidv7(),
      viewId: threadId ? undefined : uuidv7(),
      ...rest,
    })
    .execute();
}
