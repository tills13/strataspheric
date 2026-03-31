"use client";

import { useContext } from "react";

import {
  bulkApproveStrataMembershipsAction,
  bulkRejectStrataMembershipsAction,
} from "../../app/@app/dashboard/membership/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActionButtonInner, BulkActionButtons } from "../BulkActionButton";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";
import { TableSelectedValuesCtx } from "../Table/TableSelectProvider";

export function BulkMembershipActions() {
  const selectedRows = useContext(TableSelectedValuesCtx);
  const label = `${selectedRows.length} ${pluralize(
    "member",
    selectedRows.length,
  )}`;

  return (
    <BulkActionButtons noun="member">
      <BulkActionButtonInner
        action={bulkApproveStrataMembershipsAction}
        icon={<CircleCheckIcon />}
        title={`Approve ${label}`}
        color="success"
      />
      <BulkActionButtonInner
        action={bulkRejectStrataMembershipsAction}
        icon={<CircleXIcon />}
        title={`Reject ${label}`}
        color="error"
      />
    </BulkActionButtons>
  );
}
