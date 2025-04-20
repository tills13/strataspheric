"use client";

import * as styles from "./style.css";

import { useTransition } from "react";

import { imperativeUpdateAgendaItemAction } from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { Checkbox } from "../Checkbox";
import { LoadingIcon } from "../LoadingIcon";

interface Props {
  done: 0 | 1;
  itemId: string;
  meetingId: string;
}

export function MeetingAgendaItemCheckbox({ done, itemId, meetingId }: Props) {
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return <LoadingIcon className={styles.agendaItemCheckboxPendingIcon} />;
  }

  return (
    <Checkbox
      onChange={() => {
        startTransition(() =>
          imperativeUpdateAgendaItemAction(meetingId, itemId, {
            done: done === 1 ? 0 : 1,
          }),
        );
      }}
      checked={done === 1}
    />
  );
}
