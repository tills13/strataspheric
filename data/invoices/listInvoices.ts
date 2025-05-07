import { db } from "..";
import { PaginatedResults, Pagination } from "../types";
import { Invoice } from "./getInvoice";

type ListInvoicesFilter = {
  strataId?: string;
  payeeId?: string;
};
export type ListInvoicesPagination = Pagination<"invoices", Invoice>;

export async function listInvoices(
  filter: ListInvoicesFilter = {},
  pagination: ListInvoicesPagination = {},
): Promise<PaginatedResults<Invoice>> {
  let limitQuery = db
    .selectFrom("invoices")
    .select((eb) => eb.fn<number>("count", []).as("count"));
  let query = db.selectFrom("invoices").selectAll();

  if (filter.strataId) {
    limitQuery = limitQuery.where("invoices.strataId", "=", filter.strataId);
    query = query.where("invoices.strataId", "=", filter.strataId);
  }

  if (filter.payeeId) {
    limitQuery = limitQuery.where("invoices.payee", "=", filter.payeeId);
    query = query.where("invoices.payee", "=", filter.payeeId);
  }

  const orderBy = pagination.orderBy || "invoices.createdAt desc";
  const limit = pagination.limit ?? 10;
  const offset = pagination.offset ?? 0;

  const [results, totalRow] = await Promise.all([
    query.orderBy(orderBy).offset(offset).limit(limit).execute(),
    limitQuery.executeTakeFirst(),
  ]);

  return { results, total: totalRow?.count ?? 0 };
}
