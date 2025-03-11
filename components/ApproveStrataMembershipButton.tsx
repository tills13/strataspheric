"use client";

import React, { useTransition } from "react";

import { CircleCheckIcon } from "./Icon/CircleCheckIcon";
import { StatusButton } from "./StatusButton";

type StatusButtonProps = React.ComponentProps<typeof StatusButton>;

interface Props extends Omit<StatusButtonProps, "isPending" | "onClick"> {
  approveStrataMembership: () => void;
}

export function ApproveStrataMembershipButton({
  approveStrataMembership,
  ...delegateProps
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <StatusButton
      onClick={() =>
        startTransition(() => {
          approveStrataMembership();
        })
      }
      iconRight={<CircleCheckIcon />}
      isPending={isPending}
      color="success"
      {...delegateProps}
    >
      Approve
    </StatusButton>
  );
}
