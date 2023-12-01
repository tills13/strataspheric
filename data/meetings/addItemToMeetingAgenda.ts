import { uuidv7 } from "uuidv7";

import { NewMeetingAgendaItem, db } from "..";

export async function addItemToMeetingAgenda(
  meetingId: string,
  newMeetingAgendaItem: Omit<NewMeetingAgendaItem, "id" | "meetingId">,
) {
  return db
    .insertInto("meeting_agenda_items")
    .values({ id: uuidv7(), meetingId, ...newMeetingAgendaItem })
    .execute();
}
