import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { auth } from "../../../../auth";
import { Button } from "../../../../components/Button";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { InfoPanel } from "../../../../components/InfoPanel";
import { InvoiceChipSkeleton } from "../../../../components/InvoiceChip/Skeleton";
import { Text } from "../../../../components/Text";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { CreateNewInvoiceButton } from "./CreateNewInvoiceButton";
import { InvoicesList } from "./InvoicesList";
import { upsertInvoiceAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  return (
    <>
      <DashboardHeader />

      <div className={styles.pageContainer}>
        <Group className={s({ mb: "normal" })} justify="space-between">
          <Header priority={2}>Invoices</Header>
          <div>
            {can(session?.user, p("stratas", "invoices", "create")) && (
              <CreateNewInvoiceButton
                upsertInvoice={upsertInvoiceAction.bind(undefined, undefined)}
              />
            )}
          </div>
        </Group>

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
            <InfoPanel>
              <Text>Select an invoice to see details.</Text>
            </InfoPanel>
          </div>
        </div>
      </div>
    </>
  );
}
