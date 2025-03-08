import { s } from "../../../../../sprinkles.css";
import * as styles from "../style.css";

import isAfter from "date-fns/isAfter";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreateOrUpdateInvoiceForm } from "../../../../../components/CreateOrUpdateInvoiceForm";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { Date as DateOutput } from "../../../../../components/Date";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { InvoiceChipSkeleton } from "../../../../../components/InvoiceChip/Skeleton";
import { Stack } from "../../../../../components/Stack";
import { getInvoice } from "../../../../../data/invoices/getInvoice";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { parseTimestamp } from "../../../../../utils/datetime";
import { InvoicesList } from "../InvoicesList";
import { upsertInvoiceAction } from "../actions";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { invoiceId: string };
}) {
  const strata = await mustGetCurrentStrata();
  const invoice = await getInvoice(strata.id, params.invoiceId);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      <DashboardHeader />

      <div className={styles.invoicesContainer}>
        <Suspense
          fallback={
            <div className={styles.invoicesList}>
              <div className={styles.invoicesListInvoiceContainer}>
                <InvoiceChipSkeleton />
              </div>
              <div className={styles.invoicesListInvoiceContainer}>
                <InvoiceChipSkeleton />
              </div>
            </div>
          }
        >
          <InvoicesList strata={strata} />
        </Suspense>

        <div className={styles.invoicesSidePanel}>
          {!!invoice.isPaid && (
            <InfoPanel className={s({ mb: "large" })} level="success">
              This invoice was marked paid on{" "}
              <DateOutput timestamp={invoice.updatedAt} />
            </InfoPanel>
          )}

          {!invoice.isPaid &&
            !!invoice.dueBy &&
            isAfter(new Date(), parseTimestamp(invoice.dueBy)) && (
              <InfoPanel className={s({ mb: "large" })} level="warning">
                This invoice is overdue.
              </InfoPanel>
            )}
          <CreateOrUpdateInvoiceForm
            invoice={invoice}
            upsertInvoice={upsertInvoiceAction.bind(undefined, invoice.id)}
          />
        </div>
      </div>
    </>
  );
}
