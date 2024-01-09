import { db } from "..";

export async function deleteFile(fileId: string) {
  return db.transaction().execute(async (trx) => {
    await trx
      .updateTable("inbox_messages")
      .set({ fileId: null })
      .where("inbox_messages.fileId", "=", fileId)
      .execute();

    await trx
      .updateTable("inbox_thread_chats")
      .set({ fileId: null })
      .where("inbox_thread_chats.fileId", "=", fileId)
      .execute();

    await trx
      .updateTable("invoices")
      .set({ fileId: null })
      .where("invoices.fileId", "=", fileId)
      .execute();

    await trx
      .updateTable("meeting_agenda_items")
      .set({ fileId: null })
      .where("meeting_agenda_items.fileId", "=", fileId)
      .execute();

    await trx
      .deleteFrom("meeting_files")
      .where("meeting_files.fileId", "=", fileId)
      .execute();

    // await trx
    //   .deleteFrom("meeting_minutes")
    //   .where("meeting_minutes.fileId", "=", fileId)
    //   .execute();

    await trx
      .deleteFrom("widget_files")
      .where("widget_files.fileId", "=", fileId)
      .execute();

    await trx.deleteFrom("files").where("files.id", "=", fileId).execute();
  });
}
