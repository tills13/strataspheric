"use client";

import React, { useTransition } from "react";

import { approveStrataMembershipAction } from "../app/@app/dashboard/membership/actions";
import { StrataMembership } from "../data/memberships/getStrataMembership";
import { CircleCheckIcon } from "./Icon/CircleCheckIcon";
import { StatusButton } from "./StatusButton";

type StatusButtonProps = React.ComponentProps<typeof StatusButton>;

interface Props extends Omit<StatusButtonProps, "isPending" | "onClick"> {
  membership: StrataMembership;
}

export function ApproveStrataMembershipButton({
  membership,
  ...delegateProps
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <StatusButton
      onClick={() =>
        startTransition(() => approveStrataMembershipAction(membership.id))
      }
      icon={<CircleCheckIcon />}
      isPending={isPending}
      color="success"
      {...delegateProps}
    >
      Approve
    </StatusButton>
  );
}
