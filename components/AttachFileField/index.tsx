"use client";

import React, { useState } from "react";

import { File } from "../../data";
import { AttachFileButton } from "../AttachFileButton";

type AttachFileButtonProps = React.ComponentProps<typeof AttachFileButton>;

interface Props {
  buttonClassName?: string;
  name?: string;
  defaultValue?: AttachFileButtonProps["selectedFile"];
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileField({
  buttonClassName,
  defaultValue,
  name,
  upsertFile,
}: Props) {
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  return (
    <>
      <AttachFileButton
        className={buttonClassName}
        onSelectFile={setSelectedFile}
        selectedFile={selectedFile}
        upsertFile={upsertFile}
      />

      <input type="hidden" name={name} value={selectedFile?.id || ""} />
    </>
  );
}
