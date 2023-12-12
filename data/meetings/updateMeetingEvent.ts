import { EventUpdate, db } from "..";

export async function updateMeetingEvent(
  meetingId: string,
  eventUpdate: EventUpdate,
) {
  return db
    .updateTable("events")
    .set(eventUpdate)
    .where("events.id", "=", (eb) =>
      eb
        .selectFrom("meetings")
        .select("meetings.eventId")
        .where("meetings.id", "=", meetingId),
    )
    .execute();
}
