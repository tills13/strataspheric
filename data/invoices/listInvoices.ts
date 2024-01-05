import { db } from "..";

export function listInvoices(strataId: string) {
  let query = db
    .selectFrom("invoices")
    .selectAll()
    .where("invoices.strataId", "=", strataId);

  return query.execute();
}
