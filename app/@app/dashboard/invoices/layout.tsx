import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { notFound } from "next/navigation";

import type { LayoutProps } from "../../../../.next/types/app/@app/dashboard/invoices/layout";
import { auth } from "../../../../auth";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { can, p } from "../../../../data/users/permissions";
import { CreateNewInvoiceButton } from "./CreateNewInvoiceButton";
import { upsertInvoiceAction } from "./actions";

export const runtime = "edge";

export default async function InvoicesLayout({
  children,
  invoiceDetails,
}: LayoutProps) {
  const session = await auth();

  if (!can(session?.user, "stratas.invoices.view")) {
    notFound();
  }

  return (
    <div className={styles.pageContainer}>
      <Group className={s({ mb: "normal" })} justify="space-between">
        <Header as="h2">Invoices</Header>
        <div>
          {can(session?.user, p("stratas", "invoices", "create")) && (
            <CreateNewInvoiceButton
              upsertInvoice={upsertInvoiceAction.bind(undefined, undefined)}
            />
          )}
        </div>
      </Group>

      <div className={styles.invoicesContainer}>
        {children}

        <div className={styles.invoicesSidePanel}>{invoiceDetails}</div>
      </div>
    </div>
  );
}
