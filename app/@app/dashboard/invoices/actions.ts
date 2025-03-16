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

  await updateInvoice(invoiceId, {
    isPaid: 1,
    updatedAt: new Date().getTime(),
  });

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard/invoices/*");
  revalidatePath("/dashboard/inbox/*");
}

export async function upsertInvoiceAction(
  invoiceId: string | undefined,
  fd: FormData,
): Promise<Invoice> {
  const strata = await mustGetCurrentStrata();
  const session = await auth();

  const identifier = formdata.getString(fd, "identifier");
  const description = formdata.getString(fd, "description");
  const amount = formdata.getFloat(fd, "amount");
  const fileId = formdata.getString(fd, "fileId");
  const dueBy = formdata.getTimestamp(fd, "dueBy");

  if (!amount) {
    throw new Error("invalid");
  }

  let invoice: Invoice;

  if (invoiceId) {
    invoice = await updateInvoice(invoiceId, {
      amount,
      description,
      dueBy,
      fileId,
      identifier,
      updatedAt: new Date().getTime(),
    });
  } else {
    invoice = await createInvoice({
      amount,
      description,
      dueBy,
      fileId,
      identifier,
      strataId: strata.id,
      // payeeId: session?.user.id,
      type: "incoming",
      // @ts-ignore
      updatedAt: new Date().getTime(),
    });
  }

  revalidatePath("/dashboard/invoices");
  return invoice;
}
