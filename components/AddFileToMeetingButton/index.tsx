"use client";

import React from "react";

import { AttachFileButton } from "../AttachFile/AttachFileButton";

type AttachFileButtonProps = React.ComponentProps<typeof AttachFileButton>;

interface Props extends Omit<AttachFileButtonProps, "onSelectFile"> {
  addFileToMeeting: (fileId: string) => Promise<any>;
  upsertFile: (fd: FormData) => Promise<any>;
}

export function AddFileToMeetingButton({
  addFileToMeeting,
  upsertFile,
  ...delegateProps
}: Props) {
  return (
    <AttachFileButton
      {...delegateProps}
      onSelectFile={(file) => {
        if (file) {
          return addFileToMeeting(file.id);
        }
      }}
      upsertFile={upsertFile}
    />
  );
}
