import { File, InboxMessage, Invoice, db } from "..";

export async function getThreadMessages(
  threadId: string,
  viewId?: string | undefined,
) {
  let query = db
    .selectFrom("inbox_messages")
    .leftJoin("users", "inbox_messages.senderUserId", "users.id")
    .leftJoin("files", "inbox_messages.fileId", "files.id")
    .leftJoin("invoices", "inbox_messages.invoiceId", "invoices.id")
    .select((eb) => [
      "inbox_messages.id",
      "inbox_messages.subject",
      "inbox_messages.message",
      "inbox_messages.threadId",
      "inbox_messages.viewId",
      "inbox_messages.isUnread",
      "inbox_messages.sentAt",
      "inbox_messages.senderUserId",
      "inbox_messages.senderPhoneNumber",
      "inbox_messages.strataId",
      "inbox_messages.fileId",

      "files.createdAt as fileCreatedAt",
      "files.description as fileDescription",
      "files.id as fileId",
      "files.isPublic as fileIsPublic",
      "files.name as fileName",
      "files.path as filePath",
      "files.sizeBytes as fileSizeBytes",
      "files.strataId as fileStrataId",
      "files.uploaderId as fileUploaderId",

      "invoices.amount as invoiceAmount",
      "invoices.createdAt as invoiceCreatedAt",
      "invoices.description as invoiceDescription",
      "invoices.dueBy as invoiceDueBy",
      "invoices.fileId as invoiceFileId",
      "invoices.id as invoiceId",
      "invoices.identifier as invoiceIdentifier",
      "invoices.isPaid as invoiceIsPaid",
      "invoices.strataId as invoiceStrataId",
      "invoices.type as invoiveType",

      eb.fn
        .coalesce("users.name", "inbox_messages.senderName")
        .as("senderName"),
      eb.fn
        .coalesce("users.email", "inbox_messages.senderEmail")
        .as("senderEmail"),
    ])
    .where("inbox_messages.threadId", "=", threadId);

  if (viewId) {
    query = query.where("inbox_messages.viewId", "=", viewId);
  }

  const result = await query.orderBy("inbox_messages.sentAt asc").execute();

  return result.map(
    ({
      fileCreatedAt,
      fileDescription,
      fileId,
      fileIsPublic,
      fileName,
      filePath,
      fileSizeBytes,
      fileStrataId,
      fileUploaderId,

      invoiceAmount,
      invoiceCreatedAt,
      invoiceDescription,
      invoiceDueBy,
      invoiceFileId,
      invoiceId,
      invoiceIdentifier,
      invoiceIsPaid,
      invoiceStrataId,
      invoiveType,

      ...rest
    }) => {
      return {
        ...rest,
        file: fileId
          ? ({
              createdAt: fileCreatedAt,
              description: fileDescription,
              id: fileId,
              isPublic: fileIsPublic,
              name: fileName,
              path: filePath,
              sizeBytes: fileSizeBytes,
              strataId: fileStrataId,
              uploaderId: fileUploaderId,
            } as File)
          : undefined,
        invoice: invoiceId
          ? ({
              amount: invoiceAmount,
              createdAt: invoiceCreatedAt,
              description: invoiceDescription,
              dueBy: invoiceDueBy,
              fileId: invoiceFileId,
              id: invoiceId,
              identifier: invoiceIdentifier,
              isPaid: invoiceIsPaid,
              strataId: invoiceStrataId,
              type: invoiveType,
            } as Invoice)
          : undefined,
      };
    },
  );
}
