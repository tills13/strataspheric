import * as styles from "./style.css";

import { Suspense } from "react";

import { InvoiceChipSkeleton } from "../../../../components/InvoiceChip/Skeleton";
import { StrataInvoicesList } from "./StrataInvoicesList";

export default function Page() {
  return (
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
      <StrataInvoicesList />
    </Suspense>
  );
}
