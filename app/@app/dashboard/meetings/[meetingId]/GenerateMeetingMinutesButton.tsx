"use client";

import { TextDocumentIcon } from "../../../../../components/Icon/TextDocumentIcon";
import { StatusButton } from "../../../../../components/StatusButton";
import { generateMeetingMinutesAction } from "./actions";

interface Props {
  meetingId: string;
}

export function GenerateMeetingMinutesButton({ meetingId }: Props) {
  return (
    <StatusButton
      action={() => generateMeetingMinutesAction(meetingId)}
      color="primary"
      style="primary"
      icon={<TextDocumentIcon />}
      iconTextBehaviour="centerRemainder"
    >
      Generate Meeting Minutes
    </StatusButton>
  );
}
