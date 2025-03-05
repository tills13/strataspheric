import { uuidv7 } from "uuidv7";

import { Invoice, NewInvoice, db } from "..";

export async function createInvoice(
  newInvoice: Omit<NewInvoice, "id">,
): Promise<Invoice> {
  return db
    .insertInto("invoices")
    .values({
      id: uuidv7(),
      ...newInvoice,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
