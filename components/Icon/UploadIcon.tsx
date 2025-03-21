import React from "react";

import { Icon } from "./Icon";

export function UploadIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
    </Icon>
  );
}
