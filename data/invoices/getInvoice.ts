import { db } from "..";

export type Invoice = Awaited<ReturnType<typeof getInvoice>>;

export function getInvoice(invoiceId: string) {
  const query = db
    .selectFrom("invoices")
    .selectAll()
    .where("invoices.id", "=", invoiceId);

  return query.executeTakeFirstOrThrow();
}
