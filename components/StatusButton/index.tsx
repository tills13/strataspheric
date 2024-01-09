"use client";

import * as styles from "./style.css";

import React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";
import { LoadingIcon } from "../LoadingIcon";

interface Props extends React.ComponentProps<typeof Button> {
  success?: boolean | undefined;
  isPending?: boolean;
}

export function StatusButton({
  children,
  className,
  success,
  isPending,
  ...buttonProps
}: Props) {
  const status = useFormStatus();

  const iconProperty = buttonProps.icon ? "icon" : "iconRight";

  if (status.pending || isPending) {
    return (
      <Button
        className={className}
        iconTextBehaviour="centerGlobal"
        {...buttonProps}
        {...{ [iconProperty]: <LoadingIcon className={styles.statusIcon} /> }}
        disabled
      >
        {children}
      </Button>
    );
  } else if (success !== undefined) {
    return (
      <Button
        className={className}
        {...buttonProps}
        color={success ? "success" : "error"}
        disabled={success}
        {...{
          [iconProperty]: success ? (
            <CircleCheckIcon className={styles.statusIcon} />
          ) : (
            <CircleXIcon className={styles.statusIcon} />
          ),
        }}
        iconTextBehaviour="centerGlobal"
      >
        {children}
      </Button>
    );
  }

  return (
    <Button className={className} {...buttonProps}>
      {children}
    </Button>
  );
}
