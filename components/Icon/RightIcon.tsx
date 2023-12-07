import React from "react";

import { Icon } from "./Icon";

export function RightIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </Icon>
  );
}
