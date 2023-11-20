"use client";

import { startTransition } from "react";

import { Button } from "./Button";
import { RemoveIcon } from "./Icon/RemoveIcon";
import { IconButton } from "./IconButton";

interface Props {
  onClick: () => void;
}

export function RemoveButton({ onClick }: Props) {
  return (
    <IconButton
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
      compact
    >
      <RemoveIcon />
    </IconButton>
  );
}
