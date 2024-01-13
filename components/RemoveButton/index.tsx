"use client";

import React from "react";

import { RemoveIcon } from "../Icon/RemoveIcon";
import { StatusButton } from "../StatusButton";

type ButtonProps = Omit<
  React.ComponentProps<typeof StatusButton>,
  "icon" | "iconLeft" | "iconRight"
>;

interface Props extends ButtonProps {
  action: () => void;
}

export function RemoveButton(delegateProps: Props) {
  return <StatusButton {...delegateProps} icon={<RemoveIcon />} />;
}
