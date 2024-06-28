"use client";

import { Session } from "next-auth";
import React, { useTransition } from "react";

import { Strata, StrataMembership } from "../../data";
import { Button } from "../Button";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { InternalLink } from "../Link/InternalLink";
import { StatusButton } from "../StatusButton";

interface Props {
  buttonStyle?: React.ComponentProps<typeof StatusButton>["style"];
  joinStrata: () => void;
  strata: Strata;
  strataMembership?: StrataMembership;
  user?: Session["user"];
}

export function JoinStrataButton({
  buttonStyle = "primary",
  joinStrata,
  strata,
  strataMembership,
  user,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (strataMembership && strataMembership.role !== "pending") {
    return null;
  }

  if (!user) {
    return (
      <InternalLink href="/?action=join">
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
      disabled={strataMembership?.role === "pending"}
      iconTextBehaviour="centerRemainder"
      isPending={isPending}
      onClick={() => {
        startTransition(() => joinStrata());
      }}
      style={buttonStyle}
    >
      {strataMembership?.role === "pending"
        ? "Membership Pending"
        : `Join ${strata.name}`}
    </StatusButton>
  );
}
