import { uuidv7 } from "uuidv7";

import { Invoice, NewInvoice, db } from "..";

type AutoIdentifierNewInvoice = Omit<NewInvoice, "id" | "identifier">;

export async function createInvoice(
  newInvoice: AutoIdentifierNewInvoice,
  autoIdentifierPrefix?: string,
): Promise<Invoice>;
export async function createInvoice(
  newInvoice: Omit<NewInvoice, "id">,
): Promise<Invoice>;

export async function createInvoice(
  newInvoice: AutoIdentifierNewInvoice | Omit<NewInvoice, "id">,
  autoIdentifierPrefix?: string,
): Promise<Invoice> {
  return db
    .insertInto("invoices")
    .values({
      id: uuidv7(),
      identifier:
        newInvoice.identifier ||
        ((eb) =>
          eb.fn("concat", [
            autoIdentifierPrefix + " ",
            eb
              .selectFrom("invoices")
              .select(eb.fn("count", []).as("count"))
              .where("invoices.strataId", "=", newInvoice.strataId),
          ])),
      ...newInvoice,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
