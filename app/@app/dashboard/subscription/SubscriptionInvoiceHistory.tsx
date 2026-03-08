import Stripe from "stripe";

import { Table } from "../../../../components/Table";
import { Text } from "../../../../components/Text";
import { SubscriptionInvoiceTableRow } from "./SubscriptionInvoiceTableRow";

interface Props {
  invoices: Stripe.Invoice[];
}

export function SubscriptionInvoiceHistory({ invoices }: Props) {
  if (invoices.length === 0) {
    return <Text color="secondary">No invoices found.</Text>;
  }

  return (
    <Table>
      {invoices.map((invoice) => (
        <SubscriptionInvoiceTableRow key={invoice.id} invoice={invoice} />
      ))}
    </Table>
  );
}
