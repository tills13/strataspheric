"use client";

import React from "react";

import { RemoveIcon } from "../Icon/RemoveIcon";
import { StatusButton } from "../StatusButton";

type Props = Omit<
  React.ComponentProps<typeof StatusButton>,
  "icon" | "iconLeft" | "iconRight"
>;

export function RemoveButton(delegateProps: Props) {
  return <StatusButton icon={<RemoveIcon />} {...delegateProps} />;
}
