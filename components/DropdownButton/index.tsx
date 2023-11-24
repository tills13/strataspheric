"use client";

import * as styles from "./style.css";

import { useCallback, useState } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import { classnames } from "../../utils/classnames";
import { MoreVerticalIcon } from "../Icon/MoreVerticalIcon";
import { IconButton } from "../IconButton";

interface Props {
  className?: string;
  panel: JSX.Element;
}

export function DropdownButton({ className, panel }: Props) {
  const [open, setOpen] = useState(false);

  const onClickOutside = useCallback(() => setOpen(false), []);
  const ref = useClickOutside(onClickOutside);

  return (
    <div className={classnames(styles.dropdownButton, className)} ref={ref}>
      <IconButton onClick={() => setOpen(!open)} size="small">
        <MoreVerticalIcon className={styles.dropdownButtonIcon} />
      </IconButton>

      {open && <div className={styles.dropdownPanelWrapper}>{panel}</div>}
    </div>
  );
}