import React from "react";

import { Button } from "../Button";
import { ConfirmButton } from "../ConfirmButton";
import { DeleteIcon } from "../Icon/DeleteIcon";

type ButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "icon" | "iconLeft" | "icon"
>;

interface Props extends ButtonProps {
  onConfirmDelete: () => void;
}

export function DeleteButton({ onConfirmDelete, ...delegateProps }: Props) {
  return (
    <ConfirmButton
      {...delegateProps}
      icon={<DeleteIcon />}
      onClickConfirm={onConfirmDelete}
    />
  );
}
