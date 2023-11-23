import { uuidv7 } from "uuidv7";

import { NewInboxThreadChat, db } from "..";

export function createInboxThreadChat(
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
