"use client";

import { useContext, useTransition } from "react";

import {
  bulkApproveStrataMembershipsAction,
  bulkRejectStrataMembershipsAction,
} from "../../app/@app/dashboard/membership/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export function BulkMembershipActions() {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  const label = `${selectedRows.length} ${pluralize(
    "member",
    selectedRows.length,
  )}`;

  return (
    <BulkActions noun="member">
      <Button
        color="success"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <CircleCheckIcon />}
        onClick={() => {
          startTransition(async () => {
            await bulkApproveStrataMembershipsAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Approve ${label}`}
        size="small"
        style="tertiary"
      />
      <Button
        color="error"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <CircleXIcon />}
        onClick={() => {
          startTransition(async () => {
            await bulkRejectStrataMembershipsAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Reject ${label}`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
