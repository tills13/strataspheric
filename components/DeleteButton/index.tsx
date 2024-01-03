"use client";

import React, { startTransition } from "react";

import { Button } from "../Button";
import { DeleteIcon } from "../Icon/DeleteIcon";

type ButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "icon" | "iconLeft" | "iconRight"
>;

interface Props extends ButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick, ...delegateProps }: Props) {
  return (
    <Button
      {...delegateProps}
      icon={<DeleteIcon />}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => onClick());
      }}
    />
  );
}
