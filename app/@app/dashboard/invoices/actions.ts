"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../auth";
import { Invoice } from "../../../../data";
import { createInvoice } from "../../../../data/invoices/createInvoice";
import { updateInvoice } from "../../../../data/invoices/updateInvoice";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import * as formdata from "../../../../utils/formdata";

export async function markInvoiceAsPaidAction(invoiceId: string) {
  const session = await auth();

  if (!can(session?.user, p("stratas", "invoices", "edit"))) {
    return;
  }

  await updateInvoice(invoiceId, { isPaid: 1 });

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard/invoices/*");
  revalidatePath("/dashboard/inbox/*");
}

export async function upsertInvoiceAction(
  invoiceId: string | undefined,
  fd: FormData,
): Promise<Invoice | undefined> {
  const strata = await mustGetCurrentStrata();

  const identifier = formdata.getString(fd, "identifier");
  const description = formdata.getString(fd, "description");
  const amount = formdata.getFloat(fd, "amount");
  const dueBy = formdata.getTimestamp(fd, "dueBy");

  if (invoiceId) {
    return updateInvoice(invoiceId, {
      identifier,
      description,
      amount,
      dueBy,
    });
  }

  return createInvoice({
    strataId: strata.id,
    type: "incoming",
    identifier,
    description,
    amount,
    dueBy,
  });
}
