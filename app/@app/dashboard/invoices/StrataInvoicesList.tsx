import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { DividerText } from "../../../../components/DividerText";
import { Group } from "../../../../components/Group";
import { InvoiceChip } from "../../../../components/InvoiceChip";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Money } from "../../../../components/Money";
import { Text } from "../../../../components/Text";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export async function StrataInvoicesList() {
  const strata = await mustGetCurrentStrata();
  const invoices = await listInvoices({ strataId: strata.id });

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
          <InvoiceChip invoice={invoice} showMarkPaid={false} />
        </InternalLink>
      ))}

      <DividerText gravity="left" mb="small">
        <Text fontSize="large" fw="bold">
          Total Revenue
        </Text>
      </DividerText>

      <Group justify="end">
        <Money
          amount={invoices
            .filter((inv) => inv.isPaid)
            .reduce((acc, i) => acc + i.amount, 0)}
          fontSize="xl"
        />
      </Group>
    </div>
  );
}
