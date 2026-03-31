import { NothingHere } from "../../../../components/NothingHere";
import { Table } from "../../../../components/Table";
import { SubscriptionInvoiceTableRow } from "./SubscriptionInvoiceTableRow";
import { SerializedInvoice } from "./SubscriptionPage";

interface Props {
  invoices: SerializedInvoice[];
}

export function SubscriptionInvoiceHistory({ invoices }: Props) {
  if (invoices.length === 0) {
    return <NothingHere>No invoices found.</NothingHere>;
  }

  return (
    <Table>
      {invoices.map((invoice) => (
        <SubscriptionInvoiceTableRow key={invoice.id} invoice={invoice} />
      ))}
    </Table>
  );
}
