import { db } from "..";

export async function deleteInvoice(invoiceId: string) {
  return db.transaction().execute(async (txn) => {
    await txn
      .deleteFrom("invoices")
      .where("invoices.id", "=", invoiceId)
      .execute();

    await txn
      .updateTable("inbox_messages")
      .set({ invoiceId: null })
      .where("inbox_messages.invoiceId", "=", invoiceId)
      .execute();

    await txn
      .updateTable("amenity_bookings")
      .set({ invoiceId: null })
      .where("amenity_bookings.invoiceId", "=", invoiceId)
      .execute();
  });
}
