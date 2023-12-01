import { uuidv7 } from "uuidv7";

import { NewMeetingAgendaItem, db } from "..";

export async function addItemToMeetingAgenda(
  newMeetingAgendaItem: Omit<NewMeetingAgendaItem, "id">,
) {
  return db
    .insertInto("meeting_agenda_items")
    .values({ id: uuidv7(), ...newMeetingAgendaItem })
    .execute();
}
