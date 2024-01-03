"use client";

import React, { startTransition } from "react";

import { Button } from "./Button";
import { RemoveIcon } from "./Icon/RemoveIcon";

type ButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "icon" | "iconLeft" | "iconRight"
>;

interface Props extends ButtonProps {
  onClick: () => void;
}

export function RemoveButton({ onClick, ...delegateProps }: Props) {
  return (
    <Button
      {...delegateProps}
      icon={<RemoveIcon />}
      onClick={() => startTransition(() => onClick())}
    />
  );
}
