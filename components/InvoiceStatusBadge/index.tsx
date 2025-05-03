import isAfter from "date-fns/isAfter";

import { Invoice } from "../../data/invoices/getInvoice";
import { parseTimestamp } from "../../utils/datetime";
import { Badge } from "../Badge";

interface Props {
  invoice: Invoice;
}

export function InvoiceStatusBadge({ invoice }: Props) {
  const isOverdue =
    invoice.dueBy && isAfter(new Date(), parseTimestamp(invoice.dueBy));

  return (
    <Badge
      level={invoice.isPaid === 1 ? "success" : isOverdue ? "error" : "warning"}
    >
      {invoice.isPaid === 1 ? "paid" : isOverdue ? "overdue" : "unpaid"}
    </Badge>
  );
}
