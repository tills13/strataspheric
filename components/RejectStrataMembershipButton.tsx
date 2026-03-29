"use client";

import { useRouter } from "next/navigation";

import { deleteStrataMembershipAction } from "../app/@app/dashboard/membership/actions";
import { StrataMembership } from "../data/memberships/getStrataMembership";
import { ConfirmButton } from "./ConfirmButton";
import { CircleXIcon } from "./Icon/CircleXIcon";

interface Props
  extends Omit<React.ComponentProps<typeof ConfirmButton>, "onClickConfirm"> {
  membership: StrataMembership;
}

export function RejectStrataMembershipButton({
  membership,
  ...delegateProps
}: Props) {
  const router = useRouter();

  return (
    <ConfirmButton
      confirmModalTitle="Reject Member"
      confirmModalDescription={`Are you sure you want to reject ${membership.name}? This will remove their pending membership.`}
      confirmModalConfirmButtonType="error"
      onClickConfirm={async () => {
        await deleteStrataMembershipAction(membership.userId);
        router.push("/dashboard/membership");
      }}
      icon={<CircleXIcon />}
      color="error"
      style="secondary"
      fullWidth
      {...delegateProps}
    >
      Reject
    </ConfirmButton>
  );
}
