import React from "react";
import { Strata } from "../../data/stratas/getStrata";
import { ExternalLink } from "../Link/ExternalLink";
import { Button } from "../Button";

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

export function GoToStrataButton({
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
    <ExternalLink href={"https://" + strata.domain} target={target}>
      <Button className={className} size={size} variant={variant}>
        Go to {strata.name}
      </Button>
    </ExternalLink>
  );
}
