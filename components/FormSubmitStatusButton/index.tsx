"use client";

import * as styles from "./style.css";

import React from "react";
import { useFormStatus } from "react-dom";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleXIcon } from "../Icon/CircleXIcon";
import { LoadingIcon } from "../LoadingIcon";

interface Props extends React.ComponentProps<typeof Button> {
  success: boolean | undefined;
}

export function FormSubmitStatusButton({
  children,
  className,
  success,
  ...buttonProps
}: Props) {
  const status = useFormStatus();

  if (status.pending) {
    return (
      <Button className={className} {...buttonProps} disabled>
        <div className={styles.formStatusButtonContainer}>
          <LoadingIcon className={styles.statusIcon} /> {children}
        </div>
      </Button>
    );
  } else if (success !== undefined) {
    return (
      <Button className={className} {...buttonProps} disabled={success}>
        <div className={styles.formStatusButtonContainer}>
          {success ? (
            <CircleCheckIcon className={styles.statusIcon} />
          ) : (
            <CircleXIcon className={styles.statusIcon} />
          )}
          {children}
        </div>
      </Button>
    );
  }

  return (
    <Button className={className} {...buttonProps}>
      <div className={styles.formStatusButtonContainer}>{children}</div>
    </Button>
  );
}
