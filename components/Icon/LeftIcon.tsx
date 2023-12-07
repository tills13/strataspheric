import React from "react";

import { Icon } from "./Icon";

export function LeftIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
    </Icon>
  );
}
