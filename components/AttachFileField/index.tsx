"use client";

import React, { useState } from "react";

import { File } from "../../data";
import { AttachFileButton } from "../AttachFileButton";

type AttachFileButtonProps = React.ComponentProps<typeof AttachFileButton>;

interface Props {
  buttonClassName?: string;
  defaultValue?: AttachFileButtonProps["selectedFile"];
  name?: string;
  onSelectFile?: AttachFileButtonProps["onSelectFile"];
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileField({
  buttonClassName,
  defaultValue,
  name,
  onSelectFile,
  upsertFile,
}: Props) {
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  return (
    <>
      <AttachFileButton
        className={buttonClassName}
        onSelectFile={(file) => {
          setSelectedFile(file);
          onSelectFile?.(file);
        }}
        selectedFile={selectedFile}
        upsertFile={upsertFile}
      />

      <input type="hidden" name={name} value={selectedFile?.id || ""} />
    </>
  );
}
