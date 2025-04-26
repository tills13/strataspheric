import * as styles from "./style.css";

import React from "react";

import { Group } from "../Group";
import { Text } from "../Text";

interface Props extends React.ComponentProps<typeof Group> {
  children: React.ReactNode;
  gravity?: "left" | "center" | "right";
}

export function DividerText({ children, gravity = "center", ...rest }: Props) {
  return (
    <Group {...rest}>
      {(gravity === "right" || gravity === "center") && (
        <span className={styles.dividerTextDivider} />
      )}
      <Text as="span" fw="bold" color="secondary" whiteSpace="nowrap">
        {children}
      </Text>
      {(gravity === "left" || gravity === "center") && (
        <span className={styles.dividerTextDivider} />
      )}
    </Group>
  );
}
