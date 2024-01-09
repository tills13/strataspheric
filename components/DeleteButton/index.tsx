"use client";

import React, { useTransition } from "react";

import { Button } from "../Button";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { LoadingIcon } from "../LoadingIcon";

type ButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "icon" | "iconLeft" | "iconRight"
>;

interface Props extends ButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick, ...delegateProps }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      {...delegateProps}
      icon={isPending ? <LoadingIcon /> : <DeleteIcon />}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => onClick());
      }}
    />
  );
}
