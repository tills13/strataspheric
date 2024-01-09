"use client";

import * as styles from "./style.css";

import { useTransition } from "react";

import { MeetingAgendaItemUpdate } from "../../data";
import { Checkbox } from "../Checkbox";
import { LoadingIcon } from "../LoadingIcon";

interface Props {
  done: 0 | 1;
  imperativeUpdateAgendaItem: (
    agendaItemUpdate: MeetingAgendaItemUpdate,
  ) => void;
}

export function MeetingAgendaItemCheckbox({
  done,
  imperativeUpdateAgendaItem,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return <LoadingIcon className={styles.agendaItemCheckboxPendingIcon} />;
  }

  return (
    <Checkbox
      onChange={() => {
        startTransition(() => {
          imperativeUpdateAgendaItem({
            done: done === 1 ? 0 : 1,
          });
        });
      }}
      checked={done === 1}
    />
  );
}
