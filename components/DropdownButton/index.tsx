"use client";

import * as styles from "./style.css";

import React, { useCallback, useState } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Group } from "../Group";
import { Header } from "../Header";
import { MoreVerticalIcon } from "../Icon/MoreVerticalIcon";
import { RemoveIcon } from "../Icon/RemoveIcon";

interface Props {
  buttonClassName?: string;
  buttonColor?: React.ComponentProps<typeof Button>["color"];
  buttonSize?: React.ComponentProps<typeof Button>["size"];
  buttonStyle?: React.ComponentProps<typeof Button>["style"];
  className?: string;
  direction?: "up" | "down";
  icon?: React.ReactNode;
  openLabel?: React.ReactNode;
  mobileOnlyOpenLabel?: React.ReactNode;
  panel: React.ReactNode;
}

export function DropdownButton({
  buttonClassName,
  buttonColor,
  buttonSize,
  buttonStyle,
  className,
  direction,
  icon: propsIcon,
  openLabel,
  mobileOnlyOpenLabel,
  panel,
}: Props) {
  const [open, setOpen] = useState(false);

  const onClickOutside = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(onClickOutside);

  const icon = propsIcon || <MoreVerticalIcon />;

  return (
    <div
      className={classnames(className, styles.dropdownButton, {
        [styles.dropdownButtonOpen]: open,
      })}
      ref={ref}
    >
      <Button
        className={classnames(buttonClassName, styles.dropdownButtonButton)}
        color={open ? undefined : buttonColor}
        onClick={() => setOpen(!open)}
        size={buttonSize}
        style={open ? undefined : buttonStyle}
        icon={icon}
        iconTextBehaviour="centerRemainder"
      >
        {openLabel}
      </Button>

      <div
        className={classnames(
          direction === "up" ? styles.panelWrapperUp : styles.panelWrapper,
        )}
      >
        <Group
          justify="space-between"
          ph="normal"
          paddingTop="normal"
          visibleOn="mobile"
        >
          {mobileOnlyOpenLabel || openLabel ? (
            <Header as="h3">{mobileOnlyOpenLabel || openLabel}</Header>
          ) : (
            <div />
          )}
          <Button
            icon={<RemoveIcon />}
            style="tertiary"
            color="primary"
            onClick={() => setOpen(false)}
          />
        </Group>
        {panel}
      </div>
    </div>
  );
}
