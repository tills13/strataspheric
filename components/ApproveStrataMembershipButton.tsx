"use client";

import { startTransition } from "react";
import { Button } from "./Button";

interface Props {
  approveStrataMembership: () => void;
}

export function ApproveStrataMembershipButton({
  approveStrataMembership,
}: Props) {
  return (
    <Button
      onClick={() =>
        startTransition(() => {
          approveStrataMembership();
        })
      }
      compact
    >
      Approve
    </Button>
  );
}
