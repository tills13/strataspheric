import Stripe from "stripe";

import { Group } from "../../../../components/Group";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

interface Props {
  invoice: Stripe.Invoice;
}

export function SubscriptionInvoiceTableRow({ invoice }: Props) {
  return (
    <TableRow
      rowId={invoice.id}
      link={invoice.invoice_pdf ?? undefined}
      content={
        <Group flex={1}>
          <Text fw="bold" color="primary">
            {invoice.created ? formatDate(invoice.created) : "—"}
          </Text>
          <Text color="secondary">{invoice.number ?? invoice.id}</Text>
        </Group>
      }
      rowEnd={
        <Group gap="normal">
          <Text>{formatAmount(invoice.amount_due, invoice.currency)}</Text>
          <Text
            color={
              invoice.status === "paid"
                ? "success"
                : invoice.status === "void"
                  ? "secondary"
                  : "primary"
            }
          >
            {invoice.status}
          </Text>
        </Group>
      }
    />
  );
}
