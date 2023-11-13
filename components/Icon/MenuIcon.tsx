import React from "react";
import { Icon } from "./Icon";

export function MenuIcon(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon
      {...props}
      style={{ position: "relative", left: "-1px", top: "-1px" }}
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </Icon>
  );
}
