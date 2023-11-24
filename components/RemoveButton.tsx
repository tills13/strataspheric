"use client";

import React, { startTransition } from "react";

import { RemoveIcon } from "./Icon/RemoveIcon";
import { IconButton } from "./IconButton";

interface Props extends React.ComponentProps<typeof IconButton> {
  onClick: () => void;
}

export function RemoveButton({ onClick, ...delegateProps }: Props) {
  return (
    <IconButton
      {...delegateProps}
      onClick={() => startTransition(() => onClick())}
    >
      <RemoveIcon />
    </IconButton>
  );
}
