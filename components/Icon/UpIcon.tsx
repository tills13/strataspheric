import React from "react";

import { Icon } from "./Icon";

export function UpIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
    </Icon>
  );
}
