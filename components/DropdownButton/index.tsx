"use client";

import * as styles from "./style.css";

import React, { useCallback, useState } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import { MoreVerticalIcon } from "../Icon/MoreVerticalIcon";
import { IconButton } from "../IconButton";

interface Props {
  buttonClassName?: string;
  className?: string;
  direction?: "up" | "down";
  panel: JSX.Element;
}

export function DropdownButton({
  buttonClassName,
  className,
  direction,
  panel,
}: Props) {
  const [open, setOpen] = useState(false);

  const onClickOutside = useCallback(() => setOpen(false), []);
  const ref = useClickOutside(onClickOutside);

  return (
    <div className={className || styles.dropdownButton} ref={ref}>
      <IconButton className={buttonClassName} onClick={() => setOpen(!open)}>
        <MoreVerticalIcon />
      </IconButton>

      {open && (
        <div
          className={
            direction === "up" ? styles.panelWrapperUp : styles.panelWrapper
          }
        >
          {panel}
        </div>
      )}
    </div>
  );
}
