"use client";

import { Session } from "next-auth";
import { useTransition } from "react";

import { protocol, tld } from "../../constants";
import { Strata, StrataMembership } from "../../data";
import { Button } from "../Button";
import { ExternalLink } from "../Link/ExternalLink";
import { StatusButton } from "../StatusButton";

interface Props {
  joinStrata: () => void;
  strata: Strata;
  strataMembership?: StrataMembership;
  user?: Session["user"];
}

export function JoinStrataButton({
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
      <ExternalLink href={protocol + "//" + tld + "/join"}>
        <Button color="primary" style="secondary">
          Join {strata.name}
        </Button>
      </ExternalLink>
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
      style="secondary"
    >
      {strataMembership?.role === "pending"
        ? "Membership Pending"
        : `Join ${strata.name}`}
    </StatusButton>
  );
}
