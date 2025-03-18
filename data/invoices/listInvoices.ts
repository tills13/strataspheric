import { db } from "..";

export function listInvoices(strataId: string, userId?: string | undefined) {
  let query = db
    .selectFrom("invoices")
    .selectAll()
    .where("invoices.strataId", "=", strataId);

  if (userId) {
    query = query.where("invoices.payee", "=", userId);
  }

  return query.execute();
}
