import { Invoice, InvoiceUpdate, db } from "..";

export async function updateInvoice(
  invoiceId: string,
  invoiceUpdate: InvoiceUpdate,
): Promise<Invoice> {
  return db
    .updateTable("invoices")
    .set(invoiceUpdate)
    .where("invoices.id", "=", invoiceId)
    .returningAll()
    .executeTakeFirstOrThrow();
}
