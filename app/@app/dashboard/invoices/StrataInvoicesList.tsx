import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { DividerText } from "../../../../components/DividerText";
import { InvoiceChip } from "../../../../components/InvoiceChip";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Money } from "../../../../components/Money";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { markInvoiceAsPaidAction } from "./actions";

export async function StrataInvoicesList() {
  const strata = await mustGetCurrentStrata();
  const invoices = await listInvoices(strata.id);

  return (
    <div className={styles.invoicesList}>
      {invoices.length === 0 && (
        <p className={s({ mb: "large" })}>
          {strata.name} has no invoices on record.
        </p>
      )}
      {invoices.map((invoice) => (
        <InternalLink
          key={invoice.id}
          className={styles.invoicesListInvoiceContainer}
          href={`/dashboard/invoices/${invoice.id}`}
        >
          <InvoiceChip
            invoice={invoice}
            markInvoiceAsPaid={markInvoiceAsPaidAction.bind(
              undefined,
              invoice.id,
            )}
          />
        </InternalLink>
      ))}

      <DividerText
        overrideClassName={styles.totalRevenueTitleDivider}
        gravity="left"
      >
        Total Revenue
      </DividerText>

      <div className={styles.totalRevenueMoneyContainer}>
        <Money
          amount={invoices
            .filter((inv) => inv.isPaid)
            .reduce((acc, i) => acc + i.amount, 0)}
          overrideClassName={styles.totalRevenueMoney}
        />
      </div>
    </div>
  );
}
