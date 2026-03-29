import { db } from "..";

export function archiveInvoices(invoiceIds: string[]) {
  if (invoiceIds.length === 0) return Promise.resolve();

  const now = Math.floor(Date.now() / 1000);

  return db()
    .updateTable("invoices")
    .set({ archivedAt: now })
    .where("invoices.id", "in", invoiceIds)
    .execute();
}
