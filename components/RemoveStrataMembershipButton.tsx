"use client";

import { useRouter } from "next/navigation";

import { deleteStrataMembershipAction } from "../app/@app/dashboard/membership/actions";
import { StrataMembership } from "../data/memberships/getStrataMembership";
import { ConfirmButton } from "./ConfirmButton";
import { DeleteIcon } from "./Icon/DeleteIcon";

interface Props extends Omit<React.ComponentProps<typeof ConfirmButton>, "onClickConfirm"> {
  membership: StrataMembership;
}

export function RemoveStrataMembershipButton({
  membership,
  ...delegateProps
}: Props) {
  const router = useRouter();

  return (
    <ConfirmButton
      confirmModalTitle="Remove Member"
      confirmModalDescription={`Are you sure you want to remove ${membership.name} from this strata? This action cannot be undone.`}
      confirmModalConfirmButtonType="error"
      onClickConfirm={async () => {
        await deleteStrataMembershipAction(membership.userId);
        router.push("/dashboard/membership");
      }}
      icon={<DeleteIcon />}
      color="error"
      style="secondary"
      fullWidth
      {...delegateProps}
    >
      Remove Member
    </ConfirmButton>
  );
}
