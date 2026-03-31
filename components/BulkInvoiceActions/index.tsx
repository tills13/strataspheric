"use client";

import { useContext } from "react";

import {
  archiveInvoicesAction,
  markInvoicesAsPaidAction,
} from "../../app/@app/dashboard/invoices/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActionButtonInner, BulkActionButtons } from "../BulkActionButton";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { TableSelectedValuesCtx } from "../Table/TableSelectProvider";

export function BulkInvoiceActions() {
  const selectedRows = useContext(TableSelectedValuesCtx);
  const label = `${selectedRows.length} ${pluralize(
    "invoice",
    selectedRows.length,
  )}`;

  return (
    <BulkActionButtons noun="invoice">
      <BulkActionButtonInner
        action={markInvoicesAsPaidAction}
        icon={<CircleCheckIcon />}
        title={`Mark ${label} as paid`}
        color="success"
      />
      <BulkActionButtonInner
        action={archiveInvoicesAction}
        icon={<ArchiveIcon />}
        title={`Archive ${label}`}
      />
    </BulkActionButtons>
  );
}
