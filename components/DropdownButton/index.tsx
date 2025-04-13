"use client";

import * as styles from "./style.css";

import React, { useCallback, useState } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { MoreVerticalIcon } from "../Icon/MoreVerticalIcon";

interface Props {
  buttonClassName?: string;
  buttonSize?: React.ComponentProps<typeof Button>["size"];
  buttonStyle?: React.ComponentProps<typeof Button>["style"];
  className?: string;
  direction?: "up" | "down";
  panel: React.ReactNode;
}

export function DropdownButton({
  buttonClassName,
  buttonSize,
  buttonStyle,
  className,
  direction,
  panel,
}: Props) {
  const [open, setOpen] = useState(false);

  const onClickOutside = useCallback(() => setOpen(false), []);
  const ref = useClickOutside(onClickOutside);

  return (
    <div className={classnames(className, styles.dropdownButton)} ref={ref}>
      <Button
        className={buttonClassName}
        icon={<MoreVerticalIcon />}
        onClick={() => setOpen(!open)}
        size={buttonSize}
        style={buttonStyle}
      />

      <div
        className={classnames(
          direction === "up" ? styles.panelWrapperUp : styles.panelWrapper,
          { [styles.panelOpen]: open },
        )}
      >
        {panel}
      </div>
    </div>
  );
}
