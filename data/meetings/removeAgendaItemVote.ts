import { db } from "..";

export async function removeAgendaItemVote(
  agendaItemId: string,
  userId: string,
) {
  return db()
    .deleteFrom("meeting_agenda_item_votes")
    .where("agendaItemId", "=", agendaItemId)
    .where("userId", "=", userId)
    .execute();
}
