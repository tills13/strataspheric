"use client";

import * as styles from "./style.css";

import React from "react";

import { DropdownButton } from "../DropdownButton";
import { Group } from "../Group";
import { ExternalLink } from "../Link/ExternalLink";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { Wrap } from "../Wrap";

export function filterIsAction(i: Action | undefined | false): i is Action {
  return i !== undefined && i !== false;
}

type Action = {
  action: (() => void) | string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
};

interface Props
  extends Omit<React.ComponentProps<typeof DropdownButton>, "panel"> {
  actions: Array<Action | undefined | false>;
  className?: string;
}

export function DropdownActions({
  actions,
  className,
  ...delegateProps
}: Props) {
  const filteredActions = actions.filter(filterIsAction);

  if (filteredActions.length === 0) {
    return null;
  }

  return (
    <DropdownButton
      className={className}
      panel={
        <Stack p="normal" gap="small">
          {filteredActions.map((action, idx) => (
            <Wrap
              key={idx}
              if={typeof action.action === "string"}
              with={(children) => {
                if (typeof action.action === "string") {
                  return /^https?:\/\//.test(action.action) ? (
                    <ExternalLink href={action.action} target="_blank">
                      {children}
                    </ExternalLink>
                  ) : (
                    <InternalLink href={action.action}>{children}</InternalLink>
                  );
                }

                return children;
              }}
            >
              <Group
                className={styles.actionRow}
                padding="small"
                onClick={
                  typeof action.action === "string" ? undefined : action.action
                }
              >
                {action.icon}
                <Text as="span">{action.label}</Text>
              </Group>
            </Wrap>
          ))}
        </Stack>
      }
      {...delegateProps}
    />
  );
}
