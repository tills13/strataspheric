import { db } from "..";
import { r2 } from "../r2";

// TODO: convert to soft deletion with option for hard deletion
export async function deleteStrata(strataId: string) {
  // Fetch file paths before deleting so we can clean up R2
  const files = await db()
    .selectFrom("files")
    .select(["files.id", "files.path"])
    .where("files.strataId", "=", strataId)
    .execute();

  await db()
    .transaction()
    .execute(async (trx) => {
      // Get IDs needed for cascading deletes
      const meetingIds = await trx
        .selectFrom("meetings")
        .select("meetings.id")
        .where("meetings.strataId", "=", strataId)
        .execute()
        .then((rows) => rows.map((r) => r.id));

      const amenityIds = await trx
        .selectFrom("amenities")
        .select("amenities.id")
        .where("amenities.strataId", "=", strataId)
        .execute()
        .then((rows) => rows.map((r) => r.id));

      const widgetIds = await trx
        .selectFrom("strata_widgets")
        .select("strata_widgets.id")
        .where("strata_widgets.strataId", "=", strataId)
        .execute()
        .then((rows) => rows.map((r) => r.id));

      const threadIds = await trx
        .selectFrom("inbox_messages")
        .select("inbox_messages.threadId")
        .where("inbox_messages.strataId", "=", strataId)
        .execute()
        .then((rows) => [...new Set(rows.map((r) => r.threadId))]);

      const fileIds = files.map((f) => f.id);

      // Delete meeting-related junction tables
      if (meetingIds.length > 0) {
        await trx
          .deleteFrom("meeting_agenda_items")
          .where("meeting_agenda_items.meetingId", "in", meetingIds)
          .execute();

        await trx
          .deleteFrom("meeting_files")
          .where("meeting_files.meetingId", "in", meetingIds)
          .execute();

        await trx
          .deleteFrom("meeting_minutes")
          .where("meeting_minutes.meetingId", "in", meetingIds)
          .execute();

        await trx
          .deleteFrom("meeting_attendees")
          .where("meeting_attendees.meetingId", "in", meetingIds)
          .execute();

        await trx
          .deleteFrom("meetings")
          .where("meetings.strataId", "=", strataId)
          .execute();
      }

      // Delete amenity bookings
      if (amenityIds.length > 0) {
        await trx
          .deleteFrom("amenity_bookings")
          .where("amenity_bookings.amenityId", "in", amenityIds)
          .execute();

        await trx
          .deleteFrom("amenities")
          .where("amenities.strataId", "=", strataId)
          .execute();
      }

      // Delete widget-related junction tables
      if (widgetIds.length > 0) {
        await trx
          .deleteFrom("widget_events")
          .where("widget_events.widgetId", "in", widgetIds)
          .execute();

        await trx
          .deleteFrom("widget_files")
          .where("widget_files.widgetId", "in", widgetIds)
          .execute();

        await trx
          .deleteFrom("widget_info")
          .where("widget_info.widgetId", "in", widgetIds)
          .execute();

        await trx
          .deleteFrom("strata_widgets")
          .where("strata_widgets.strataId", "=", strataId)
          .execute();
      }

      // Delete inbox-related data
      if (threadIds.length > 0) {
        await trx
          .deleteFrom("inbox_thread_chats")
          .where("inbox_thread_chats.threadId", "in", threadIds)
          .execute();

        await trx
          .deleteFrom("thread_emails")
          .where("thread_emails.threadId", "in", threadIds)
          .execute();
      }

      await trx
        .deleteFrom("inbox_messages")
        .where("inbox_messages.strataId", "=", strataId)
        .execute();

      // Delete invoices
      await trx
        .deleteFrom("invoices")
        .where("invoices.strataId", "=", strataId)
        .execute();

      // Delete events
      await trx
        .deleteFrom("events")
        .where("events.strataId", "=", strataId)
        .execute();

      // Delete files (nullify references first)
      if (fileIds.length > 0) {
        await trx
          .deleteFrom("files")
          .where("files.strataId", "=", strataId)
          .execute();
      }

      // Delete memberships, plan, and strata
      await trx
        .deleteFrom("strata_memberships")
        .where("strata_memberships.strataId", "=", strataId)
        .execute();

      await trx
        .deleteFrom("strata_plans")
        .where("strata_plans.strataId", "=", strataId)
        .execute();

      await trx
        .deleteFrom("stratas")
        .where("stratas.id", "=", strataId)
        .executeTakeFirstOrThrow();
    });

  // Clean up R2 files outside the transaction
  const filePaths = files.map((f) => f.path).filter(Boolean);

  if (filePaths.length > 0) {
    await r2().delete(filePaths);
  }
}
