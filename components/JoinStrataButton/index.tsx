"use client";

import { useTransition } from "react";

import { Strata, StrataMembership } from "../../data";
import { StatusButton } from "../StatusButton";

interface Props {
  joinStrata: () => void;
  strata: Strata;
  strataMembership?: StrataMembership;
}

export function JoinStrataButton({
  joinStrata,
  strata,
  strataMembership,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (strataMembership && strataMembership.role !== "pending") {
    return null;
  }

  return (
    <StatusButton
      color="primary"
      disabled={strataMembership?.role === "pending"}
      iconTextBehaviour="centerRemainder"
      isPending={isPending}
      onClick={() => {
        startTransition(() => joinStrata());
      }}
      style="secondary"
    >
      {strataMembership?.role === "pending"
        ? "Membership Pending"
        : `Join ${strata.name}`}
    </StatusButton>
  );
}
