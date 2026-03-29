"use client";

import { useContext, useTransition } from "react";

import { archiveInvoicesAction } from "../../app/@app/dashboard/invoices/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export default function ArchiveSelectedInvoicesButton() {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  return (
    <BulkActions noun="invoice">
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
        title={`Archive ${selectedRows.length} ${pluralize(
          "invoice",
          selectedRows.length,
        )}`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
