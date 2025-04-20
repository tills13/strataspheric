"use client";

import React, { useTransition } from "react";

import { User } from "../../auth/types";
import { Strata } from "../../data";
import { StrataMembership } from "../../data/memberships/getStrataMembership";
import { Button } from "../Button";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { InternalLink } from "../Link/InternalLink";
import { StatusButton } from "../StatusButton";

interface Props {
  buttonStyle?: React.ComponentProps<typeof StatusButton>["style"];
  joinStrata: () => void;
  strata: Strata;
  membership?: StrataMembership;
  user?: User;
}

export function JoinStrataButton({
  buttonStyle = "primary",
  joinStrata,
  strata,
  membership,
  user,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (membership && membership.role !== "pending") {
    return null;
  }

  if (!user) {
    return (
      <InternalLink href="/?action=join" noUnderline>
        <Button
          color="primary"
          iconRight={<ArrowForwardIcon />}
          style="primary"
          iconTextBehaviour="centerRemainder"
        >
          Join {strata.name}
        </Button>
      </InternalLink>
    );
  }

  return (
    <StatusButton
      color="primary"
      disabled={membership?.role === "pending"}
      iconTextBehaviour="centerRemainder"
      isPending={isPending}
      onClick={() => {
        startTransition(() => joinStrata());
      }}
      style={buttonStyle}
    >
      {membership?.role === "pending"
        ? "Membership Pending"
        : `Join ${strata.name}`}
    </StatusButton>
  );
}
