"use client";

import { useTransition } from "react";

import { DeleteIcon } from "../../../../../../components/Icon/DeleteIcon";
import { StatusButton } from "../../../../../../components/StatusButton";

interface Props {
  deleteMeeting: () => void;
}

export function DeleteMeetingButton({ deleteMeeting }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <StatusButton
      color="error"
      style="secondary"
      iconRight={<DeleteIcon />}
      isPending={isPending}
      onClick={() =>
        startTransition(() => {
          deleteMeeting();
        })
      }
    >
      Delete Meeting
    </StatusButton>
  );
}
