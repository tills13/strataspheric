"use client";

import React, { useTransition } from "react";

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
      isPending={isPending}
      {...delegateProps}
    >
      Approve
    </StatusButton>
  );
}
