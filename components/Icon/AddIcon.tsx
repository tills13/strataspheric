import React from "react";

import { Icon } from "./Icon";

export function AddIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </Icon>
  );
}
