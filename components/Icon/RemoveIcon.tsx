import React from "react";

import { Icon } from "./Icon";

export function RemoveIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </Icon>
  );
}
