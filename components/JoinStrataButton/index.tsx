"use client";

import React, { useTransition } from "react";

import { joinStrataAction } from "../../app/@app/actions";
import { User } from "../../auth/types";
import { Strata } from "../../data";
import { StrataMembership } from "../../data/memberships/getStrataMembership";
import { Button } from "../Button";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { InternalLink } from "../Link/InternalLink";
import { StatusButton } from "../StatusButton";

interface Props {
  buttonStyle?: React.ComponentProps<typeof StatusButton>["style"];
  buttonColor?: React.ComponentProps<typeof StatusButton>["color"];

  strata: Strata;
  membership?: StrataMembership;
  user?: User;
}

export function JoinStrataButton({
  buttonStyle = "primary",
  buttonColor = "primary",
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
          color={buttonColor}
          iconRight={<ArrowForwardIcon />}
          style={buttonStyle}
          iconTextBehaviour="centerRemainder"
        >
          Join {strata.name}
        </Button>
      </InternalLink>
    );
  }

  return (
    <StatusButton
      color={buttonColor}
      disabled={membership?.role === "pending"}
      iconTextBehaviour="centerRemainder"
      isPending={isPending}
      onClick={() => {
        startTransition(() => joinStrataAction());
      }}
      style={buttonStyle}
    >
      {membership?.role === "pending"
        ? "Membership Pending"
        : `Join ${strata.name}`}
    </StatusButton>
  );
}
