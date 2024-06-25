import { db } from "..";

export function getInvoice(strataId: string, invoiceId: string) {
  let query = db
    .selectFrom("invoices")
    .selectAll()
    .where("invoices.strataId", "=", strataId)
    .where("invoices.id", "=", invoiceId);

  return query.executeTakeFirst();
}
