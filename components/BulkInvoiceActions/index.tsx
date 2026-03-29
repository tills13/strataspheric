"use client";

import { useContext, useTransition } from "react";

import {
  archiveInvoicesAction,
  markInvoicesAsPaidAction,
} from "../../app/@app/dashboard/invoices/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export function BulkInvoiceActions() {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  const label = `${selectedRows.length} ${pluralize(
    "invoice",
    selectedRows.length,
  )}`;

  return (
    <BulkActions noun="invoice">
      <Button
        color="success"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <CircleCheckIcon />}
        onClick={() => {
          startTransition(async () => {
            await markInvoicesAsPaidAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Mark ${label} as paid`}
        size="small"
        style="tertiary"
      />
      <Button
        color="primary"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <ArchiveIcon />}
        onClick={() => {
          startTransition(async () => {
            await archiveInvoicesAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Archive ${label}`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
