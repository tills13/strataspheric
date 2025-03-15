"use client";

import React, { useState } from "react";

import { File } from "../../data";
import { AttachFileButton } from "../AttachFile/AttachFileButton";
import { AttachFileText } from "../AttachFile/AttachFileText";

type AttachFileButtonProps = Omit<
  React.ComponentProps<typeof AttachFileButton>,
  "defaultValue" | "value"
>;

interface Props extends AttachFileButtonProps {
  defaultValue?: File;
  name: string;
  value?: File;
}

export function AttachFileField({
  defaultValue,
  name,
  onSelectFile,
  value,
  ...delegateProps
}: Props) {
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  return (
    <>
      <AttachFileText
        onSelectFile={(file) => {
          setSelectedFile(file);
          onSelectFile?.(file);
        }}
        selectedFile={value || selectedFile}
        {...delegateProps}
      />

      <input
        type="hidden"
        name={name}
        value={(value || selectedFile)?.id || ""}
      />
    </>
  );
}
