"use client";

import { useContext, useTransition } from "react";

import { unarchiveThreadsAction } from "../../app/@app/dashboard/inbox/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { UnarchiveIcon } from "../Icon/UnarchiveIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export function UnarchiveSelectedInboxMessagesButton() {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  return (
    <BulkActions noun="message">
      <Button
        color="primary"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <UnarchiveIcon />}
        onClick={() => {
          startTransition(async () => {
            await unarchiveThreadsAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Unarchive ${selectedRows.length} ${pluralize(
          "message",
          selectedRows.length,
        )}`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
