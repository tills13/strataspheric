import { MeetingAgendaItemUpdate, db } from "..";

export async function updateMeetingAgendaItem(
  itemId: string,
  agendaItemUpdate: MeetingAgendaItemUpdate,
) {
  return db
    .updateTable("meeting_agenda_items")
    .set(agendaItemUpdate)
    .where("meeting_agenda_items.id", "=", itemId)
    .execute();
}
