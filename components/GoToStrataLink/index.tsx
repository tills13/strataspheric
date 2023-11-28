import React from "react";

import { protocol } from "../../constants";
import { Strata } from "../../data";
import { Button } from "../Button";
import { ExternalLink } from "../Link/ExternalLink";

type ExternalLinkProps = React.ComponentProps<typeof ExternalLink>;
type ButtonProps = React.ComponentProps<typeof Button>;

interface Props {
  className?: string;
  disabled?: boolean;
  size?: ButtonProps["size"];
  strata: Strata;
  target?: ExternalLinkProps["target"];
  variant?: ButtonProps["variant"];
}

export function GoToStrataLink({
  className,
  disabled,
  size,
  strata,
  target = "_blank",
  variant,
}: Props) {
  if (disabled) {
    return (
      <Button className={className} size={size} variant={variant} disabled>
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
      <Button size={size} variant={variant}>
        Go to {strata.name}
      </Button>
    </ExternalLink>
  );
}
