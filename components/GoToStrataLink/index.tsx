import React from "react";

import { protocol } from "../../constants";
import { Strata } from "../../data";
import { Button } from "../Button";
import { ExternalLink } from "../Link/ExternalLink";

type ExternalLinkProps = React.ComponentProps<typeof ExternalLink>;

interface Props {
  className?: string;
  disabled?: boolean;
  strata: Strata;
  target?: ExternalLinkProps["target"];
}

export function GoToStrataLink({
  className,
  disabled,
  strata,
  target = "_blank",
}: Props) {
  if (disabled) {
    return (
      <Button className={className} disabled>
        Go to {strata.name}
      </Button>
    );
  }

  return (
    <ExternalLink
      className={className}
      href={protocol + "//" + strata.domain}
      target={target}
    >
      <Button>Go to {strata.name}</Button>
    </ExternalLink>
  );
}
