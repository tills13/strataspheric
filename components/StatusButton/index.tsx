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

  if (status.pending || isPending) {
    return (
      <Button
        className={className}
        iconTextBehaviour="centerGlobal"
        {...buttonProps}
        iconRight={<LoadingIcon className={styles.statusIcon} />}
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
        iconRight={
          success ? (
            <CircleCheckIcon className={styles.statusIcon} />
          ) : (
            <CircleXIcon className={styles.statusIcon} />
          )
        }
        iconTextBehaviour="centerGlobal"
      >
        <div className={styles.formStatusButtonContainer}>{children}</div>
      </Button>
    );
  }

  return (
    <Button className={className} {...buttonProps}>
      <div className={styles.formStatusButtonContainer}>{children}</div>
    </Button>
  );
}
