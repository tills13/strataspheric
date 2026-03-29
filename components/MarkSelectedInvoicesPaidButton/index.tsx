"use client";

import { useContext, useTransition } from "react";

import { markInvoicesAsPaidAction } from "../../app/@app/dashboard/invoices/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export default function MarkSelectedInvoicesPaidButton() {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

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
        title={`Mark ${selectedRows.length} ${pluralize(
          "invoice",
          selectedRows.length,
        )} as paid`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
