import * as styles from "../style.css";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { InvoiceChipSkeleton } from "../../../../../components/InvoiceChip/Skeleton";
import { getInvoice } from "../../../../../data/invoices/getInvoice";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { InvoicesList } from "../InvoicesList";

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
          <InvoicesList strataId={strata.id} />
        </Suspense>

        <div className={styles.invoicesSidePanel}>
          <pre>{JSON.stringify(invoice, undefined, 2)}</pre>
        </div>
      </div>
    </>
  );
}
