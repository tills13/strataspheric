import { AgendaItemVoteValue, db } from "..";

export async function recordAgendaItemVote(
  agendaItemId: string,
  userId: string,
  vote: AgendaItemVoteValue,
) {
  return db()
    .insertInto("meeting_agenda_item_votes")
    .values({ agendaItemId, userId, vote })
    .onConflict((oc) =>
      oc.columns(["agendaItemId", "userId"]).doUpdateSet({ vote }),
    )
    .execute();
}
