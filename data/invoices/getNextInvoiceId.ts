import { db } from "..";

export function getNextInvoiceId(strataId: string) {
  return db
    .selectFrom("invoices")
    .select((eb) => eb.fn<number>("count", []).as("count"))
    .leftJoin("amenity_bookings", "invoices.id", "amenity_bookings.invoiceId")
    .where("invoices.strataId", "=", strataId)
    .where("amenity_bookings.id", "is", null)
    .executeTakeFirstOrThrow();
}
