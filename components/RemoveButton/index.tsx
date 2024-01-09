"use client";

import React, { useTransition } from "react";

import { Button } from "../Button";
import { RemoveIcon } from "../Icon/RemoveIcon";
import { LoadingIcon } from "../LoadingIcon";

type ButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "icon" | "iconLeft" | "iconRight"
>;

interface Props extends ButtonProps {
  onClick: () => void;
}

export function RemoveButton({ onClick, ...delegateProps }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      {...delegateProps}
      icon={isPending ? <LoadingIcon /> : <RemoveIcon />}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => onClick());
      }}
    />
  );
}
