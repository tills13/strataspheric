import * as styles from "./style.css";

import React from "react";

import { protocol } from "../../constants";
import { Strata } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { RightIcon } from "../Icon/RightIcon";
import { ExternalLink } from "../Link/ExternalLink";

type ExternalLinkProps = React.ComponentProps<typeof ExternalLink>;
type ButtonProps = React.ComponentProps<typeof Button>;

interface Props {
  buttonColor?: ButtonProps["color"];
  buttonSize?: ButtonProps["size"];
  buttonStyle?: ButtonProps["style"];
  className?: string;
  disabled?: boolean;
  path?: string;
  strata: Strata;
  target?: ExternalLinkProps["target"];
}

export function GoToStrataLinkButton({
  buttonColor = "default",
  buttonSize,
  buttonStyle,
  className,
  disabled,
  path,
  strata,
  target = "_blank",
}: Props) {
  if (disabled) {
    return (
      <Button
        icon={<RightIcon />}
        color={buttonColor}
        size={buttonSize}
        style={buttonStyle}
        disabled
      >
        Go to {strata.name}
      </Button>
    );
  }

  return (
    <ExternalLink
      className={classnames(className, styles.goToStrataLinkButton)}
      href={protocol + "//" + strata.domain + (path || "")}
      target={target}
    >
      <Button
        color={buttonColor}
        icon={<RightIcon />}
        size={buttonSize}
        style={buttonStyle}
      >
        Go to {strata.name}
      </Button>
    </ExternalLink>
  );
}
