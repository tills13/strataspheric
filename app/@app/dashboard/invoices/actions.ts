"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { Invoice } from "../../../../data";
import { createInvoice } from "../../../../data/invoices/createInvoice";
import { deleteInvoice } from "../../../../data/invoices/deleteInvoice";
import { updateInvoice } from "../../../../data/invoices/updateInvoice";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { stripe } from "../../../../data/stripe";
import { can } from "../../../../data/users/permissions";
import * as formdata from "../../../../utils/formdata";

export async function markInvoiceAsPaidAction(invoiceId: string) {
  const session = await auth();

  if (!can(session?.user, "stratas.invoices.edit")) {
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

async function syncStripeInvoice(invoice: Invoice, stripeAccountId: string) {
  const { payerEmail } = invoice;

  if (!payerEmail) {
    return;
  }

  // If already synced, void and recreate
  if (invoice.stripeInvoiceId) {
    try {
      await stripe.invoices.voidInvoice(invoice.stripeInvoiceId, {
        stripeAccount: stripeAccountId,
      });
    } catch {
      // ignore if already voided/paid
    }
  }

  // Find or create customer on the Connect account
  const existingCustomers = await stripe.customers.list(
    { email: payerEmail, limit: 1 },
    { stripeAccount: stripeAccountId },
  );

  const customer =
    existingCustomers.data[0] ??
    (await stripe.customers.create(
      { email: payerEmail, name: invoice.payee ?? undefined },
      { stripeAccount: stripeAccountId },
    ));

  // Create invoice item
  await stripe.invoiceItems.create(
    {
      customer: customer.id,
      amount: Math.round(invoice.amount * 100),
      currency: "cad",
      description: invoice.description ?? invoice.identifier,
    },
    { stripeAccount: stripeAccountId },
  );

  // Create invoice
  const stripeInvoice = await stripe.invoices.create(
    {
      customer: customer.id,
      auto_advance: false,
      collection_method: "send_invoice",
      days_until_due: 30,
    },
    { stripeAccount: stripeAccountId },
  );

  const stripeInvoiceId = stripeInvoice.id;

  if (!stripeInvoiceId) {
    throw new Error("Failed to create Stripe invoice: missing id");
  }

  // Finalize
  const finalizedInvoice = await stripe.invoices.finalizeInvoice(
    stripeInvoiceId,
    {},
    { stripeAccount: stripeAccountId },
  );

  const finalizedInvoiceId = finalizedInvoice.id;

  if (!finalizedInvoiceId) {
    throw new Error("Failed to finalize Stripe invoice: missing id");
  }

  // Send email to payee
  await stripe.invoices.sendInvoice(finalizedInvoiceId, {
    stripeAccount: stripeAccountId,
  });

  await updateInvoice(invoice.id, {
    stripeInvoiceId: finalizedInvoiceId,
    stripeInvoiceUrl: finalizedInvoice.hosted_invoice_url ?? null,
    updatedAt: new Date().getTime(),
  });
}

export async function upsertInvoiceAction(
  invoiceId: string | undefined,
  fd: FormData,
): Promise<Invoice> {
  const strata = await mustGetCurrentStrata();

  const identifier = formdata.getString(fd, "identifier");
  const description = formdata.getString(fd, "description");
  const amount = formdata.getFloat(fd, "amount");
  const fileId = formdata.getString(fd, "fileId");
  const dueBy = formdata.getTimestamp(fd, "dueBy");
  const payerEmail = formdata.getString(fd, "payerEmail") || null;

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
      payerEmail,
      updatedAt: new Date().getTime(),
    });
  } else {
    invoice = await createInvoice({
      amount,
      description,
      dueBy,
      fileId,
      identifier,
      payerEmail,
      strataId: strata.id,
      status: "final",
      type: "incoming",
      updatedAt: new Date().getTime(),
    });
  }

  // Sync to Stripe if conditions are met
  if (
    invoice.status === "final" &&
    invoice.type === "incoming" &&
    strata.stripeAccountStatus === "active" &&
    strata.stripeAccountId &&
    payerEmail
  ) {
    await syncStripeInvoice(invoice, strata.stripeAccountId);
  }

  revalidatePath("/dashboard/invoices");
  return invoice;
}

export async function deleteInvoiceAction(invoiceId: string) {
  await deleteInvoice(invoiceId);
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
