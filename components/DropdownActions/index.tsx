"use client";

import * as styles from "./style.css";

import React from "react";

import { DropdownButton } from "../DropdownButton";
import { ExternalLink } from "../Link/ExternalLink";
import { InternalLink } from "../Link/InternalLink";
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
        <>
          {filteredActions.map((action, idx) => (
            <Wrap
              key={idx}
              if={typeof action.action === "string"}
              with={(children) => {
                if (/^https?:\/\//.test(action.action as string)) {
                  return (
                    <ExternalLink
                      href={action.action as string}
                      target="_blank"
                    >
                      {children}
                    </ExternalLink>
                  );
                } else {
                  return (
                    <InternalLink href={action.action as string}>
                      {children}
                    </InternalLink>
                  );
                }
              }}
            >
              <div
                className={styles.actionRow}
                onClick={
                  typeof action.action === "string" ? undefined : action.action
                }
              >
                {action.icon}
                {action.label}
              </div>
            </Wrap>
          ))}
        </>
      }
      {...delegateProps}
    />
  );
}
