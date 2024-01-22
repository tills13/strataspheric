import React from "react";

import { Icon } from "./Icon";

export function ArrowForwardIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
    </Icon>
  );
}
