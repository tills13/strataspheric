import React from "react";

import { Icon } from "./Icon";

export function ArrowBackIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <path d="M313-440l224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </Icon>
  );
}
