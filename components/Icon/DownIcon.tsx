import React from "react";

import { Icon } from "./Icon";

export function DownIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
    </Icon>
  );
}
