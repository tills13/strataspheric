import { db } from "..";

export async function reorderAgendaItem(
  meetingId: string,
  itemId: string,
  direction: "up" | "down",
) {
  const items = await db()
    .selectFrom("meeting_agenda_items")
    .select(["id", "sortOrder"])
    .where("meetingId", "=", meetingId)
    .orderBy("sortOrder", "asc")
    .orderBy("id", "asc")
    .execute();

  const currentIndex = items.findIndex((item) => item.id === itemId);
  if (currentIndex === -1) return;

  const swapIndex =
    direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (swapIndex < 0 || swapIndex >= items.length) return;

  const current = items[currentIndex];
  const swap = items[swapIndex];

  await db()
    .updateTable("meeting_agenda_items")
    .set({ sortOrder: swap.sortOrder })
    .where("id", "=", current.id)
    .execute();

  await db()
    .updateTable("meeting_agenda_items")
    .set({ sortOrder: current.sortOrder })
    .where("id", "=", swap.id)
    .execute();
}
