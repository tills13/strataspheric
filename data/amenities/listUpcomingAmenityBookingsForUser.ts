import { baseQuery, processRows } from "./getAmenityBooking";

export async function listUpcomingAmenityBookingsForUser(userId: string) {
  const now = Math.floor(Date.now() / 1000);

  const rows = await baseQuery()
    .leftJoin(
      "inbox_messages",
      "amenity_bookings.id",
      "inbox_messages.amenityBookingId",
    )
    .select("inbox_messages.threadId as inboxThreadId")
    .where("amenity_bookings.requesterId", "=", userId)
    .where("events.startDate", ">=", now)
    .orderBy("events.startDate", "asc")
    .execute();

  return processRows(...rows).map((booking, i) => ({
    ...booking,
    inboxThreadId: (rows[i] as { inboxThreadId: string | null }).inboxThreadId,
  }));
}
