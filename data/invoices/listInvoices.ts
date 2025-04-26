import { db } from "..";
import { Invoice } from "./getInvoice";

type ListInvoicesFilter = {
  strataId?: string;
  payeeId?: string;
};

export function listInvoices(
  filter: ListInvoicesFilter = {},
): Promise<Invoice[]> {
  let query = db.selectFrom("invoices").selectAll();

  if (filter.strataId) {
    query = query.where("invoices.strataId", "=", filter.strataId);
  }

  if (filter.payeeId) {
    query = query.where("invoices.payee", "=", filter.payeeId);
  }

  return query.execute();
}
