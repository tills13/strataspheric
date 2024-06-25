import * as styles from "./style.css";

import { InvoiceChip } from "../../../../components/InvoiceChip";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { markInvoiceAsPaidAction } from "./actions";

interface Props {
  strataId: string;
}

export async function InvoicesList({ strataId }: Props) {
  const invoices = await listInvoices(strataId);

  return (
    <div className={styles.invoicesList}>
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
    </div>
  );
}
