"use client";

import React, { startTransition } from "react";

import { DeleteIcon } from "../Icon/DeleteIcon";
import { IconButton } from "../IconButton";

interface Props extends React.ComponentProps<typeof IconButton> {
  onClick: () => void;
}

export function DeleteButton({ onClick, ...delegateProps }: Props) {
  return (
    <IconButton
      {...delegateProps}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => onClick());
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
