"use client";

import React from "react";

import { addFileToMeetingAction } from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { AttachFileButton } from "../AttachFile/AttachFileButton";

type AttachFileButtonProps = React.ComponentProps<typeof AttachFileButton>;

interface Props extends Omit<AttachFileButtonProps, "onSelectFile"> {
  fileType: "minutes" | "file";
  meetingId: string;
}

export function AddFileToMeetingButton({
  meetingId,
  fileType,
  ...delegateProps
}: Props) {
  return (
    <AttachFileButton
      {...delegateProps}
      onSelectFile={(file) => {
        if (file) {
          return addFileToMeetingAction(meetingId, fileType, file.id);
        }
      }}
    />
  );
}
