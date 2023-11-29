import React from "react";

import { Icon } from "./Icon";

export function SignOutIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
    </Icon>
  );
}