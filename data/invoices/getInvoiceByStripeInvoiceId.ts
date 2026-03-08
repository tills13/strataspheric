import { Invoice, db } from "..";

export async function getInvoiceByStripeInvoiceId(
  stripeInvoiceId: string,
): Promise<Invoice | undefined> {
  return db()
    .selectFrom("invoices")
    .selectAll()
    .where("invoices.stripeInvoiceId", "=", stripeInvoiceId)
    .executeTakeFirst();
}
