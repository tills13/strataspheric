"use client";

import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { deleteStrataAction } from "./actions";

interface Props {
  strataId: string;
}

export function DeleteStrataButton({ strataId }: Props) {
  const deleteWithId = deleteStrataAction.bind(null, strataId);

  return (
    <ConfirmButton
      color="error"
      confirmModalTitle="Delete Strata"
      confirmModalDescription="This will permanently delete this strata and all associated data including files, invoices, meetings, and memberships. This action cannot be undone."
      onClickConfirm={() => deleteWithId()}
    >
      Delete Strata
    </ConfirmButton>
  );
}
