import * as styles from "./style.css";

import { DividerText } from "../../../../components/DividerText";
import { InvoiceChip } from "../../../../components/InvoiceChip";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Money } from "../../../../components/Money";
import { Strata } from "../../../../data";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { markInvoiceAsPaidAction } from "./actions";

interface Props {
  strata: Strata;
}

export async function InvoicesList({ strata }: Props) {
  const invoices = await listInvoices(strata.id);

  return (
    <div className={styles.invoicesList}>
      {invoices.length === 0 && <p>{strata.name} has no invoices on record.</p>}
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
          amount={invoices.reduce(
            (acc, i) => acc + (i.isPaid === 1 ? i.amount : 0),
            0,
          )}
          overrideClassName={styles.totalRevenueMoney}
        />
      </div>
    </div>
  );
}
