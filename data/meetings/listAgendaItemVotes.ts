import { db } from "..";

export async function listAgendaItemVotes(agendaItemId: string) {
  return db()
    .selectFrom("meeting_agenda_item_votes")
    .innerJoin("users", "users.id", "meeting_agenda_item_votes.userId")
    .select([
      "meeting_agenda_item_votes.agendaItemId",
      "meeting_agenda_item_votes.userId",
      "meeting_agenda_item_votes.vote",
      "users.name as userName",
    ])
    .where("meeting_agenda_item_votes.agendaItemId", "=", agendaItemId)
    .execute();
}

export type AgendaItemVoteWithUser = Awaited<
  ReturnType<typeof listAgendaItemVotes>
>[number];
