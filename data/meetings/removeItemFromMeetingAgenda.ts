import { db } from "..";

export async function removeItemFromAgenda(meetingId: string, itemId: string) {
  return db
    .deleteFrom("meeting_agenda_items")
    .where("meeting_agenda_items.meetingId", "=", meetingId)
    .where("meeting_agenda_items.id", "=", itemId)
    .execute();
}
