"use client";

import React from "react";

import { RemoveIcon } from "../Icon/RemoveIcon";
import { StatusButton } from "../StatusButton";

type Props = React.ComponentProps<typeof StatusButton>;

export function RemoveButton(delegateProps: Props) {
  return <StatusButton icon={<RemoveIcon />} {...delegateProps} />;
}
