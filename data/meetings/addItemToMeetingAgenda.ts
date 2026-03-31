import { sql } from "kysely";
import { uuidv7 } from "uuidv7";

import { NewMeetingAgendaItem, db } from "..";

export async function addItemToMeetingAgenda(
  meetingId: string,
  newMeetingAgendaItem: Omit<NewMeetingAgendaItem, "id" | "meetingId">,
) {
  const nextOrder = await db()
    .selectFrom("meeting_agenda_items")
    .select(sql<number>`coalesce(max(sortOrder), -1) + 1`.as("nextOrder"))
    .where("meetingId", "=", meetingId)
    .executeTakeFirstOrThrow();

  return db()
    .insertInto("meeting_agenda_items")
    .values({
      id: uuidv7(),
      meetingId,
      sortOrder: nextOrder.nextOrder,
      ...newMeetingAgendaItem,
    })
    .execute();
}

export async function insertAgendaItemAfter(
  meetingId: string,
  afterItemId: string,
  newMeetingAgendaItem: Omit<NewMeetingAgendaItem, "id" | "meetingId">,
) {
  const afterItem = await db()
    .selectFrom("meeting_agenda_items")
    .select(["sortOrder"])
    .where("id", "=", afterItemId)
    .where("meetingId", "=", meetingId)
    .executeTakeFirstOrThrow();

  // Shift all items after the target down by 1
  await db()
    .updateTable("meeting_agenda_items")
    .set({ sortOrder: sql`sortOrder + 1` })
    .where("meetingId", "=", meetingId)
    .where("sortOrder", ">", afterItem.sortOrder)
    .execute();

  return db()
    .insertInto("meeting_agenda_items")
    .values({
      id: uuidv7(),
      meetingId,
      sortOrder: afterItem.sortOrder + 1,
      ...newMeetingAgendaItem,
    })
    .execute();
}
