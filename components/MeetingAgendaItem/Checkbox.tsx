"use client";

import * as styles from "./style.css";

import { useTransition } from "react";

import { imperativeUpdateAgendaItemAction } from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { Checkbox } from "../Checkbox";
import { LoadingIcon } from "../LoadingIcon";

interface Props {
  allVotesIn?: boolean;
  done: 0 | 1;
  isVoteItem?: boolean;
  itemId: string;
  meetingId: string;
}

export function MeetingAgendaItemCheckbox({
  allVotesIn,
  done,
  isVoteItem,
  itemId,
  meetingId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const cannotComplete = isVoteItem && !allVotesIn && done === 0;

  if (isPending) {
    return <LoadingIcon className={styles.agendaItemCheckboxPendingIcon} />;
  }

  return (
    <Checkbox
      disabled={cannotComplete}
      onChange={() => {
        startTransition(() =>
          imperativeUpdateAgendaItemAction(meetingId, itemId, {
            done: done === 1 ? 0 : 1,
          }),
        );
      }}
      checked={done === 1}
      title={
        cannotComplete
          ? "All attendees must vote before completing this item"
          : undefined
      }
    />
  );
}
