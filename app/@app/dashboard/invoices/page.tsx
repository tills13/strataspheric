import * as styles from "./style.css";

import { Suspense } from "react";

import { InfoPanel } from "../../../../components/InfoPanel";
import { InvoiceChipSkeleton } from "../../../../components/InvoiceChip/Skeleton";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { InvoicesHeader } from "./InvoicesHeader";
import { InvoicesList } from "./InvoicesList";
import { upsertInvoiceAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await mustGetCurrentStrata();

  return (
    <>
      <InvoicesHeader
        upsertInvoice={upsertInvoiceAction.bind(undefined, undefined)}
      />

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
          <InfoPanel>Select an invoice to see details.</InfoPanel>
        </div>
      </div>
    </>
  );
}
