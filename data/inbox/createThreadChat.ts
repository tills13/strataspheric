import { uuidv7 } from "uuidv7";

import { NewInboxThreadChat, db } from "..";

export function createThreadChat(
  newInboxThreadChat: Omit<NewInboxThreadChat, "id">,
) {
  return db
    .insertInto("inbox_thread_chats")
    .values({
      id: uuidv7(),
      ...newInboxThreadChat,
    })
    .execute();
}
