import * as styles from "./style.css";

import React from "react";

import { DropdownButton } from "../DropdownButton";

export function filterIsAction(i: Action | undefined | false): i is Action {
  return i !== undefined && i !== false;
}

type Action = {
  action: () => void;
  label: string | JSX.Element;
  icon?: JSX.Element;
};

interface Props {
  actions: Array<Action | undefined | false>;
}

export function DropdownActions({ actions }: Props) {
  return (
    <DropdownButton
      panel={
        <>
          {actions.filter(filterIsAction).map((action, idx) => (
            <div key={idx} className={styles.actionRow} onClick={action.action}>
              {action.icon}
              {action.label}
            </div>
          ))}
        </>
      }
    />
  );
}
